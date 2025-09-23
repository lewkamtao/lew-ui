<script setup lang="ts">
import type { LewCascaderOption } from 'lew-ui/types'
import type { CascaderNodeCache } from './cascader'
import { LewCheckbox, LewPopover, LewTextTrim, LewTooltip, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { isFunction } from 'lodash-es'
import { VirtList } from 'vue-virt-list'
import {
  createCascaderCache,
  findAndAddChildrenByValue,
  findChildrenByValue,
  findObjectByValue,
  formatTree,
} from './cascader'
import { cascaderEmits } from './emits'
import { cascaderProps } from './props'

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)
const modelValue = defineModel()

const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const lewCascaderRef = ref()
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

async function selectItem(item: LewCascaderOption, level: number) {
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

  if (arrayEquals(item.valuePaths, state.activeValues)) {
    state.activeValues = (item.parentValuePaths as string[]) || []
    if (level < state.optionsGroup.length - 1) {
      state.optionsGroup.pop()
    }
  }
  else {
    state.activeValues = (item.valuePaths as string[]) || []
  }
  if (modelValue.value === item.value) {
    modelValue.value = undefined
  }
  else {
    modelValue.value = item.value
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
  modelValue.value = undefined
  itemWrapperStyleCache.clear()
  init()
  if (oldValue !== undefined) {
    emit('clear')
    emit('change', undefined)
  }
}

const VALUE_STYLE_BASE = {
  width: 'calc(100% - 24px)',
}

const getValueStyle = computed(() => {
  const { size } = props
  return {
    ...VALUE_STYLE_BASE,
    padding: `var(--lew-form-input-padding-${size})`,
    fontSize: `var(--lew-form-font-size-${size})`,
    lineHeight: `calc(var(--lew-form-item-height-${size}) - (var(--lew-form-border-width) * 2))`,
    opacity: state.visible ? 0.4 : 1,
  }
})

function showHandle() {
  state.visible = true
}

function hideHandle() {
  state.visible = false
  itemWrapperStyleCache.clear()
}

const getLabel = computed(() => {
  if (!modelValue.value)
    return []
  const item = findObjectByValue(
    state.optionsTree,
    modelValue.value as string,
    nodeCache,
  )
  return item?.labelPaths || []
})

const getDisplayText = computed(() => {
  const labels = getLabel.value
  if (!labels.length) {
    return props.placeholder || locale.t('cascader.placeholder')
  }
  return props.showAllLevels ? labels.join(' / ') : labels[labels.length - 1]
})

const hasValue = computed(() => getLabel.value.length > 0)
const shouldShowValue = computed(() => hasValue.value)
const shouldShowPlaceholder = computed(() => !hasValue.value)
const shouldShowClearIcon = computed(
  () => props.clearable && hasValue.value && !props.readonly,
)
const shouldShowSelectIcon = computed(() => !props.clearable || !hasValue.value)

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

const getCascaderStyle = computed(() => ({
  height: `var(--lew-form-item-height-${props.size})`,
}))

const getCascaderBodyStyle = computed(() => ({
  width: `${getCascaderWidth.value}px`,
}))

const getLabelClass = computed(() => ({
  'lew-cascader-label-free': props.free,
}))

const getCascaderClassName = computed(() => {
  const { disabled, readonly } = props
  const clearable = props.clearable && !!modelValue.value
  const focus = state.visible
  return object2class('lew-cascader', {
    clearable,
    disabled,
    readonly,
    focus,
    'init-loading': state.initLoading,
  })
})

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-cascader-body', { size, disabled })
})

const ICON_SIZE_MAP = {
  small: 14,
  medium: 15,
  large: 16,
} as const

const getIconSize = computed(() => ICON_SIZE_MAP[props.size])

