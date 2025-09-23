<script setup lang="ts">
import type { LewSelectMultipleOption } from 'lew-ui'
import { useDebounceFn } from '@vueuse/core'
import { LewCheckbox, LewEmpty, LewFlex, LewPopover, LewTextTrim, locale } from 'lew-ui'
import SelectMultipleInput from 'lew-ui/_components/SelectMultipleInput.vue'
import {
  any2px,
  filterSelectOptionsByKeyword,
  flattenSelectOptions,
  numFormat,
  object2class,
  poll,
} from 'lew-ui/utils'
import { cloneDeep, isFunction } from 'lodash-es'
import { useSlots } from 'vue'
import { VirtList } from 'vue-virt-list'
import { selectMultipleEmits } from './emits'
import { selectMultipleProps } from './props'

const props = defineProps(selectMultipleProps)
const emit = defineEmits(selectMultipleEmits)
const modelValue: any = defineModel()
const slots = useSlots()

const lewSelectRef = ref()
const lewPopoverRef = ref()
const searchInputRef = ref()
const virtListRef = ref()
const state = reactive({
  popoverWidth: 0,
  visible: false,
  loading: false,
  initLoading: true,
  sourceOptions: props.options || [],
  options: flattenSelectOptions(props.options || []),
  keyword: '',
  searchCache: new Map<string, LewSelectMultipleOption[]>(),
})

const formMethods: any = inject('formMethods', {})

const _searchMethod = computed(() => {
  if (isFunction(props.searchMethod)) {
    return props.searchMethod
  }
  else if (props.searchMethodId) {
    return formMethods[props.searchMethodId]
  }
  else {
    return filterSelectOptionsByKeyword
  }
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

// 监听 select 元素宽度变化
function updateWidths() {
  if (lewSelectRef.value) {
    const selectWidth = lewSelectRef.value.$el ? lewSelectRef.value.$el.clientWidth : 0
    state.popoverWidth = selectWidth - 12
  }
}

// 使用 ResizeObserver 监听宽度变化
let resizeObserver: ResizeObserver | null = null

function show() {
  lewPopoverRef.value && lewPopoverRef.value.show()
}

function hide() {
  lewPopoverRef.value && lewPopoverRef.value.hide()
}

const searchDebounce = useDebounceFn(async (e: any) => {
  search(e)
}, props.searchDelay)

async function search(e?: any) {
  state.loading = true
  const keyword = e?.target.value
  if (props.searchable) {
    let result: any = []
    if (props.enableSearchCache && state.searchCache.has(keyword)) {
      result = state.searchCache.get(keyword)!
    }
    else {
      const optionsToSearch = flattenSelectOptions(state.sourceOptions)
      if (!keyword && optionsToSearch.length > 0) {
        result = optionsToSearch
      }
      else {
        result = await _searchMethod.value({
          options: optionsToSearch,
          keyword,
        })
      }
      if (props.enableSearchCache) {
        state.searchCache.set(keyword, result)
      }
    }
    state.options = result
  }
  state.loading = false
}

function clearHandle() {
  modelValue.value = []
  emit('clear')
  setTimeout(() => {
    lewPopoverRef.value && lewPopoverRef.value.refresh()
  }, 100)
  emit('change', modelValue.value)
  state.visible = false
  emit('blur')
}

function deleteTag(value: any) {
  const valueIndex = modelValue.value.findIndex((_value: any) => value === _value)

  if (valueIndex > -1) {
    const item = modelValue.value[valueIndex]
    modelValue.value.splice(valueIndex, 1)
    emit('delete', cloneDeep(modelValue.value), item)

    setTimeout(() => {
      lewPopoverRef.value && lewPopoverRef.value.refresh()
    }, 100)
    emit('change', modelValue.value)
  }
}

function selectHandle(item: LewSelectMultipleOption) {
  if (item.disabled || item.isGroup) {
    return
  }

  const _value = modelValue.value || []

  const index = _value.findIndex((e: string | number) => e === item.value)

  if (index >= 0) {
    _value.splice(index, 1)
  }
  else {
    _value.push(item.value)
  }

  modelValue.value = _value
  emit('select', _value)
  setTimeout(() => {
    lewPopoverRef.value && lewPopoverRef.value.refresh()
  }, 100)
  emit('change', modelValue.value)
  updateWidths()
}

const getChecked = computed(() => (value: string | number) => {
  if (modelValue.value) {
    return JSON.parse(JSON.stringify(modelValue.value.includes(value)))
  }
  return false
})

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-select-body', { size, disabled })
})

function getSelectItemClassName(e: any) {
  const { disabled, isGroup } = e
  const active = getChecked.value(e.value)

  return object2class('lew-select-item', {
    disabled,
    active,
    'is-group': isGroup,
  })
}

const focusSearchInput = useDebounceFn(() => {
  if (props.searchable) {
    searchInputRef.value && searchInputRef.value.focus()
  }
}, 100)

