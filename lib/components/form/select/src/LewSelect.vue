<script setup lang="ts">
import type { LewSelectOption } from 'lew-ui/types'
import { useDebounceFn } from '@vueuse/core'
import { LewEmpty, LewFlex, LewPopover, LewTextTrim, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import {
  any2px,
  filterSelectOptionsByKeyword,
  flattenSelectOptions,
  numFormat,
  object2class,
  parseDimension,
  poll,
} from 'lew-ui/utils'
import { cloneDeep, isFunction } from 'lodash-es'
import { VirtList } from 'vue-virt-list'
import { selectEmits } from './emits'
import { selectProps } from './props'

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)
const selectValue: Ref<string | number | undefined> = defineModel()

const lewSelectRef = ref()
const inputRef = ref()
const lewPopoverRef = ref()
const formMethods: any = inject('formMethods', {})
const virtListRef = ref()

const state = reactive({
  visible: false,
  loading: false,
  initLoading: true,
  sourceOptions: props.options,
  options: flattenSelectOptions(props.options),
  hideBySelect: false,
  keyword: props.defaultValue || (selectValue.value as any),
  keywordBackup: props.defaultValue as any,
  autoWidth: 0,
  searchCache: new Map<string, LewSelectOption[]>(),
})

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

const shouldShowClearButton = computed(() => {
  return props.clearable && state.keyword && !props.readonly
})

const shouldShowLoading = computed(() => {
  return state.initLoading
})

const shouldHideDropdownIcon = computed(() => {
  return props.clearable && state.keyword
})

const shouldShowEmptyState = computed(() => {
  return state.options && state.options.length === 0
})

const shouldShowResultCount = computed(() => {
  return props.searchable && !shouldShowEmptyState.value
})

const inputPlaceholder = computed(() => {
  if (state.keywordBackup || props.placeholder) {
    return props.placeholder
  }
  return locale.t('select.placeholder')
})

const getOptionText = computed(() => {
  return (templateProps: any) => {
    if (templateProps.isGroup) {
      return `${templateProps.label} (${templateProps.total})`
    }
    return templateProps.label
  }
})

async function init() {
  if (_initMethod.value) {
    try {
      const newOptions = await _initMethod.value()
      state.sourceOptions = newOptions
      state.options = flattenSelectOptions(newOptions)
      findKeyword()
    }
    catch (error) {
      console.error('[LewSelect] initMethod failed', error)
    }
  }
  if (props.enableSearchCache) {
    state.searchCache.set('', state.options)
  }
  state.initLoading = false
}

watch(
  () => props.defaultValue,
  () => {
    state.keyword = props.defaultValue
  },
)

watch(
  () => props.options,
  (newOptions) => {
    if (!_initMethod.value) {
      state.sourceOptions = newOptions
      state.options = flattenSelectOptions(newOptions)
      state.keyword
        = newOptions?.find((e: any) => e.value === selectValue.value)?.label || ''
      if (props.enableSearchCache) {
        state.searchCache.clear()
      }
    }
  },
  {
    deep: true,
  },
)

const computedWidth = computed(() => {
  if (props.autoWidth && state.autoWidth > 0) {
    return state.autoWidth
  }
  return props.width
})

onMounted(() => {
  if (props.autoWidth) {
    calculateAutoWidth()
  }
  init()
})

const SELECT_WIDTH_TOLERANCE = 30

function calculateAutoWidth() {
  if (!props.autoWidth)
    return

  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.visibility = 'hidden'
  tempDiv.style.whiteSpace = 'nowrap'
  tempDiv.style.fontSize = getComputedStyle(document.body).fontSize
  if (inputRef.value) {
    tempDiv.style.fontSize = getComputedStyle(inputRef.value).fontSize
    tempDiv.style.padding = getComputedStyle(inputRef.value).padding

    tempDiv.style.fontFamily = getComputedStyle(inputRef.value).fontFamily
    tempDiv.style.fontWeight = getComputedStyle(inputRef.value).fontWeight
  }
  let textContent = state.keyword
  if (!textContent || textContent.trim() === '') {
    textContent = props.placeholder || locale.t('select.placeholder')
  }
  tempDiv.textContent = textContent
  document.body.appendChild(tempDiv)

  const textWidth = tempDiv.clientWidth
  state.autoWidth = textWidth + SELECT_WIDTH_TOLERANCE

  document.body.removeChild(tempDiv)
}

watch(
  () => state.keyword,
  () => {
    if (props.autoWidth) {
      calculateAutoWidth()
    }
  },
)

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
  state.loading = true
  const keyword = e.target.value
  if (props.searchable) {
    let result: LewSelectOption[] = []

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
  selectValue.value = undefined
  state.keywordBackup = undefined
  state.keyword = ''
  emit('clear')
  emit('change', undefined)
}

