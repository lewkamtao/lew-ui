<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { LewPopover, LewTooltip, LewTree, locale } from 'lew-ui'
import { any2px, findNodeByKey, object2class } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { cloneDeep, isFunction } from 'lodash-es'
import { treeSelectProps } from './props'

const props = defineProps(treeSelectProps)
const emit = defineEmits(['change', 'blur', 'clear'])
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const treeSelectValue: Ref<any> = defineModel()

const lewSelectRef = ref()
const inputRef = ref()
const lewPopoverRef = ref()
const lewTreeRef = ref()

const formMethods: any = inject('formMethods', {})

const _initOptionsMethod = computed(() => {
  if (isFunction(props.initOptionsMethod)) {
    return props.initOptionsMethod
  }
  else if (props.initOptionsMethodId) {
    return formMethods[props.initOptionsMethodId]
  }
  return false
})

const state = reactive({
  selectWidth: 0, // 选择框宽度
  visible: false, // 弹出框是否显示
  searchLoading: false, // 树加载
  initLoading: true, // 初始化 loading
  valueIsChange: false, // 记录
  keyword: props.defaultValue || (treeSelectValue.value as any), // 搜索关键字
  keywordBackup: props.defaultValue as any, // 搜索关键字备份
  resultText: '',
})

function getSelectWidth() {
  state.selectWidth = lewSelectRef.value?.clientWidth - 12
}

function show() {
  lewPopoverRef.value.show()
}

function hide() {
  lewPopoverRef.value.hide()
}

const searchDebounce = useDebounceFn(async (e: any) => {
  search(e)
}, props.searchDelay)

async function search(e: any) {
  const keyword = e.target.value
  if (props.searchable) {
    await lewTreeRef.value.search(keyword)
  }
}

function change(e: any) {
  const { value } = e
  treeSelectValue.value = value
  state.valueIsChange = true
  getKeywordLabel(value)
  emit('change', e)
  setTimeout(() => {
    hide()
  }, 100)
}

function clearHandle() {
  treeSelectValue.value = undefined
  state.keyword = ''
  state.keywordBackup = ''
  emit('clear')
  emit('change')
}

const getValueStyle = computed(() => {
  return state.visible ? 'opacity:0.6' : ''
})

const getSelectClassName = computed(() => {
  let { clearable, size, align, disabled, readonly, searchable } = props
  clearable = clearable ? !!treeSelectValue.value : false
  const focus = state.visible

  return object2class('lew-select', {
    clearable,
    size,
    align,
    disabled,
    readonly,
    searchable,
    focus,
    'init-loading': state.initLoading,
  })
})

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-select-body', { size, disabled })
})

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16,
  }
  return size[props.size]
})

// 重新找回关键字
function getKeywordLabel(value: any) {
  if (lewTreeRef.value && value) {
    const tree = lewTreeRef.value.getTree()
    const treeItem: any = findNodeByKey(value, tree)
    if (treeItem !== undefined) {
      const { labelPaths, label } = treeItem
      if (props.showAllLevels && labelPaths && labelPaths.length > 0) {
        state.keyword = labelPaths.join(' / ')
      }
      else {
        state.keyword = label[0]
      }
    }
  }
}

getKeywordLabel(treeSelectValue.value)

function showHandle() {
  state.visible = true
  state.keywordBackup = cloneDeep(state.keyword)
  state.valueIsChange = false // 重置
  if (props.searchable) {
    state.keyword = ''
  }
  getSelectWidth()
  if (props.searchable) {
    search({ target: { value: '' } })
  }
}

function hideHandle() {
  state.visible = false
  if (!state.valueIsChange && treeSelectValue.value) {
    state.keywordBackup
      ? (state.keyword = state.keywordBackup)
      : getKeywordLabel(treeSelectValue.value)
  }
  if (!treeSelectValue.value && state.keyword) {
    state.keyword = ''
    state.keywordBackup = ''
  }
  inputRef.value.blur()
  lewTreeRef.value.reset()
  emit('blur')
}

const getPlaceholder = computed(() => {
  return (
    state.keywordBackup
    || props.placeholder
    || locale.t('treeSelect.placeholder')
  )
})

