<script setup lang="ts">
import {
  LewPopover,
  LewFlex,
  LewButton,
  LewTooltip,
  LewTextTrim,
  LewCheckbox
} from 'lew-ui'
import { object2class } from 'lew-ui/utils'
import type { CascaderOptions } from './props'
import { cascaderProps } from './props'
import { VirtList } from 'vue-virt-list'
import { cloneDeep, isFunction } from 'lodash-es'
import Icon from 'lew-ui/utils/Icon.vue'
import { any2px } from 'lew-ui/utils'
import { locale } from 'lew-ui'
// 格式化 获取 path
const formatTree = (
  tree: CascaderOptions[],
  parentValuePaths: String[] = [],
  parentLabelPaths: String[] = []
): CascaderOptions[] => {
  return tree.map((node: CascaderOptions) => {
    const { value, label, children = [] } = node
    const valuePaths: String[] = [...parentValuePaths, value]
    const labelPaths: String[] = [...parentLabelPaths, label]
    const level = valuePaths.length - 1
    const _node = {
      ...node,
      valuePaths,
      labelPaths,
      level,
      parentValuePaths,
      parentLabelPaths
    }
    if ((children || []).length > 0) {
      return {
        ..._node,
        children: formatTree(children, valuePaths, labelPaths)
      }
    }
    return _node
  }) as CascaderOptions[]
}

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const props = defineProps(cascaderProps)
const emit = defineEmits(['change', 'blur', 'clear'])

const cascaderValue: Ref<string | number | undefined> = defineModel({
  default: undefined
})

const lewCascaderRef = ref()
const lewPopoverRef = ref()

const state = reactive({
  visible: false,
  loading: false,
  initLoading: true,
  okLoading: false,
  optionsGroup: [] as CascaderOptions[][], // 分组
  optionsTree: [] as any, // 树
  activeLabels: [] as string[], // 激活
  tobeLabels: [] as string[], // 待确认
  tobeItem: {} as CascaderOptions,
  keyword: ''
})

const formMethods: any = inject('formMethods', {})

let _loadMethod = computed(() => {
  if (isFunction(props.loadMethod)) {
    return props.loadMethod
  } else if (props.loadMethodId) {
    return formMethods[props.loadMethodId]
  }
  return false
})

let _initOptionsMethod = computed(() => {
  if (isFunction(props.initOptionsMethod)) {
    return props.initOptionsMethod
  } else if (props.initOptionsMethodId) {
    return formMethods[props.initOptionsMethodId]
  }
  return false
})

// 创建一个对象来存储已加载的数据
const loadedData = reactive<Record<string, CascaderOptions[]>>({})

// 通过值获取对象
const findObjectByValue = (treeList: CascaderOptions[], value: string) => {
  for (let i = 0; i < treeList.length; i++) {
    const tree = treeList[i]
    if (tree.value === value) {
      return tree
    }
    if (tree.children) {
      const foundObject: CascaderOptions = findObjectByValue(
        tree.children,
        value
      ) as CascaderOptions
      if (foundObject) {
        return foundObject
      }
    }
  }
  return null
}
// 通过值添加子集
function findAndAddChildrenByValue(
  tree: CascaderOptions[],
  value: string,
  children: CascaderOptions[]
): CascaderOptions[] {
  for (const node of tree) {
    if (node.value === value) {
      if (!node.children) {
        node.children = []
      }
      node.children = children
      return tree
    }
    if (node.children && node.children.length > 0) {
      const result = findAndAddChildrenByValue(node.children, value, children)
      if (result && result.length > 0) {
        return tree
      }
    }
  }
  return []
}
// 通过值查找子集
function findChildrenByValue(
  tree: CascaderOptions[],
  value: string
): CascaderOptions[] {
  for (const node of tree) {
    if (node.value === value) {
      return node.children || []
    }

    if (node.children && node.children.length > 0) {
      const result = findChildrenByValue(node.children, value)
      if (result && result.length > 0) {
        return result
      }
    }
  }

  return []
}

// 初始化
const init = async () => {
  let _tree: CascaderOptions[] = []
  
  // 如果有初始化方法，优先使用
  if (_initOptionsMethod.value) {
    try {
      const newOptions = await _initOptionsMethod.value()
      _tree = newOptions || []
    } catch (error) {
      console.error('[LewCascader] initOptionsMethod failed', error)
      _tree = []
    }
  } else if (_loadMethod.value && !state.loading) {
    state.loading = true
    _tree = (await _loadMethod.value()) || []
    state.loading = false
  } else if (props.options && props.options.length > 0) {
    _tree =
      ((props.options &&
        props.options.map((e: CascaderOptions) => {
          return {
            ...e,
            isLeaf: !e.children || (e.children && e.children.length === 0) // 没有孩子
          }
        })) as CascaderOptions[]) || []
  }
  const __tree: CascaderOptions[] = formatTree(_tree)
  state.optionsGroup = [__tree]
  state.optionsTree = __tree
  state.initLoading = false
}

