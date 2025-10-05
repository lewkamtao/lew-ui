<script setup lang="ts">
import type { LewCascaderOption } from 'lew-ui/types'
import type { CascaderNodeCache } from '../../cascader/src/cascader'
import { LewCheckbox, LewPopover, LewTooltip } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import CommonInput from 'lew-ui/_components/CommonInput.vue'
import { useTreeSelection } from 'lew-ui/hooks'
import { any2px, object2class } from 'lew-ui/utils'
import { cloneDeep, isEqual, isFunction } from 'lodash-es'
import { VirtList } from 'vue-virt-list'
import {
  createCascaderCache,
  findAndAddChildrenByValue,
  findChildrenByValue,
  findObjectByValue,
  formatTree,
} from '../../cascader/src/cascader'
import { cascaderEmits } from './emits'
import { cascaderProps } from './props'

// Props和Emits
const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)
const modelValue = defineModel<string | string[] | undefined>()

// 全局应用配置
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

// 模板引用
const lewPopoverRef = ref()

interface State {
  visible: boolean
  loading: boolean
  initLoading: boolean
  okLoading: boolean
  backupValue: string | string[] | undefined
  optionsGroup: LewCascaderOption[][]
  optionsTree: LewCascaderOption[]
  activeValues: string[]
}

// 响应式状态
const state = reactive<State>({
  visible: false,
  loading: false,
  initLoading: true,
  okLoading: false,
  backupValue: undefined,
  optionsGroup: [],
  optionsTree: [],
  activeValues: [],
})

// 缓存
const loadedDataCache = new Map<string, LewCascaderOption[]>()
const nodeCache: CascaderNodeCache = createCascaderCache()
const loadedData = reactive<Record<string, LewCascaderOption[]>>({})

// 表单方法注入
const formMethods: any = inject('formMethods', {})

// 工具变量
let isInternalUpdate = false

// 计算属性
const _loadMethod = computed(() => {
  if (isFunction(props.loadMethod)) {
    return props.loadMethod
  }
  else if (props.loadMethodId) {
    return formMethods[props.loadMethodId]
  }
  return false
})

const _initMethod = computed(() => {
  if (isFunction(props.initMethod)) {
    return props.initMethod
  }
  else if (props.initMethodId) {
    return formMethods[props.initMethodId]
  }
  return false
})

const getCascaderWidth = computed(() => {
  const validGroups = state.optionsGroup.filter(group => group?.length > 0).length
  return Math.max(validGroups, 1) * 200
})

const getCascaderBodyStyle = computed(() => ({
  width: `${getCascaderWidth.value}px`,
}))

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-cascader-body', { size, disabled })
})

const formatItems = computed(() => {
  if (!modelValue.value) {
    return props.multiple ? [] : ''
  }

  if (!props.multiple && modelValue.value) {
    const result = findObjectByValue(
      state.optionsTree,
      modelValue.value as string,
      nodeCache,
    )
    if (!result) {
      return ''
    }
    const { label, labelPaths }: any = result
    return props.showAllLevels ? labelPaths.join(' / ') : label
  }

  if (!modelValue.value || !Array.isArray(modelValue.value)) {
    return []
  }

  return modelValue.value.map((value: string) => {
    const result = findObjectByValue(state.optionsTree, value, nodeCache)
    if (!result) {
      return {
        value,
        label: value, // 如果找不到对应的节点，使用value作为label
      }
    }
    const { label, labelPaths }: any = result
    return {
      value,
      label: props.multiple ? label : labelPaths.join(' / '),
    }
  })
})

// 常量
const VIRT_LIST_STYLE = {
  padding: '6px 6px 2px 6px',
  boxSizing: 'border-box' as const,
}

const ITEM_PADDING_STYLE = {
  height: '38px',
}

// Tree Selection Hook
const {
  selectedKeys,
  init: initTreeSelection,
  isSelected,
  isIndeterminate,
  removeKey,
  toggleKey,
  findItemsByValues,
} = useTreeSelection()

function updateTreeStructure() {
  if (state.optionsTree.length > 0 && !props.free) {
    const currentKeys
      = modelValue.value && Array.isArray(modelValue.value) ? modelValue.value : []
    initTreeSelection({ tree: state.optionsTree, keys: currentKeys })
  }
}

function updateModelValue() {
  isInternalUpdate = true
  let _value
  let _items

  if (props.onlyLeafSelectable) {
    _items = findItemsByValues(selectedKeys.value).filter((item: any) => item.isLeaf)
    _value = _items.map((item: any) => item.key)
  }
  else {
    _value = cloneDeep(selectedKeys.value)
    _items = findItemsByValues(selectedKeys.value)
  }
  modelValue.value = _value
  emit('change', _value, _items)

  nextTick(() => {
    isInternalUpdate = false
  })
}

