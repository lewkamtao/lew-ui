<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { LewPopover, LewTree, LewIcon, LewTooltip } from 'lew-ui'
import type { TreeDataSource } from '../../tree'
import { object2class, numFormat } from 'lew-ui/utils'
import { treeSelectProps } from './props'
import { cloneDeep } from 'lodash-es'

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const props = defineProps(treeSelectProps)
const emit = defineEmits(['change', 'blur', 'clear'])
const treeSelectValue: Ref<string | undefined> = defineModel()

const lewSelectRef = ref()
const inputRef = ref()
const lewPopverRef = ref()
const lewTreeRef = ref()

const state = reactive({
  selectWidth: 0,
  visible: false,
  loading: false,
  initLoading: true,
  treeList: [],
  hideBySelect: false, // 记录是否通过选择隐藏
  keyword: props.defaultValue || (treeSelectValue.value as any),
  keywordBackup: props.defaultValue as any
})

const getSelectWidth = () => {
  state.selectWidth = lewSelectRef.value?.clientWidth - 12
}

const show = () => {
  lewPopverRef.value.show()
}

const hide = () => {
  lewPopverRef.value.hide()
}

const searchDebounce = useDebounceFn(async (e: any) => {
  search(e)
}, props.searchDelay)

const search = async (e: any) => {
  state.loading = true
  const keyword = e.target.value
  if (props.searchable) {
    state.treeList = lewTreeRef.value.init(keyword)
  }
  state.loading = false
}

const change = ({ item }: { item: TreeDataSource }) => {
  if (item.disabled) {
    return
  }

  state.hideBySelect = true
  // @ts-ignore
  emit('change', item[props.keyField])
  setTimeout(() => {
    hide()
  }, 100)
}

const clearHandle = () => {
  treeSelectValue.value = undefined
  state.keyword = ''
  state.keywordBackup = ''
  emit('clear')
  emit('change')
}

const getValueStyle = computed(() => {
  return state.visible ? 'opacity:0.6' : ''
})

const findKeyword = () => {
  if (lewTreeRef.value) {
    const treeList = lewTreeRef.value.getTreeList()
    const treeItem = treeList.find((e: TreeDataSource) => {
      // @ts-ignore
      return e[props.keyField] === treeSelectValue.value
    })

    if (props.showAllLevels) {
      state.keyword = treeItem.labelPaths.join(' / ')
    } else {
      state.keyword = treeItem.label
    }
  }
  return treeSelectValue.value
}
findKeyword()

const getSelectClassName = computed(() => {
  let { clearable, size, align } = props
  clearable = clearable ? !!treeSelectValue.value : false
  return object2class('lew-select', { clearable, size, align })
})

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-select-body', { size, disabled })
})

const getSelectViewClassName = computed(() => {
  const { disabled, readonly, searchable } = props
  const focus = state.visible
  return object2class('lew-select-view', {
    focus,
    searchable,
    disabled,
    readonly: readonly || state.initLoading
  })
})

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16
  }
  return size[props.size]
})

const showHandle = () => {
  state.visible = true
  state.keywordBackup = cloneDeep(state.keyword)
  if (props.searchable) {
    state.keyword = ''
  }
  state.hideBySelect = false // 重置
  getSelectWidth()
  if (props.searchable) {
    search({ target: { value: '' } })
  }
}

const hideHandle = () => {
  state.visible = false
  if (!state.hideBySelect) {
    findKeyword()
  }
  inputRef.value.blur()
  emit('blur')
}

watch(
  () => treeSelectValue.value,
  () => {
    findKeyword()
  }
)

defineExpose({ show, hide })
</script>

<template>
  <lew-popover
    ref="lewPopverRef"
    popoverBodyClassName="lew-select-popover-body"
    class="lew-select-view"
    :class="getSelectViewClassName"
    :trigger="trigger"
    :disabled="disabled"
    placement="bottom-start"
    style="width: 100%"
    :offset="[-1, 10]"
    :loading="state.loading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div ref="lewSelectRef" class="lew-select" :class="getSelectClassName">
        <lew-icon
          v-if="!readonly && !state.initLoading"
          :size="getIconSize"
          type="chevron-down"
          class="icon-select"
          :class="{ 'icon-select-hide': clearable && state.keyword }"
        />
        <lew-icon
          v-else-if="state.initLoading"
          type="loader"
          :size="getIconSize"
          class="icon-loader"
        />
        <transition name="lew-form-icon-ani">
          <lew-icon
            v-if="clearable && state.keyword && !readonly"
            :size="getIconSize"
            type="x"
            class="lew-form-icon-clear"
            :class="{
              'lew-form-icon-clear-focus': state.visible
            }"
            @click.stop="clearHandle"
          />
        </transition>
        <input
          ref="inputRef"
          v-model="state.keyword"
          class="value"
          :style="getValueStyle"
          :readonly="!searchable"
          :placeholder="
            state.initLoading ? '数据初始化中···' : state.keywordBackup || props.placeholder
          "
          @input="searchDebounce"
        />
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="`width:${state.selectWidth}px`"
      >
        <slot name="header"></slot>

        <div class="lew-select-options-box">
          <div v-if="searchable && (state.treeList || []).length > 0" class="reslut-count">
            共
            {{ numFormat((state.treeList || []).length) }}
            条结果
          </div>
          <div class="tree-select-wrapper lew-scrollbar">
            <lew-tree
              ref="lewTreeRef"
              v-model="treeSelectValue"
              v-bind="{
                keyField,
                labelField,
                disabledField,
                showLine,
                showCheckbox,
                dataSource,
                onload,
                initTree,
                expandAll: expandAll
              }"
              @initSuccess="state.initLoading = false"
              @change="change"
            >
              <template v-if="$slots.empty" #empty>
                <slot name="empty"></slot>
              </template>
              <template v-if="$slots.item" #item="{ props }">
                <slot name="item" :props="props"></slot>
              </template>
            </lew-tree>
          </div>
        </div>
        <slot name="footer"></slot>
      </div>
    </template>
  </lew-popover>