function showHandle() {
  state.visible = true

  updateWidths()
  focusSearchInput()

  if (state.options && state.options.length === 0 && props.searchable) {
    search({ target: { value: '' } })
  }

  const indexes = (modelValue.value || [])
    .map((value: any) => state.options.findIndex((e: any) => e.value === value))
    .filter((index: number) => index > -1)

  const minIndex = Math.min(...indexes)
  poll({
    callback: () => {
      if (minIndex > 0 && minIndex !== Infinity) {
        virtListRef.value.scrollToIndex(minIndex)
      }
      else {
        virtListRef.value.reset()
      }
    },
    vail: () => {
      return !!virtListRef.value
    },
  })
}

const getVirtualHeight = computed(() => {
  let height = state.options.length * props.itemHeight
  height = height >= 280 ? 280 : height
  return height
})

const isShowScrollBar = computed(() => {
  return getVirtualHeight.value >= 280
})

function hideHandle() {
  state.visible = false
  emit('blur')
}

async function init() {
  if (_initMethod.value) {
    const newOptions = await _initMethod.value()
    state.sourceOptions = newOptions
    state.options = flattenSelectOptions(newOptions)
  }
  if (props.enableSearchCache) {
    state.searchCache.set('', state.options)
  }
  state.initLoading = false
}

onMounted(() => {
  updateWidths()
  focusSearchInput()
  init()

  // 设置 ResizeObserver 监听宽度变化
  nextTick(() => {
    if (lewSelectRef.value && lewSelectRef.value.$el) {
      resizeObserver = new ResizeObserver(() => {
        updateWidths()
      })
      resizeObserver.observe(lewSelectRef.value.$el)
    }
  })
})