init()

// 监听 options 变化
watch(
  () => props.options,
  (newOptions) => {
    if (!_initOptionsMethod.value) {
      // 只有在没有使用 initOptionsMethod 时才响应 options 的变化
      const _tree = ((newOptions &&
        newOptions.map((e: CascaderOptions) => {
          return {
            ...e,
            isLeaf: !e.children || (e.children && e.children.length === 0)
          }
        })) as CascaderOptions[]) || []
      const __tree: CascaderOptions[] = formatTree(_tree)
      state.optionsGroup = [__tree]
      state.optionsTree = __tree
    }
  },
  {
    deep: true
  }
)

const virtListRefs = ref<any[]>([])

// 选择
const selectItem = async (item: CascaderOptions, level: number) => {
  if (!item.isLeaf && item.labelPaths !== state.activeLabels) {
    state.optionsGroup = state.optionsGroup.slice(0, level + 1)
    if (_loadMethod.value && !item.isLeaf) {
      if (loadedData[item.value]) {
        // 如果数据已经加载过，直接使用缓存的数据
        const _options = loadedData[item.value]
        state.optionsGroup.push(_options)
      } else {
        item.loading = true
        state.okLoading = true
        const new_options =
          (await _loadMethod.value(cloneDeep({ ...item, level }))) || []
        let _tree = findAndAddChildrenByValue(
          cloneDeep(state.optionsTree),
          cloneDeep(item.value),
          new_options
        )
        state.optionsTree = formatTree(_tree)
        const _options = findChildrenByValue(state.optionsTree, item.value)
        state.optionsGroup.push(_options)
        // 将新加载的数据存储到对象中
        loadedData[item.value] = _options
        item.loading = false
        state.okLoading = false
      }
    } else if (!item.isLeaf) {
      const _options =
        (item.children &&
          item.children.map((e) => {
            return {
              ...e,
              isLeaf: !e.children || (e.children && e.children.length === 0) // 没有孩子
            }
          })) ||
        []
      state.optionsGroup.push(_options)
    }
  }
  if (item.labelPaths === state.activeLabels) {
    state.activeLabels = item.parentLabelPaths as string[]
    if (level < state.optionsGroup.length - 1) {
      state.optionsGroup.pop()
    }
  } else {
    state.activeLabels = item.labelPaths as string[]
  }
  state.tobeItem = { ...item, children: undefined }
  if (props.free) {
    checkItem(item)
  } else if (item.isLeaf) {
    checkItem(item)
    ok()
  }
}

// 检查Item
const checkItem = (item: CascaderOptions) => {
  if (props.showAllLevels) {
    if (state.tobeLabels === item.labelPaths) {
      state.tobeLabels = item.parentLabelPaths as string[]
    } else {
      state.tobeLabels = item.labelPaths as string[]
    }
  } else if (state.tobeLabels[0] === (item.label as string)) {
    state.tobeLabels = [] as string[]
  } else {
    state.tobeLabels = [item.label] as any
  }
}

const show = async () => {
  lewPopoverRef.value.show()
}

const hide = () => {
  lewPopoverRef.value.hide()
}

const clearHandle = () => {
  cascaderValue.value = undefined as any
  state.tobeLabels = []
  state.activeLabels = []
  hide()
  init()
  emit('clear')
  emit('change')
}

const getValueStyle = computed(() => {
  const { size } = props

  const widthMap = {
    small: 'calc(100% - 24px)',
    medium: 'calc(100% - 24px)',
    large: 'calc(100% - 24px)'
  }
  return {
    width: widthMap[size],
    padding: `var(--lew-form-input-padding-${size})`,
    fontSize: `var(--lew-form-font-size-${size})`,
    lineHeight: `calc(var(--lew-form-item-height-${size}) - (var(--lew-form-border-width) * 2))`,
    opacity: state.visible ? 0.4 : 1
  }
})

const getCascaderClassName = computed(() => {
  let { clearable, disabled, readonly } = props
  clearable = clearable ? !!cascaderValue.value : false
  const focus = state.visible

  return object2class('lew-cascader', {
    clearable,
    disabled,
    readonly,
    focus,
    'init-loading': state.initLoading
  })
})

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-cascader-body', { size, disabled })
})