defineExpose({ show, hide })
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    popover-body-class-name="lew-select-popover-body"
    class="lew-select-view"
    :style="{ width: any2px(width) }"
    :trigger="trigger"
    :disabled="disabled || readonly || state.initLoading"
    placement="bottom-start"
    :loading="state.searchLoading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div ref="lewSelectRef" class="lew-select" :class="getSelectClassName">
        <div v-if="state.initLoading" class="lew-icon-loading-box">
          <Icon
            :size="getIconSize"
            :loading="state.initLoading"
            type="loading"
          />
        </div>

        <Icon
          v-else
          :size="getIconSize"
          type="chevron-down"
          class="lew-icon-select"
          :class="{
            'lew-icon-select-hide': clearable && state.keyword,
          }"
        />
        <transition name="lew-form-icon-ani">
          <Icon
            v-if="clearable && state.keyword && !readonly"
            :size="getIconSize"
            type="close"
            class="lew-form-icon-close"
            :class="{
              'lew-form-icon-close-focus': state.visible,
            }"
            @click.stop="clearHandle"
          />
        </transition>
        <input
          ref="inputRef"
          v-model="state.keyword"
          class="lew-value"
          :style="getValueStyle"
          :readonly="!searchable"
          :placeholder="getPlaceholder"
          @input="searchDebounce"
        >
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="`width:${state.selectWidth}px`"
      >
        <slot name="header" />

        <div class="lew-select-options-box">
          <div v-if="searchable && state.resultText" class="result-count">
            {{ state.resultText }}
          </div>
          <div class="tree-select-wrapper lew-scrollbar">
            <LewTree
              ref="lewTreeRef"
              v-model="treeSelectValue"
              v-bind="{
                keyField,
                labelField,
                disabledField,
                showLine,
                checkable,
                searchable,
                dataSource,
                loadMethod,
                initOptionsMethod: _initOptionsMethod,
                expandAll,
              }"
              :is-select="true"
              @load-start="state.searchLoading = true"
              @load-end="
                ((state.searchLoading = false),
                 (state.initLoading = false),
                 (state.resultText = $event))
              "
              @change="change"
            >
              <template v-if="$slots.empty" #empty>
                <slot name="empty" />
              </template>
              <template v-if="$slots.item" #item="{ props: itemProps }">
                <slot name="item" :props="itemProps" />
              </template>
            </LewTree>
          </div>
        </div>
        <slot name="footer" />
      </div>
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-select-view {
  > div {
    width: 100%;
  }

  .lew-select {
    position: relative;
    width: 100%;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    border-radius: var(--lew-border-radius-small);
    background-color: var(--lew-form-bgcolor);
    transition: all var(--lew-form-transition-ease);
    box-sizing: border-box;
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    box-shadow: var(--lew-form-box-shadow);

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

    .lew-icon-select {
      position: absolute;
      top: 50%;
      right: 9px;
      transform: translateY(-50%) rotate(0deg);
      transition: all var(--lew-form-transition-bezier);
      padding: 2px;
    }

    .lew-icon-select {
      opacity: var(--lew-form-icon-opacity);
    }

    .lew-icon-select-hide {
      opacity: 0;
      transform: translate(100%, -50%);
    }

    .lew-value {
      width: calc(100% - 24px);
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      transition: all 0.2s;
      border: none;
      outline: none;
      background: none;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--lew-text-color-1);
    }

    .lew-value::placeholder {
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

  .lew-select:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-select:active {
    background-color: var(--lew-form-bgcolor-active);
  }

  .lew-select-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
      solid;

    .lew-icon-select {
      transform: translateY(-50%) rotate(180deg);
      color: var(--lew-text-color-1);
    }

    .lew-icon-select-hide {
      opacity: 0;
      transform: translate(100%, -50%) rotate(180deg);
    }
  }

  .lew-select-focus:hover {
    background-color: var(--lew-form-bgcolor-focus-hover);
  }

  .lew-select-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
  }

  .lew-select-readonly {
    pointer-events: none; //鼠标点击不可修改

    .lew-select {
      user-select: text;
    }
  }
  .lew-select-searchable {
    .lew-select {
      .lew-value {
        cursor: text;
      }
    }
  }
  .lew-select-disabled:hover {
    background-color: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  }
  .lew-select-init-loading {
    pointer-events: none;
    cursor: wait;

    .lew-value {
      cursor: wait;
    }
  }
  .lew-select-size-small {
    height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-input-line-height-small);
    .lew-value {
      padding: var(--lew-form-input-padding-small);
      font-size: var(--lew-form-font-size-small);
    }
  }

  .lew-select-size-medium {
    height: var(--lew-form-item-height-medium);
    line-height: var(--lew-form-input-line-height-medium);
    .lew-value {
      padding: var(--lew-form-input-padding-medium);

      font-size: var(--lew-form-font-size-medium);
    }
  }

  .lew-select-size-large {
    height: var(--lew-form-item-height-large);
    line-height: var(--lew-form-input-line-height-large);
    .lew-value {
      padding: var(--lew-form-input-padding-large);

      font-size: var(--lew-form-font-size-large);
    }
  }
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
    padding: 5px 0px;
    max-height: 280px;
    overflow: auto;
  }
  .result-count {
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
  }
}
</style>