onUnmounted(() => {
  // 清理 ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

defineExpose({
  show,
  hide,
  clearSearchCache: () => {
    if (props.enableSearchCache) {
      state.searchCache.clear()
    }
  },
})

watch(
  () => props.options,
  (newOptions) => {
    if (!_initMethod.value) {
      state.sourceOptions = newOptions || []
      state.options = flattenSelectOptions(newOptions || [])
      if (props.enableSearchCache) {
        state.searchCache.clear()
      }
    }
  },
  {
    deep: true,
  },
)

watch(
  () => modelValue.value,
  () => {
    updateWidths()
  },
  {
    deep: true,
  },
)

const getResultText = computed(() => {
  return state.options.length > 0
    ? locale.t('selectMultiple.resultCount', {
        num: numFormat(state.options.filter((e: any) => !e.isGroup).length),
      })
    : ''
})

// 新增计算属性：是否显示搜索结果计数
const showResultCount = computed(() => {
  return props.searchable && state.options && state.options.length > 0
})

// 新增计算属性：是否显示空状态
const showEmptyState = computed(() => {
  return state.options && state.options.length === 0
})

// 新增计算属性：虚拟列表样式
const virtualListStyle = computed(() => {
  return {
    height: `${getVirtualHeight.value}px`,
    paddingRight: isShowScrollBar.value ? '5px' : '0px',
  }
})

// 新增计算属性：选项项样式
const optionItemStyle = computed(() => {
  return (itemHeight: number) => ({
    height: `${itemHeight}px`,
  })
})

// 新增计算属性：组标签文本
const groupLabelText = computed(() => {
  return (templateProps: any) => {
    return templateProps.isGroup
      ? `${templateProps.label} (${templateProps.total})`
      : templateProps.label
  }
})

// 新增计算属性：组标签类名
const groupLabelClass = computed(() => {
  return (templateProps: any) => {
    return {
      'is-group': templateProps.isGroup,
    }
  }
})

// 新增计算属性：是否显示搜索输入框
const showSearchInput = computed(() => {
  return props.searchable
})

// 新增计算属性：是否显示自定义空状态插槽
const showCustomEmptySlot = computed((): boolean => {
  return !!slots.empty
})

// 新增计算属性：是否显示自定义项插槽
const showCustomItemSlot = computed((): boolean => {
  return !!slots.item
})

// 新增计算属性：项插槽属性
const itemSlotProps = computed(() => {
  return (templateProps: any) => ({
    ...templateProps,
    checked: getChecked.value(templateProps.value),
  })
})

// 新增计算属性：是否显示头部插槽
const showHeaderSlot = computed((): boolean => {
  return !!slots.header
})

// 新增计算属性：是否显示底部插槽
const showFooterSlot = computed((): boolean => {
  return !!slots.footer
})

const formatItems = computed(() => {
  return state.options.filter((e: any) => {
    return (modelValue.value || []).includes(e.value)
  })
})
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    popover-body-class-name="lew-select-multiple-popover-body"
    class="lew-select-view"
    :trigger="trigger"
    :trigger-width="width"
    :disabled="disabled || readonly || state.initLoading"
    placement="bottom-start"
    :style="{ width: any2px(width) }"
    :loading="state.loading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <SelectMultipleInput
        ref="lewSelectRef"
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
        class="lew-select-body"
        :class="getBodyClassName"
        :style="{
          width: any2px(state.popoverWidth),
        }"
      >
        <slot v-if="showHeaderSlot" name="header" />
        <div v-if="showSearchInput" class="lew-search-input">
          <input
            ref="searchInputRef"
            v-model="state.keyword"
            :placeholder="locale.t('selectMultiple.searchPlaceholder')"
            @input="searchDebounce"
          >
        </div>
        <div class="lew-select-options-box">
          <template v-if="showEmptyState">
            <slot v-if="showCustomEmptySlot" name="empty" />
            <LewFlex v-else direction="y" x="center" class="lew-not-found">
              <LewEmpty :title="locale.t('selectMultiple.noResult')" />
            </LewFlex>
          </template>

          <template v-else>
            <div v-show="showResultCount" class="lew-result-count">
              {{ getResultText }}
            </div>
            <VirtList
              ref="virtListRef"
              :list="state.options"
              :min-size="itemHeight"
              :buffer="5"
              item-key="value"
              :style="virtualListStyle"
              class="lew-select-options-list lew-scrollbar"
            >
              <template #default="{ itemData: templateProps }">
                <div
                  :style="optionItemStyle(itemHeight)"
                  @click="selectHandle(templateProps)"
                >
                  <slot
                    v-if="showCustomItemSlot"
                    name="item"
                    :props="itemSlotProps(templateProps)"
                  />
                  <div
                    v-else
                    class="lew-select-item lew-select-item-mul"
                    :class="getSelectItemClassName(templateProps)"
                  >
                    <LewCheckbox
                      v-if="!templateProps.isGroup"
                      :key="templateProps.value"
                      class="lew-select-checkbox"
                      :checked="getChecked(templateProps.value)"
                    />
                    <LewTextTrim
                      :text="groupLabelText(templateProps)"
                      :delay="[500, 0]"
                      class="lew-select-label"
                      :class="groupLabelClass(templateProps)"
                    />
                  </div>
                </div>
              </template>
            </VirtList>
          </template>
        </div>
        <slot v-if="showFooterSlot" name="footer" />
      </div>
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-select-view {
  width: 100%;

  > div {
    width: 100%;
  }
}
</style>

<style lang="scss">
.lew-select-multiple-popover {
  &-body {
    padding: 6px;
  }

  &-tag {
    .lew-select-multiple-tag-value {
      padding: 5px;
      box-sizing: border-box;
    }
  }
}

.lew-select-body {
  width: 100%;
  box-sizing: border-box;

  .lew-search-input {
    margin-bottom: 5px;
    padding: 0px 5px;

    input {
      outline: none;
      border: none;
      background-color: transparent;
      width: 100%;
      height: 32px;
      padding: 0px 7px;
      box-sizing: border-box;
      transition: all var(--lew-form-transition-bezier);
      border-bottom: var(--lew-form-border-width) var(--lew-form-bgcolor-hover) solid;
      color: var(--lew-text-color-2);

      &:focus {
        border-bottom: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
      }
    }

    input:placeholder {
      color: rgb(165, 165, 165);
    }
  }

  .lew-select-options-box {
    overflow-y: auto;
    overflow-x: hidden;
    height: auto;
    box-sizing: border-box;
    transition: all 0.25s ease;
    margin-top: -4px;
    margin-bottom: -4px;

    .lew-select-item {
      &-mul {
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        color: var(--lew-text-color-1);
        box-sizing: border-box;
        margin-top: 2px;

        .lew-select-checkbox {
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 12px;
        }

        .lew-select-label {
          position: relative;
          z-index: 5;
          height: 30px;
          line-height: 30px;
          padding-left: 38px;
          box-sizing: border-box;
          cursor: pointer !important;

          &.is-group {
            padding-left: 12px;
            color: var(--lew-text-color-6);
            font-size: 12px;
            pointer-events: none;
            padding-top: 4px;
          }
        }
      }

      &-disabled {
        opacity: var(--lew-disabled-opacity);
        pointer-events: none;
      }

      &:hover {
        color: var(--lew-text-color-0);
        background-color: var(--lew-pop-bgcolor-hover);

        .lew-checkbox {
          .lew-checkbox-icon-box {
            border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;
            background: var(--lew-form-bgcolor);
          }
        }
      }

      &-active {
        color: var(--lew-checkbox-color);
        font-weight: bold;
        background-color: var(--lew-pop-bgcolor-hover);

        .icon-check {
          margin-right: 10px;
        }

        &:hover {
          color: var(--lew-checkbox-color);
          font-weight: bold;
          background-color: var(--lew-pop-bgcolor-hover);

          .lew-checkbox {
            .lew-checkbox-icon-box {
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
    }
  }

  .lew-result-count {
    padding: 5px 12px;
    font-size: 13px;
    opacity: 0.7;
  }
}
</style>
