<script setup lang="ts">
import type { LewCascaderOption } from 'lew-ui/types'
import type { CascaderNodeCache } from '../../cascader/src/cascader'
import { LewCheckbox, LewPopover, LewTooltip } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import SelectMultipleInput from 'lew-ui/_components/SelectMultipleInput.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { isFunction } from 'lodash-es'
import { VirtList } from 'vue-virt-list'
import {
  createCascaderCache,
  findAndAddChildrenByValue,
  findChildrenByValue,
  findObjectByValue,
  formatTree,
} from '../../cascader/src/cascader'
import { cascaderMultipleEmits } from './emits'
import { cascaderMultipleProps } from './props'

const props = defineProps(cascaderMultipleProps)
const emit = defineEmits(cascaderMultipleEmits)
const modelValue = defineModel()

const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const lewPopoverRef = ref()

const state = reactive({
  visible: false,
  loading: false,
  initLoading: true,
  okLoading: false,
  optionsGroup: [] as LewCascaderOption[][],
  optionsTree: [] as LewCascaderOption[],
  activeValues: [] as string[],
})

const loadedDataCache = new Map<string, LewCascaderOption[]>()
const nodeCache: CascaderNodeCache = createCascaderCache()
const itemWrapperStyleCache = new Map<string, any>()

const loadedData = reactive<Record<string, LewCascaderOption[]>>({})

const formMethods: any = inject('formMethods', {})

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

init()

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
    }
  },
  {
    deep: true,
    flush: 'post',
  },
)

/**
 * 比较两个数组是否相等
 */
function arrayEquals(a: string[] | undefined, b: string[] | undefined): boolean {
  if (a === b)
    return true
  if (!a || !b)
    return false
  if (a.length !== b.length)
    return false
  return a.every((val, index) => val === b[index])
}
function changeCheck(item: LewCascaderOption) {
  if (item.disabled) {
    return
  }

  const currentValues = (modelValue.value || []) as string[]
  const index = currentValues.findIndex((value: string) => value === item.value)

  if (index >= 0) {
    // 取消选择
    currentValues.splice(index, 1)
  }
  else {
    // 添加选择
    currentValues.push(item.value)
  }

  modelValue.value = [...currentValues]
  emit('select', modelValue.value as string[])
  emit('change', modelValue.value as string[])
}

async function selectItem(item: LewCascaderOption, level: number) {
  // 非叶子节点，处理展开逻辑
  if (!item.isLeaf && !arrayEquals(item.valuePaths, state.activeValues)) {
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
        // 格式化新加载的数据，添加路径信息
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
        const _options = findChildrenByValue(state.optionsTree, item.value, nodeCache)
        state.optionsGroup.push(_options)
        loadedDataCache.set(item.value, _options)
        loadedData[item.value] = _options
        item.loading = false
        state.okLoading = false
      }
    }
    else if (!item.isLeaf && item.children) {
      // 确保静态子节点也有正确的路径信息
      const _options = item.children.map(e => ({
        ...e,
        isLeaf: !e.children?.length,
      }))
      state.optionsGroup.push(_options)
    }
  }

  if (item.isLeaf)
    return

  if (arrayEquals(item.valuePaths, state.activeValues)) {
    state.activeValues = (item.parentValuePaths as string[]) || []
    if (level < state.optionsGroup.length - 1) {
      state.optionsGroup.pop()
    }
  }
  else {
    state.activeValues = (item.valuePaths as string[]) || []
  }
}

onBeforeUnmount(() => {
  nodeCache.clear()
  loadedDataCache.clear()
  itemWrapperStyleCache.clear()
})

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

function clearHandle() {
  const oldValue = modelValue.value
  Object.assign(state, {
    activeValues: [],
    visible: false,
  })
  modelValue.value = []
  itemWrapperStyleCache.clear()
  init()
  if (oldValue && Array.isArray(oldValue) && oldValue.length > 0) {
    emit('clear')
    emit('change', [])
  }
}

function deleteTag(value: string) {
  const currentValues = (modelValue.value || []) as string[]
  const index = currentValues.findIndex((v: string) => v === value)

  if (index >= 0) {
    currentValues.splice(index, 1)
    modelValue.value = [...currentValues]
    emit('delete', modelValue.value as string[], value)
    emit('change', modelValue.value as string[])
  }
}

function showHandle() {
  state.visible = true
}

function hideHandle() {
  state.visible = false
  itemWrapperStyleCache.clear()
}

const getCascaderWidth = computed(() => {
  const validGroups = state.optionsGroup.filter(group => group?.length > 0).length
  return Math.max(validGroups, 1) * 200
})

const VIRT_LIST_STYLE = {
  padding: '6px 6px 2px 6px',
  boxSizing: 'border-box' as const,
}

const ITEM_PADDING_STYLE = {
  height: '38px',
}

const getCascaderBodyStyle = computed(() => ({
  width: `${getCascaderWidth.value}px`,
}))

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-cascader-multiple-body', { size, disabled })
})

function getItemClass(templateProps: any) {
  const isSelected
    = Array.isArray(modelValue.value) && modelValue.value.includes(templateProps.value)
  return {
    'lew-cascader-multiple-item-disabled': templateProps.disabled,
    'lew-cascader-multiple-item-active':
      state.activeValues?.includes(templateProps.value) || false,
    'lew-cascader-multiple-item-selected': isSelected,
  }
}