// 获取图标大小
const getIconSize = computed(() => {
  const size: Record<string, number> = {
    small: 14,
    medium: 15,
    large: 16
  }
  return size[props.size]
})

// 展示
const showHandle = () => {
  state.visible = true
}

// 隐藏
const hideHandle = () => {
  state.visible = false
  emit('blur')
}

// 获取宽度
const getCascaderWidth = computed(() => {
  const _hasChildOptions = state.optionsGroup.filter(
    (e) => e && e.length > 0
  ).length
  if (_hasChildOptions > 1) {
    return _hasChildOptions * 200
  }
  return _hasChildOptions * 200
})

const getCascaderStyle = computed(() => {
  const { size } = props

  return {
    height: `var(--lew-form-item-height-${size})`
  }
})

const getLabel = computed(() => {
  const item = findObjectByValue(
    state.optionsTree,
    cascaderValue.value as string
  )
  return item?.labelPaths || []
})

const ok = () => {
  const item = findObjectByValue(state.optionsTree, state.tobeItem.value)
  cascaderValue.value = state.tobeItem.value
  emit('change', cloneDeep(item))

  hide()
}

const close = () => {
  hide()
}

defineExpose({ show, hide })
</script>

<template>
  <lew-popover
    ref="lewPopoverRef"
    class="lew-cascader-view"
    :trigger="trigger"
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
          <Icon
            :size="getIconSize"
            :loading="state.initLoading"
            type="loading"
          />
        </div>

        <transition v-else name="lew-form-icon-ani">
          <Icon
            v-if="!(clearable && getLabel && getLabel.length > 0)"
            :size="getIconSize"
            type="chevron-down"
            class="icon-select"
          />
        </transition>

        <transition name="lew-form-icon-ani">
          <Icon
            v-if="clearable && getLabel && getLabel.length > 0 && !readonly"
            :size="getIconSize"
            type="close"
            class="lew-form-icon-close"
            :class="{
              'lew-form-icon-close-focus': state.visible
            }"
            @click.stop="clearHandle"
          />
        </transition>

        <div
          class="lew-cascader-value"
          v-show="getLabel && getLabel.length > 0"
          :style="getValueStyle"
        >
          <template v-if="showAllLevels">
            <lew-text-trim :text="getLabel.join(' / ')" />
          </template>
          <template v-else-if="getLabel">
            <span>{{ getLabel[getLabel.length - 1] }}</span>
          </template>
        </div>
        <div
          v-show="!getLabel || (getLabel && getLabel.length === 0)"
          class="lew-cascader-placeholder"
          :style="getValueStyle"
        >
          {{ placeholder ? placeholder : locale.t('cascader.placeholder') }}
        </div>
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-cascader-body"
        :style="{
          width: `${getCascaderWidth}px`
        }"
        :class="getBodyClassName"
      >
        <slot name="header"></slot>
        <transition name="fade">
          <div
            class="lew-cascader-options-box"
            :style="{ height: free ? 'calc(100% - 48px)' : '100%' }"
          >
            <template
              v-for="(oItem, oIndex) in state.optionsGroup"
              :key="oIndex"
            >
              <div
                class="lew-cascader-item-wrapper"
                :style="{
                  zIndex: 20 - oIndex,
                  borderRadius: `0 ${
                    oIndex === state.optionsGroup.length - 1
                      ? 'var(--lew-border-radius-small)'
                      : '0'
                  } 0 0`,
                  transform:
                    oItem.length > 0 ? `translateX(${200 * oIndex}px)` : ''
                }"
              >
                <virt-list
                  :key="oItem[0]?.parentValuePaths?.join('-') || 'root'"
                  :ref="(el: any) => (virtListRefs[oIndex] = el)"
                  class="lew-scrollbar-hover"
                  :list="oItem"
                  :minSize="38"
                  :buffer="5"
                  itemKey="value"
                  :style="{
                    padding: `6px 6px 2px 6px`,
                    boxSizing: 'border-box'
                  }"
                >
                  <template #default="{ itemData: templateProps }">
                    <div
                      class="lew-cascader-item-padding"
                      :style="{ height: 38 + 'px' }"
                    >
                      <div
                        class="lew-cascader-item"
                        :class="{
                          'lew-cascader-item-disabled': templateProps.disabled,
                          'lew-cascader-item-hover':
                            state.activeLabels.includes(templateProps.label),
                          'lew-cascader-item-active': free
                            ? state.activeLabels.includes(
                                templateProps.label
                              ) &&
                              state.tobeLabels.includes(templateProps.label)
                            : state.activeLabels.includes(templateProps.label),
                          'lew-cascader-item-tobe': state.tobeLabels.includes(
                            templateProps.label
                          ),
                          'lew-cascader-item-selected':
                            getLabel &&
                            getLabel.includes(templateProps.label) &&
                            state.tobeLabels.includes(templateProps.label)
                        }"
                        @click="selectItem(templateProps, oIndex)"
                      >
                        <lew-checkbox
                          v-if="free"
                          class="lew-cascader-checkbox"
                          :checked="
                            state.tobeLabels.includes(templateProps.label)
                          "
                        />
                        <lew-text-trim
                          class="lew-cascader-label"
                          :class="{
                            'lew-cascader-label-free': free
                          }"
                          :text="templateProps.label"
                          :delay="[500, 0]"
                        />
                        <Icon
                          v-if="templateProps.loading"
                          :size="14"
                          loading
                          class="lew-cascader-loading-icon"
                          type="loader"
                        />
                        <Icon
                          v-else-if="!templateProps.isLeaf"
                          :size="16"
                          class="lew-cascader-icon"
                          type="chevron-right"
                        />
                      </div>
                    </div>
                  </template>
                </virt-list>
              </div>
            </template>
          </div>
        </transition>

        <lew-flex v-if="free" x="end" gap="5" class="lew-cascader-control">
          <lew-button color="gray" type="text" size="small" @click="close">
            {{ locale.t('cascader.closeText') }}
          </lew-button>
          <lew-button :disabled="state.okLoading" size="small" @click="ok()">
            {{ locale.t('cascader.okText') }}
          </lew-button>
        </lew-flex>
      </div>
    </template>
  </lew-popover>
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

    .icon-select {
      position: absolute;
      top: 50%;
      right: 9px;
      transform: translateY(-50%) rotate(0deg);
      transition: all var(--lew-form-transition-bezier);
      padding: 2px;
    }

    .lew-icon-loading-box {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      right: 9px;
      padding: 2px;
      box-sizing: border-box;
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
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
      solid;

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
    pointer-events: none; //鼠标点击不可修改
  }

  .lew-cascader-readonly {
    pointer-events: none; //鼠标点击不可修改

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

.lew-cascader-item:hover {
  .lew-checkbox:deep(.lew-checkbox-icon-box) {
    border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover)
      solid;

    background: var(--lew-form-bgcolor);
  }
}