function selectHandle(item: LewSelectOption) {
  if (item.disabled || item.isGroup) {
    return
  }
  state.hideBySelect = true
  state.keyword = item.label
  selectValue.value = item.value
  emit('change', item.value)
  setTimeout(() => {
    hide()
  }, 100)
}

const getChecked = computed(() => (value: string | number) => {
  return selectValue.value === value
})

const getValueStyle = computed(() => {
  return state.visible ? 'opacity:0.6' : ''
})

function findKeyword() {
  if (state.options) {
    const option = state.options.find((e: any) => {
      if (e) {
        return e.value === selectValue.value
      }
      return false
    })

    if (option && JSON.stringify(option) !== '{}') {
      return (state.keyword = option.label)
    }
  }
  return (state.keyword = props.defaultValue)
}
findKeyword()

const getSelectClassName = computed(() => {
  let { clearable, size, disabled, readonly, searchable } = props
  clearable = clearable ? !!selectValue.value : false
  const focus = state.visible
  return object2class('lew-select', {
    clearable,
    size,
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

function getSelectItemClassName(e: any) {
  const { disabled, isGroup } = e
  const active = getChecked.value(e.value)

  return object2class('lew-select-item', {
    disabled,
    active,
    'is-group': isGroup,
  })
}

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16,
  }
  return size[props.size]
})

const getVirtualHeight = computed(() => {
  let height = state.options.length * props.itemHeight
  height = height >= 280 ? 280 : height
  return height
})

async function showHandle() {
  state.visible = true
  state.keywordBackup = cloneDeep(state.keyword)
  if (props.searchable) {
    inputRef.value.focus()
  }
  emit('focus')

  if (props.searchable) {
    state.keyword = ''
  }
  state.hideBySelect = false
  if (props.searchable) {
    await search({ target: { value: '' } })
  }
  const index = state.options.findIndex((e: any) => e.value === selectValue.value)
  poll({
    callback: () => {
      const i = index > -1 ? index : 0
      if (i > 0 && i !== Infinity) {
        virtListRef.value.scrollToIndex(i)
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

function hideHandle() {
  state.visible = false
  if (!state.hideBySelect) {
    findKeyword()
  }
  inputRef.value.blur()
  emit('blur')
}

const isShowScrollBar = computed(() => {
  return getVirtualHeight.value >= 280
})

const getPopoverBodyWidth = computed(() => {
  const { popoverWidth } = props
  if (!lewSelectRef.value)
    return popoverWidth
  return popoverWidth && popoverWidth !== '100%'
    ? parseDimension(popoverWidth) - 14
    : lewSelectRef.value.offsetWidth - 14
})

watch(
  () => selectValue.value,
  () => {
    findKeyword()
    if (props.autoWidth) {
      calculateAutoWidth()
    }
  },
)

const getResultText = computed(() => {
  return state.options.length > 0
    ? locale.t('select.resultCount', {
        num: numFormat(state.options.filter((e: any) => !e.isGroup).length),
      })
    : ''
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
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    popover-body-class-name="lew-select-popover-body"
    class="lew-select-view"
    :style="{ width: autoWidth ? 'auto' : any2px(width) }"
    :trigger="trigger"
    :trigger-width="any2px(computedWidth)"
    :disabled="disabled || readonly || state.initLoading"
    placement="bottom-start"
    :loading="state.loading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div
        ref="lewSelectRef"
        class="lew-select"
        :style="{ width: any2px(computedWidth) }"
        :class="getSelectClassName"
      >
        <div v-if="shouldShowLoading" class="lew-icon-loading-box">
          <CommonIcon :size="getIconSize" :loading="state.initLoading" type="loading" />
        </div>

        <CommonIcon
          v-else
          :size="getIconSize"
          type="chevron-down"
          class="lew-icon-select"
          :class="{
            'lew-icon-select-hide': shouldHideDropdownIcon,
          }"
        />
        <transition name="lew-form-icon-ani">
          <CommonIcon
            v-if="shouldShowClearButton"
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
          :title="state.keyword"
          class="lew-value"
          :style="getValueStyle"
          :readonly="!searchable"
          :placeholder="inputPlaceholder"
          @input="searchDebounce"
        >
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="{ width: any2px(getPopoverBodyWidth) }"
      >
        <slot name="header" />

        <div class="lew-select-options-box">
          <template v-if="shouldShowEmptyState">
            <slot v-if="$slots.empty" name="empty" />
            <LewFlex v-else direction="y" x="center" class="lew-not-found">
              <LewEmpty :title="locale.t('select.noResult')" />
            </LewFlex>
          </template>
          <template v-else>
            <div v-if="shouldShowResultCount" class="lew-result-count">
              {{ getResultText }}
            </div>
            <VirtList
              ref="virtListRef"
              :list="state.options"
              :min-size="itemHeight"
              :buffer="5"
              item-key="value"
              class="lew-select-options-list lew-scrollbar"
              :style="{
                height: `${getVirtualHeight}px`,
                paddingRight: isShowScrollBar ? '5px' : '0px',
              }"
            >
              <template #default="{ itemData: templateProps }">
                <div
                  :style="{ height: `${itemHeight}px` }"
                  @click="selectHandle(templateProps)"
                >
                  <slot
                    v-if="$slots.item"
                    name="item"
                    :props="{
                      ...templateProps,
                      checked: getChecked(templateProps.value),
                    }"
                  />
                  <div
                    v-else
                    class="lew-select-item"
                    :class="getSelectItemClassName(templateProps)"
                  >
                    <LewTextTrim
                      :text="getOptionText(templateProps)"
                      :delay="[500, 0]"
                      class="lew-select-label"
                    />
                    <CommonIcon
                      v-if="getChecked(templateProps.value) && showCheckIcon"
                      class="lew-icon-check"
                      :size="16"
                      :stroke-width="3"
                      type="check"
                    />
                  </div>
                </div>
              </template>
            </VirtList>
          </template>
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
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    border-radius: var(--lew-border-radius-small);
    box-shadow: var(--lew-form-box-shadow);
    background-color: var(--lew-form-bgcolor);
    box-sizing: border-box;
    transition:
      all var(--lew-form-transition-ease),
      width 0s ease;

    .lew-icon-select {
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

    .lew-icon-select {
      opacity: var(--lew-form-icon-opacity);
    }

    .lew-icon-select-hide {
      opacity: 0;
      transform: translate(100%, -50%);
    }

    .lew-value {
      display: inline-flex;
      width: calc(100% - 24px);
      align-items: center;
      box-sizing: border-box;
      padding: 0;
      border: none;
      outline: none;
      background: none;
      color: var(--lew-text-color-1);
      cursor: pointer;
      transition: all 0.2s;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 100%;
    }

    .lew-value::placeholder {
      color: rgb(165, 165, 165);
    }
  }

  .lew-select-placeholder {
    color: rgb(165, 165, 165);
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

  .lew-select-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  .lew-select-init-loading {
    pointer-events: none;
    cursor: wait;

    .lew-value {
      cursor: wait;
    }
  }

  .lew-select-readonly {
    pointer-events: none;

    .lew-select {
      user-select: text;
    }
  }

  .lew-select-searchable {
    .lew-value {
      cursor: text;
    }
  }

  .lew-select:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-select:active {
    background-color: var(--lew-form-bgcolor-active);
  }

  .lew-select-disabled:hover {
    background-color: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  }

  .lew-select-focus {
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
    background-color: var(--lew-form-bgcolor-focus);

    .lew-icon-select {
      color: var(--lew-text-color-1);
      transform: translateY(-50%) rotate(180deg);
    }

    .lew-icon-select-hide {
      opacity: 0;
      transform: translate(100%, -50%) rotate(180deg);
    }
  }

  .lew-select-focus:hover {
    background-color: var(--lew-form-bgcolor-focus);
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

  .lew-select-options-list {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .lew-result-count {
    padding: 5px 12px;
    font-size: 13px;
    opacity: 0.7;
  }

  .lew-select-options-box {
    height: auto;
    box-sizing: border-box;
    margin-top: -4px;
    margin-bottom: -4px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.25s ease;

    .lew-select-item {
      position: relative;
      display: inline-flex;
      width: 100%;
      height: 34px;
      margin-top: 2px;
      align-items: center;
      box-sizing: border-box;
      border-radius: calc(var(--lew-border-radius-small) - 1px);
      color: var(--lew-text-color-1);
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }

    .lew-select-item-disabled {
      opacity: var(--lew-disabled-opacity);
      cursor: no-drop;
    }

    .lew-select-label {
      width: 100%;
      height: 30px;
      padding: 0px 12px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 30px;
      user-select: none;
      cursor: pointer !important;
    }

    .lew-select-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bgcolor-hover);
    }

    .lew-select-slot-item {
      width: 100%;
      border-radius: calc(var(--lew-border-radius-small) - 1px);
    }

    .lew-select-slot-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bgcolor-hover);
    }

    .lew-select-item-active {
      color: var(--lew-checkbox-color);
      background-color: var(--lew-pop-bgcolor-hover);
      font-weight: bold;

      .lew-icon-check {
        margin-right: 10px;
      }
    }

    .lew-select-item-active:hover {
      color: var(--lew-checkbox-color);
      background-color: var(--lew-pop-bgcolor-hover);
      font-weight: bold;
    }

    .lew-select-item-is-group {
      color: var(--lew-text-color-6);
      background-color: var(--lew-pop-bgcolor);
      cursor: default;
      box-sizing: border-box;
      cursor: no-drop;
      pointer-events: none;

      .lew-select-label {
        font-size: 12px;
        box-sizing: border-box;
        padding-top: 4px;
      }
    }
  }
}
</style>