function getItemClass(templateProps: any) {
  const isSelected
    = (Array.isArray(modelValue.value) && modelValue.value.includes(templateProps.value))
      || modelValue.value === templateProps.value
  return {
    'lew-cascader-item-disabled': templateProps.disabled,
    'lew-cascader-item-active':
      state.activeValues?.includes(templateProps.value) || isSelected,
    'lew-cascader-item-selected': isSelected,
  }
}

function getItemWrapperStyle(oIndex: number, oItem: any) {
  const style = {
    zIndex: 20 - oIndex,
    borderRadius: `0 ${
      oIndex === state.optionsGroup.length - 1 ? 'var(--lew-border-radius-small)' : '0'
    } 0 0`,
    transform: oItem.length > 0 ? `translateX(${200 * oIndex}px)` : '',
  }
  return style
}

// 初始化方法
async function init() {
  let _tree: LewCascaderOption[] = []
  try {
    if (_initMethod.value) {
      const newOptions = await _initMethod.value()
      _tree = newOptions || []
    }
    else if (_loadMethod.value && !state.loading) {
      state.loading = true
      _tree = (await _loadMethod.value()) || []
      state.loading = false
    }
    else if (props.options?.length) {
      _tree = props.options.map((e: LewCascaderOption) => ({
        ...e,
        isLeaf: !e.children?.length,
      }))
    }
    nodeCache.clear()
    loadedDataCache.clear()
    const formattedTree = formatTree(_tree)
    state.optionsGroup = [formattedTree]
    state.optionsTree = formattedTree

    if (formattedTree.length > 0 && !props.free) {
      initTreeSelection({ tree: formattedTree, keys: modelValue.value as string[] })
    }
  }
  catch (error) {
    console.error('Cascader initialization failed:', error)
    state.optionsGroup = []
    state.optionsTree = []
  }
  finally {
    state.initLoading = false
    state.loading = false
  }
}

// 事件处理方法
function changeCheck(item: LewCascaderOption) {
  if (item.disabled) {
    return
  }

  const itemValue = item.value
  if (props.free) {
    let _value = modelValue.value
    const isSelected = modelValue.value?.includes(itemValue)
    if (isSelected) {
      _value = ((modelValue.value as string[]) || []).filter(
        (value: string) => value !== itemValue,
      )
    }
    else {
      _value = [...(modelValue.value || []), itemValue]
    }
    const _items = findItemsByValues(_value)

    modelValue.value = _value
    emit('change', _value, _items)
  }
  else {
    toggleKey(itemValue)
    updateModelValue()
  }
  setTimeout(() => {
    lewPopoverRef.value && lewPopoverRef.value.refresh()
  }, 100)
}

function getSelected() {
  if (props.multiple) {
    return findItemsByValues(modelValue.value as string[])
  }
  else {
    return findObjectByValue(state.optionsTree, modelValue.value as string, nodeCache)
  }
}

async function selectItem(item: LewCascaderOption, level: number) {
  if (item.disabled)
    return
  if (!item.isLeaf && !isEqual(item.valuePaths, state.activeValues)) {
    state.optionsGroup = state.optionsGroup.slice(0, level + 1)
    if (_loadMethod.value && !item.isLeaf) {
      if (loadedDataCache.has(item.value)) {
        const _options = loadedDataCache.get(item.value)!
        state.optionsGroup.push(_options)
      }
      else if (loadedData[item.value]) {
        const _options = loadedData[item.value]
        state.optionsGroup.push(_options)
        loadedDataCache.set(item.value, _options)
      }
      else {
        item.loading = true
        state.okLoading = true
        const loadParam = {
          value: item.value,
          label: item.label,
          level,
        }
        const new_options = (await _loadMethod.value(loadParam)) || []
        const formattedNewOptions = formatTree(
          new_options,
          item.valuePaths,
          item.labelPaths,
        )
        findAndAddChildrenByValue(
          state.optionsTree,
          item.value,
          formattedNewOptions,
          nodeCache,
        )

        if (!props.free) {
          updateTreeStructure()
          nextTick(() => {
            updateModelValue()
          })
        }

        const _options = findChildrenByValue(state.optionsTree, item.value, nodeCache)
        state.optionsGroup.push(_options)
        loadedDataCache.set(item.value, _options)
        loadedData[item.value] = _options
        item.loading = false
        state.okLoading = false
      }
    }
    else if (!item.isLeaf && item.children) {
      const _options = item.children.map(e => ({
        ...e,
        isLeaf: !e.children?.length,
      }))
      state.optionsGroup.push(_options)
    }
  }

  if (!props.multiple) {
    modelValue.value = item.value

    if (props.onlyLeafSelectable && item.isLeaf) {
      setTimeout(() => {
        hide()
      }, 100)
    }
  }

  if (item.isLeaf)
    return

  if (isEqual(item.valuePaths, state.activeValues)) {
    state.activeValues = (item.parentValuePaths as string[]) || []
    if (level < state.optionsGroup.length - 1) {
      state.optionsGroup.pop()
    }
  }
  else {
    state.activeValues = (item.valuePaths as string[]) || []
  }
}