.lew-cascader-item-tobe:hover {
  .lew-checkbox:deep(.lew-checkbox-icon-box) {
    border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
    background: var(--lew-checkbox-color);

    .icon-checkbox {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 1;
    }
  }
}

.lew-cascader-item-selected:hover {
  .lew-checkbox:deep(.lew-checkbox-icon-box) {
    border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
    background: var(--lew-checkbox-color);

    .icon-checkbox {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 1;
    }
  }
}
</style>
<style lang="scss">
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

    .lew-cascader-item-wrapper {
      position: absolute;
      overflow: hidden;
      height: 100%;
      width: 200px;
      border-right: var(--lew-pop-border);
      box-sizing: border-box;
      gap: 4px;
    }

    .lew-cascader-item-wrapper:last-child {
      border-right: 0px var(--lew-form-border-color) solid;
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
        opacity: 0.4;
      }
      .lew-cascader-loading-icon {
        position: absolute;
        right: 5px;
        top: 8.5px;
      }
      .lew-cascader-checkbox {
        position: absolute;
        left: 10px;
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
      background-color: var(--lew-pop-bgcolor-hover);
    }

    .lew-cascader-slot-item {
      border-radius: 6px;
    }

    .lew-cascader-slot-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bgcolor-hover);
    }

    .lew-cascader-item-hover {
      background-color: var(--lew-pop-bgcolor-hover);
      .icon-check {
        margin-right: 10px;
      }
    }
    .lew-cascader-item-active {
      color: var(--lew-checkbox-color);
      font-weight: bold;
      .lew-cascader-icon {
        opacity: 1;
      }
      .icon-check {
        margin-right: 10px;
      }
    }

    .lew-cascader-item-active:hover {
      color: var(--lew-checkbox-color);
      font-weight: bold;
    }
  }

  .lew-cascader-control {
    border-top: var(--lew-pop-border);
    height: 48px;
    padding-right: 10px;
  }
}
</style>