function getItemClass(templateProps: any) {
  return {
    'lew-cascader-item-disabled': templateProps.disabled,
    'lew-cascader-item-active':
      state.activeValues?.includes(templateProps.value) || false,
    'lew-cascader-item-selected': templateProps.value === modelValue.value,
  }
}

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
      <div
        ref="lewCascaderRef"
        class="lew-cascader"
        :class="getCascaderClassName"
        :style="getCascaderStyle"
      >
        <div v-if="state.initLoading" class="lew-icon-loading-box">
          <CommonIcon :size="getIconSize" :loading="state.initLoading" type="loading" />
        </div>

        <transition v-else name="lew-form-icon-ani">
          <CommonIcon
            v-if="shouldShowSelectIcon"
            :size="getIconSize"
            type="chevron-down"
            class="icon-select"
          />
        </transition>

        <transition name="lew-form-icon-ani">
          <CommonIcon
            v-if="shouldShowClearIcon"
            :size="getIconSize"
            type="close"
            class="lew-form-icon-close"
            :class="{
              'lew-form-icon-close-focus': state.visible,
            }"
            @click.stop="clearHandle"
          />
        </transition>

        <div v-show="shouldShowValue" class="lew-cascader-value" :style="getValueStyle">
          <LewTextTrim :text="getDisplayText" />
        </div>
        <div
          v-show="shouldShowPlaceholder"
          class="lew-cascader-placeholder"
          :style="getValueStyle"
        >
          {{ getDisplayText }}
        </div>
      </div>
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
                    <div class="lew-cascader-item-padding" :style="ITEM_PADDING_STYLE">
                      <div
                        class="lew-cascader-item"
                        :class="getItemClass(templateProps)"
                        @click="selectItem(templateProps, oIndex)"
                      >
                        <LewCheckbox
                          v-if="props.free"
                          class="lew-cascader-checkbox"
                          :checked="templateProps.value === modelValue"
                        />

                        <div
                          class="lew-cascader-label"
                          :title="templateProps.label"
                          :class="getLabelClass"
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

  .lew-cascader {
    position: relative;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: var(--lew-border-radius-small);
    background-color: var(--lew-form-bgcolor);
    transition: all var(--lew-form-transition-ease);
    box-sizing: border-box;
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    box-shadow: var(--lew-form-box-shadow);
    user-select: none;

    .icon-select {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%) rotate(0deg);
      transition: all var(--lew-form-transition-bezier);
    }

    .lew-icon-loading-box {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
    }

    .icon-select {
      opacity: var(--lew-form-icon-opacity);
    }

    .icon-select-hide {
      opacity: 0;
      transform: translate(100%, -50%);
    }

    .lew-cascader-placeholder {
      color: rgb(165, 165, 165);
    }

    .lew-cascader-placeholder,
    .lew-cascader-value {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      transition: all var(--lew-form-transition-bezier);
      gap: 2px;
      overflow: hidden;
      height: 100%;

      span {
        display: inline-flex;
        gap: 2px;
        align-items: center;

        svg {
          opacity: 0.4;
        }
      }
    }
  }

  .lew-cascader-align-left {
    text-align: left;
  }

  .lew-cascader-align-center {
    text-align: center;
  }

  .lew-cascader-align-right {
    text-align: right;
  }

  .lew-cascader-placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-cascader:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-cascader:active {
    background-color: var(--lew-form-bgcolor-active);
  }

  .lew-cascader-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

    .icon-select {
      transform: translateY(-50%) rotate(180deg);
      color: var(--lew-text-color-1);
    }

    .icon-select-hide {
      opacity: 0;
      transform: translate(100%, -50%) rotate(180deg);
    }
  }

  .lew-cascader-focus:hover {
    background-color: var(--lew-form-bgcolor-focus);
  }

  .lew-cascader-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  .lew-cascader-readonly {
    pointer-events: none;

    :deep(.lew-text-trim-wrapper) {
      user-select: text;
      cursor: text;
    }
  }

  .lew-cascader-disabled:hover {
    background-color: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  }

  .lew-cascader-init-loading {
    pointer-events: none;
    cursor: wait;

    .lew-cascader-placeholder,
    .lew-cascader-value {
      cursor: wait;
    }
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
      gap: 10px;
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

      .lew-cascader-icon {
        position: absolute;
        right: 2px;
        top: 10px;
        color: var(--lew-text-color-5);
      }

      .lew-cascader-loading-icon {
        position: absolute;
        right: 5px;
        top: 8.5px;
      }

      .lew-cascader-checkbox {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
      }

      .lew-cascader-label {
        position: relative;
        z-index: 5;
        width: 100%;
        user-select: none;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
        padding: 0px 12px;
      }

      .lew-cascader-label-free {
        padding: 0px 14px 0px 38px;
      }
    }

    .lew-cascader-item:hover {
      .icon {
        opacity: 1;
      }
    }
    .lew-cascader-item:hover {
      .lew-checkbox:deep(.lew-checkbox-icon-box) {
        border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;

        background: var(--lew-form-bgcolor);
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
        position: absolute;
        right: 2px;
        top: 10px;
        color: var(--lew-text-color-1);
      }

      .icon-check {
        margin-right: 10px;
      }
    }

    .lew-cascader-item-selected {
      color: var(--lew-checkbox-color);

      .lew-cascader-icon {
        color: var(--lew-checkbox-color);
      }
    }

    .lew-cascader-item-selected:hover {
      color: var(--lew-checkbox-color);
      .lew-cascader-icon {
        color: var(--lew-checkbox-color);
      }
      .lew-checkbox:deep(.lew-checkbox-icon-box) {
        border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
        background: var(--lew-checkbox-color);

        .icon-checkbox {
          transform: translate(-50%, -50%) scale(0.7);
          opacity: 1;
        }
      }
    }
  }
}
</style>