</template>

<style lang="scss" scoped>
.lew-select-view {
  width: 100%;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  transition: all 0.15s ease;
  box-sizing: border-box;
  outline: 0px var(--lew-color-primary-light) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;

  > div {
    width: 100%;
  }

  .lew-select {
    position: relative;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;

    .icon-select {
      position: absolute;
      top: 50%;
      right: 9px;
      transform: translateY(-50%) rotate(0deg);
      transition: var(--lew-form-transition);
      padding: 2px;
    }

    .icon-loader {
      position: absolute;
      top: 50%;
      right: 9px;
      animation: icon-spin 1s infinite linear;
    }
    @keyframes icon-spin {
      0% {
        transform: translateY(-50%) rotate(0deg);
      }
      100% {
        transform: translateY(-50%) rotate(360deg);
      }
    }

    .icon-select {
      opacity: var(--lew-form-icon-opacity);
    }

    .icon-select-hide {
      opacity: 0;
      transform: translate(100%, -50%);
    }

    .value {
      width: calc(100% - 24px);
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      transition: all 0.2s;
      border: none;
      outline: none;
      background: none;
      cursor: pointer;
      color: var(--lew-text-color-1);
    }

    .value::placeholder {
      color: rgb(165, 165, 165);
    }
  }
  .lew-select-align-left {
    text-align: left;
  }

  .lew-select-align-center {
    text-align: center;
  }

  .lew-select-align-right {
    text-align: right;
  }

  .lew-select-placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-select-size-small {
    .value {
      padding: var(--lew-form-input-padding-small);
      height: var(--lew-form-item-height-small);
      line-height: var(--lew-form-input-line-height-small);
      font-size: var(--lew-form-font-size-small);
    }
  }

  .lew-select-size-medium {
    .value {
      padding: var(--lew-form-input-padding-medium);
      line-height: var(--lew-form-input-line-height-medium);
      height: var(--lew-form-item-height-medium);
      font-size: var(--lew-form-font-size-medium);
    }
  }

  .lew-select-size-large {
    .value {
      padding: var(--lew-form-input-padding-large);
      height: var(--lew-form-item-height-large);
      line-height: var(--lew-form-input-line-height-large);
      font-size: var(--lew-form-font-size-large);
    }
  }
}

.lew-select-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
}

.lew-select-view:active {
  background-color: var(--lew-form-bgcolor-active);
}

.lew-select-view.lew-select-view-focus {
  background-color: var(--lew-form-bgcolor-focus);
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-ouline);

  .icon-select {
    transform: translateY(-50%) rotate(180deg);
    color: var(--lew-text-color-1);
  }

  .icon-select-hide {
    opacity: 0;
    transform: translate(100%, -50%) rotate(180deg);
  }
}

.lew-select-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}

.lew-select-view-readonly {
  pointer-events: none; //鼠标点击不可修改

  .lew-select {
    user-select: text;
  }
}
.lew-select-view-searchable {
  .lew-select {
    .value {
      cursor: text;
    }
  }
}
.lew-select-view-disabled:hover {
  background-color: var(--lew-form-bgcolor);
  outline: 0px var(--lew-color-primary-light) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
}
</style>
<style lang="scss">
.lew-select-popover-body {
  padding: 6px;
}
.lew-select-body {
  width: 100%;
  box-sizing: border-box;
  .tree-select-wrapper {
    padding: 3px 0px;
    max-height: 320px;
    overflow: auto;
  }
  .reslut-count {
    padding-left: 8px;
    margin: 5px 0px;
    opacity: 0.4;
    font-size: 13px;
  }

  .lew-select-options-box {
    overflow-y: auto;
    overflow-x: hidden;
    height: auto;
    box-sizing: border-box;
    transition: all 0.25s ease;
    margin-top: -2px;
    margin-bottom: -2px;

    .lew-select-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 100%;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: var(--lew-text-color-1);
      box-sizing: border-box;
      border-radius: 6px;
      height: 30px;
    }

    .lew-select-item-disabled {
      opacity: 0.3;
      cursor: no-drop;
    }

    .lew-select-item-align-left {
      text-align: left;
    }

    .lew-select-item-align-center {
      text-align: center;
    }

    .lew-select-item-align-right {
      text-align: right;
    }

    .lew-select-label {
      width: 100%;
      user-select: none;
      font-size: 14px;
      padding: 0px 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      box-sizing: border-box;
    }

    .lew-select-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-backdrop-bg-active);
    }

    .lew-select-slot-item {
      width: 100%;
      border-radius: 6px;
    }

    .lew-select-slot-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-backdrop-bg-active);
    }

    .lew-select-item-active {
      color: var(--lew-checkbox-color);
      font-weight: bold;
      background-color: var(--lew-backdrop-bg-active);

      .icon-check {
        margin-right: 10px;
      }
    }

    .lew-select-item-active:hover {
      color: var(--lew-checkbox-color);
      font-weight: bold;
      background-color: var(--lew-backdrop-bg-active);
    }
  }
}
</style>