function clearHandle() {
  Object.assign(state, {
    activeValues: [],
    visible: false,
  })

  initTreeSelection({ keys: [] })

  isInternalUpdate = true
  modelValue.value = undefined
  emit('change', undefined, undefined)
  emit('clear')

  nextTick(() => {
    isInternalUpdate = false
  })
}

function deleteTag(value: string) {
  removeKey(value)
  updateModelValue()
  emit('delete', modelValue.value as string[], value)
}

function showHandle() {
  state.backupValue = modelValue.value
  state.visible = true
}

function hideHandle() {
  if (props.onlyLeafSelectable && modelValue.value && !props.multiple) {
    // 判断当前选中的节点是否是叶子节点
    const selectedNodes = findObjectByValue(
      state.optionsTree,
      modelValue.value as string,
      nodeCache,
    )
    if (!selectedNodes) {
      modelValue.value = state.backupValue
      return
    }
    const isLeaf = selectedNodes.isLeaf
    if (!isLeaf) {
      modelValue.value = state.backupValue
      return
    }
  }
  state.visible = false
}

// 公开方法
async function show() {
  try {
    await lewPopoverRef.value?.show()
  }
  catch (error) {
    console.warn('Failed to show cascader popover:', error)
  }
}

function hide() {
  try {
    lewPopoverRef.value?.hide()
  }
  catch (error) {
    console.warn('Failed to hide cascader popover:', error)
  }
}

// 监听器
watch(
  () => props.options,
  (newOptions) => {
    if (!_initMethod.value && newOptions?.length) {
      const _tree = newOptions.map((e: LewCascaderOption) => ({
        ...e,
        isLeaf: !e.children?.length,
      }))
      nodeCache.clear()
      loadedDataCache.clear()
      const formattedTree = formatTree(_tree)
      state.optionsGroup = [formattedTree]
      state.optionsTree = formattedTree

      if (formattedTree.length > 0) {
        if (
          modelValue.value
          && Array.isArray(modelValue.value)
          && modelValue.value.length > 0
          && !props.free
        ) {
          initTreeSelection({ tree: formattedTree, keys: modelValue.value })
        }
      }
    }
  },
  {
    deep: true,
    flush: 'post',
  },
)

watch(
  () => modelValue.value,
  (newValue) => {
    if (isInternalUpdate) {
      return
    }
    if (newValue && Array.isArray(newValue) && !props.free) {
      initTreeSelection({ keys: newValue })
    }
  },
  {
    immediate: false,
    deep: true,
  },
)

// 生命周期
onBeforeUnmount(() => {
  nodeCache.clear()
  loadedDataCache.clear()
})

// 初始化
init()