// 添加获取已选中项的计算属性
const getChecked = computed(() => {
  const currentValues = (modelValue.value || []) as string[]
  return (value: string) => currentValues.includes(value)
})

// 添加格式化已选项的计算属性
const formatItems = computed(() => {
  if (!modelValue.value || !Array.isArray(modelValue.value)) {
    return []
  }

  return modelValue.value.map((value: string) => {
    const { label }: any = findObjectByValue(state.optionsTree, value, nodeCache)
    return {
      value,
      label,
    }
  })
})

function getItemWrapperStyle(oIndex: number, oItem: any) {
  const key = `${oIndex}-${oItem.length}-${state.optionsGroup.length}`
  if (itemWrapperStyleCache.has(key)) {
    return itemWrapperStyleCache.get(key)!
  }
  const style = {
    zIndex: 20 - oIndex,
    borderRadius: `0 ${
      oIndex === state.optionsGroup.length - 1 ? 'var(--lew-border-radius-small)' : '0'
    } 0 0`,
    transform: oItem.length > 0 ? `translateX(${200 * oIndex}px)` : '',
  }
  itemWrapperStyleCache.set(key, style)
  return style
}

defineExpose({
  show,
  hide,
})
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    class="lew-cascader-multiple-view"
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
      <SelectMultipleInput
        v-model="modelValue"
        :loading="state.initLoading"
        :clearable="clearable"
        :readonly="readonly"
        :disabled="disabled || state.initLoading"
        :size="size"
        :placeholder="placeholder"
        :value-layout="valueLayout"
        :value-text-split="valueTextSplit"
        :width="any2px(width)"
        :is-focus="state.visible"
        :format-items
        @clear="clearHandle"
        @delete="deleteTag"
      />
    </template>
    <template #popover-body>
      <div
        class="lew-cascader-multiple-body"
        :style="getCascaderBodyStyle"
        :class="getBodyClassName"
      >
        <slot name="header" />
        <transition name="fade">
          <div
            v-if="state.optionsGroup.length > 0"
            class="lew-cascader-multiple-options-box"
          >
            <template v-for="(oItem, oIndex) in state.optionsGroup" :key="oIndex">
              <div
                class="lew-cascader-multiple-item-wrapper"
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
                      class="lew-cascader-multiple-item-padding"
                      :style="ITEM_PADDING_STYLE"
                      @click="selectItem(templateProps, oIndex)"
                    >
                      <div
                        class="lew-cascader-multiple-item"
                        :class="getItemClass(templateProps)"
                      >
                        <LewCheckbox
                          :key="templateProps.value"
                          class="lew-cascader-multiple-checkbox"
                          :checked="getChecked(templateProps.value)"
                          @change="changeCheck(templateProps)"
                        />

                        <div
                          :title="templateProps.label"
                          class="lew-cascader-multiple-label"
                        >
                          {{ templateProps.label }}
                        </div>

                        <CommonIcon
                          v-show="templateProps.loading"
                          :size="14"
                          loading
                          class="lew-cascader-multiple-loading-icon"
                          type="loader"
                        />
                        <CommonIcon
                          v-show="!templateProps.loading && !templateProps.isLeaf"
                          :size="16"
                          class="lew-cascader-multiple-icon"
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
.lew-cascader-multiple-view {
  width: 100%;

  > div {
    width: 100%;
  }
}

.lew-cascader-multiple-body {
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

  .lew-cascader-multiple-options-box {
    position: relative;
    display: flex;
    box-sizing: border-box;
    height: 100%;

    .lew-cascader-multiple-item-wrapper {
      position: absolute;
      overflow: hidden;
      height: 100%;
      width: 200px;
      box-sizing: border-box;
      gap: 4px;
    }

    .lew-cascader-multiple-item-wrapper::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: var(--lew-pop-border-color);
    }

    .lew-cascader-multiple-item-wrapper:last-child::after {
      display: none;
    }

    .lew-cascader-multiple-item {
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

      .lew-cascader-multiple-icon {
        position: absolute;
        right: 2px;
        top: 10px;
        color: var(--lew-text-color-1);
      }

      .lew-cascader-multiple-loading-icon {
        position: absolute;
        right: 5px;
        top: 8.5px;
      }

      .lew-cascader-multiple-label {
        position: relative;
        z-index: 5;
        width: calc(100% - 36px);
        user-select: none;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }
    }

    .lew-cascader-multiple-item:hover {
      .icon {
        opacity: 1;
      }
    }

    .lew-cascader-multiple-item-disabled {
      opacity: var(--lew-disabled-opacity);
      pointer-events: none;
    }

    .lew-cascader-multiple-item-align-left {
      text-align: left;
    }

    .lew-cascader-multiple-item-align-center {
      text-align: center;
    }

    .lew-cascader-multiple-item-align-right {
      text-align: right;
    }

    .lew-cascader-multiple-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-form-bgcolor);
    }

    .lew-cascader-multiple-slot-item {
      border-radius: 6px;
    }

    .lew-cascader-multiple-slot-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-form-bgcolor);
    }

    .lew-cascader-multiple-item-active {
      background-color: var(--lew-form-bgcolor);

      .lew-cascader-multiple-icon {
        opacity: 1;
      }

      .icon-check {
        margin-right: 10px;
      }
    }
  }
}
</style>