// 暴露方法
defineExpose({
  show,
  hide,
  getSelected,
})
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    class="lew-cascader-view"
    :trigger="trigger"
    :trigger-width="width"
    :disabled="disabled || readonly || state.initLoading"
    placement="bottom-start"
    :loading="state.loading"
    :style="{ width: any2px(width) }"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <CommonInput
        v-model="modelValue"
        :multiple
        :loading="state.initLoading"
        :clearable="clearable"
        :readonly
        :disabled="disabled || state.initLoading"
        :size
        :placeholder
        :width="any2px(width)"
        :focus="state.visible"
        :format-items
        @clear="clearHandle"
        @delete="deleteTag"
      />
    </template>
    <template #popover-body>
      <div
        class="lew-cascader-body"
        :style="getCascaderBodyStyle"
        :class="getBodyClassName"
      >
        <slot name="header" />
        <transition name="fade">
          <div v-if="state.optionsGroup.length > 0" class="lew-cascader-options-box">
            <template v-for="(oItem, oIndex) in state.optionsGroup" :key="oIndex">
              <div
                class="lew-cascader-item-wrapper"
                :style="getItemWrapperStyle(oIndex, oItem)"
              >
                <VirtList
                  :key="oItem?.[0]?.parentValuePaths?.join('-') || 'root'"
                  class="lew-scrollbar-hover"
                  :list="oItem"
                  :min-size="38"
                  :buffer="5"
                  item-key="value"
                  :style="VIRT_LIST_STYLE"
                >
                  <template #default="{ itemData: templateProps }">
                    <div
                      class="lew-cascader-item-padding"
                      :style="ITEM_PADDING_STYLE"
                      @click="selectItem(templateProps, oIndex)"
                    >
                      <div class="lew-cascader-item" :class="getItemClass(templateProps)">
                        <LewCheckbox
                          v-if="props.multiple"
                          :key="templateProps.value"
                          class="lew-cascader-checkbox"
                          :checked="
                            props.free
                              ? modelValue?.includes(templateProps.value)
                              : isSelected(templateProps.value)
                          "
                          :certain="!props.free && isIndeterminate(templateProps.value)"
                          :disabled="templateProps.disabled"
                          @change="changeCheck(templateProps)"
                        />

                        <div
                          :title="templateProps.label"
                          class="lew-cascader-label"
                          :style="{
                            width: props.multiple ? 'calc(100% - 36px)' : '100%',
                          }"
                        >
                          {{ templateProps.label }}
                        </div>

                        <CommonIcon
                          v-show="templateProps.loading"
                          :size="14"
                          loading
                          class="lew-cascader-loading-icon"
                          type="loader"
                        />
                        <CommonIcon
                          v-show="!templateProps.loading && !templateProps.isLeaf"
                          :size="16"
                          class="lew-cascader-icon"
                          type="chevron-right"
                        />
                      </div>
                    </div>
                  </template>
                </VirtList>
              </div>
            </template>
          </div>
        </transition>
      </div>
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-cascader-view {
  width: 100%;

  > div {
    width: 100%;
  }
}

.lew-cascader-body {
  width: 100%;
  box-sizing: border-box;
  min-width: 200px;
  height: 320px;
  overflow: hidden;
  transition: all var(--lew-form-transition-bezier);
  user-select: none;

  .not-found {
    opacity: 0.4;
  }

  .result-count {
    padding-left: 8px;
    margin: 5px 0px;
    opacity: 0.4;
    font-size: 13px;
  }

  .lew-cascader-options-box {
    position: relative;
    display: flex;
    box-sizing: border-box;
    height: 100%;

    .lew-cascader-item-wrapper {
      position: absolute;
      overflow: hidden;
      height: 100%;
      width: 200px;
      box-sizing: border-box;
      gap: 4px;
    }

    .lew-cascader-item-wrapper::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: var(--lew-pop-border-color);
    }

    .lew-cascader-item-wrapper:last-child::after {
      display: none;
    }

    .lew-cascader-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: var(--lew-text-color-1);
      box-sizing: border-box;
      border-radius: var(--lew-border-radius-small);
      height: 34px;
      flex-shrink: 0;
      padding: 0px 12px;

      .lew-cascader-icon {
        position: absolute;
        right: 2px;
        top: 10px;
        color: var(--lew-text-color-1);
      }

      .lew-cascader-loading-icon {
        position: absolute;
        right: 5px;
        top: 8.5px;
      }

      .lew-cascader-label {
        position: relative;
        z-index: 5;
        user-select: none;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }
    }

    .lew-cascader-item:hover {
      .icon {
        opacity: 1;
      }
    }

    .lew-cascader-item-disabled {
      opacity: var(--lew-disabled-opacity);
      pointer-events: none;
    }

    .lew-cascader-item-align-left {
      text-align: left;
    }

    .lew-cascader-item-align-center {
      text-align: center;
    }

    .lew-cascader-item-align-right {
      text-align: right;
    }

    .lew-cascader-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-form-bgcolor);
    }

    .lew-cascader-slot-item {
      border-radius: 6px;
    }

    .lew-cascader-slot-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-form-bgcolor);
    }

    .lew-cascader-item-active {
      background-color: var(--lew-form-bgcolor);

      .lew-cascader-icon {
        opacity: 1;
      }

      .icon-check {
        margin-right: 10px;
      }
    }

    .lew-cascader-item-selected {
      color: var(--lew-color-primary);
    }

    .lew-cascader-item-selected:hover {
      color: var(--lew-color-primary);
    }
  }
}
</style>
