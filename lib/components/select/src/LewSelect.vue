<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { LewPopover, LewFlex, LewTextTrim, LewEmpty } from 'lew-ui'
import { object2class, numFormat } from 'lew-ui/utils'
import { VirtList } from 'vue-virt-list'
import type { SelectOptions } from './props'
import { selectProps } from './props'
import { cloneDeep, isFunction } from 'lodash-es'
import Icon from 'lew-ui/utils/Icon.vue'
import { flattenOptions, defaultSearchMethod } from './util'
import { poll } from 'lew-ui/utils'
import { locale } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
const props = defineProps(selectProps)
const emit = defineEmits(['change', 'blur', 'clear', 'focus'])
const selectValue: Ref<string | number | undefined> = defineModel()

const lewSelectRef = ref()
const inputRef = ref()
const lewPopoverRef = ref()
const formMethods: any = inject('formMethods', {})

let _searchMethod = computed(() => {
  if (isFunction(props.searchMethod)) {
    return props.searchMethod
  } else if (props.searchMethodId) {
    return formMethods[props.searchMethodId]
  } else {
    return defaultSearchMethod
  }
})

watch(
  () => props.options,
  () => {
    state.keyword = props.options.find(
      (e: any) => e.value === selectValue.value
    )?.label
  },
  {
    deep: true
  }
)

const virtListRef = ref()

const state = reactive({
  visible: false,
  loading: false,
  options: flattenOptions(props.options),
  hideBySelect: false, // 记录是否通过选择隐藏
  keyword: props.defaultValue || (selectValue.value as any),
  keywordBackup: props.defaultValue as any,
  autoWidth: 0 // 新增自动宽度
})

watch(
  () => props.defaultValue,
  () => {
    state.keyword = props.defaultValue
  }
)

// 计算选择框的宽度
const computedWidth = computed(() => {
  if (props.autoWidth && state.autoWidth > 0) {
    // 确保最小宽度不小于300px

    return Number(state.autoWidth)
  }
  return Number(props.width)
})

// 在组件挂载后初始化自动宽度
onMounted(() => {
  if (props.autoWidth) {
    calculateAutoWidth()
  }
})

// 选择器宽容度宽度
const SELECT_WIDTH_TOLERANCE = 26

// 计算自动宽度
const calculateAutoWidth = () => {
  if (!props.autoWidth) return

  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.visibility = 'hidden'
  tempDiv.style.whiteSpace = 'nowrap'
  tempDiv.style.fontSize = getComputedStyle(document.body).fontSize
  // 如果inputRef已经挂载，使用实际样式
  if (inputRef.value) {
    tempDiv.style.fontSize = getComputedStyle(inputRef.value).fontSize
    tempDiv.style.padding = getComputedStyle(inputRef.value).padding

    tempDiv.style.fontFamily = getComputedStyle(inputRef.value).fontFamily
    tempDiv.style.fontWeight = getComputedStyle(inputRef.value).fontWeight
  }
  // 如果没有关键词，则使用placeholder的文本
  let textContent = state.keyword
  if (!textContent || textContent.trim() === '') {
    textContent = props.placeholder || locale.t('select.placeholder')
  }
  tempDiv.innerText = textContent
  document.body.appendChild(tempDiv)

  // 文本宽度加上边距和图标空间
  const textWidth = tempDiv.clientWidth
  state.autoWidth = textWidth + SELECT_WIDTH_TOLERANCE

  document.body.removeChild(tempDiv)
}

// 监听keyword变化以更新自动宽度
watch(
  () => state.keyword,
  () => {
    if (props.autoWidth) {
      calculateAutoWidth()
    }
  }
)

const show = () => {
  lewPopoverRef.value.show()
}

const hide = () => {
  lewPopoverRef.value.hide()
}

const searchDebounce = useDebounceFn(async (e: any) => {
  search(e)
}, props.searchDelay)

const search = async (e: any) => {
  state.loading = true
  const keyword = e.target.value
  if (props.searchable) {
    let result: SelectOptions[] = []
    // 如果没输入关键词
    if (!keyword && props.options.length > 0) {
      result = flattenOptions(props.options)
    } else {
      result = await _searchMethod.value({
        options: flattenOptions(props.options),
        keyword
      })
    }
    state.options = result
  }
  state.loading = false
}

const clearHandle = () => {
  selectValue.value = undefined
  state.keywordBackup = undefined
  state.keyword = ''
  emit('clear')
  emit('change')
}

const selectHandle = (item: SelectOptions) => {
  if (item.disabled || item.isGroup) {
    return
  }
  state.hideBySelect = true
  state.keyword = item.label
  selectValue.value = item.value
  emit('change', item.value)
  hide()
}

const getChecked = computed(() => (value: string | number) => {
  return selectValue.value === value
})

const getValueStyle = computed(() => {
  return state.visible ? 'opacity:0.6' : ''
})

const findKeyword = () => {
  if (state.options) {
    const option = state.options.find((e: any) => {
      if (e) {
        return e.value === selectValue.value
      }
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
    focus
  })
})

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-select-body', { size, disabled })
})

const getSelectItemClassName = (e: any) => {
  const { disabled, isGroup } = e
  const active = getChecked.value(e.value)

  return object2class('lew-select-item', {
    disabled,
    active,
    'is-group': isGroup
  })
}

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16
  }
  return size[props.size]
})

const getVirtualHeight = computed(() => {
  let height = state.options.length * props.itemHeight
  height = height >= 280 ? 280 : height
  return height
})

const showHandle = () => {
  state.visible = true
  state.keywordBackup = cloneDeep(state.keyword)
  if (props.searchable) {
    inputRef.value.focus()
  }
  emit('focus')

  if (props.searchable) {
    state.keyword = ''
  }
  state.hideBySelect = false // 重置
  if (props.searchable) {
    search({ target: { value: '' } })
  }
  const index = state.options.findIndex(
    (e: any) => e.value === selectValue.value
  )
  if (index > -1) {
    poll({
      callback: () => {
        virtListRef.value.scrollToIndex(index)
      },
      vail: () => {
        return !!virtListRef.value
      }
    })
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

// 判断是否出现滚动条
const isShowScrollBar = computed(() => {
  return getVirtualHeight.value >= 280
})

watch(
  () => selectValue.value,
  () => {
    findKeyword()
    if (props.autoWidth) {
      calculateAutoWidth()
    }
  }
)

watch(
  () => props.options,
  () => {
    state.options = flattenOptions(props.options)
  },
  {
    deep: true
  }
)

const getResultNum = computed(() => {
  return numFormat(state.options.filter((e: any) => !e.isGroup).length)
})

defineExpose({ show, hide })
</script>

<template>
  <lew-popover
    ref="lewPopoverRef"
    popoverBodyClassName="lew-select-popover-body"
    class="lew-select-view"
    :style="{ width: autoWidth ? 'auto' : any2px(width) }"
    :trigger="trigger"
    :disabled="disabled || readonly"
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
        <Icon
          :size="getIconSize"
          type="chevron-down"
          class="lew-icon-select"
          :class="{ 'lew-icon-select-hide': clearable && state.keyword }"
        />
        <transition name="lew-form-icon-ani">
          <Icon
            v-if="clearable && state.keyword && !readonly"
            :size="getIconSize"
            type="close"
            class="lew-form-icon-close"
            :class="{
              'lew-form-icon-close-focus': state.visible
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
          :placeholder="
            state.keywordBackup || placeholder
              ? placeholder
              : locale.t('select.placeholder')
          "
          @input="searchDebounce"
        />
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="{ width: `calc(${any2px(popoverWidth)} - 14px)` }"
      >
        <slot name="header"></slot>

        <div class="lew-select-options-box">
          <template v-if="state.options && state.options.length === 0">
            <slot v-if="$slots.empty" name="empty"></slot>
            <lew-flex v-else direction="y" x="center" class="lew-not-found">
              <lew-empty title="暂无结果" />
            </lew-flex>
          </template>
          <div
            v-if="searchable && state.options && state.options.length > 0"
            class="lew-result-count"
          >
            共
            {{ getResultNum }}
            条结果
          </div>
          <transition name="fade">
            <virt-list
              ref="virtListRef"
              v-if="state.options.length > 0 && state.visible"
              :list="state.options"
              :minSize="itemHeight"
              :buffer="5"
              item-key="value"
              class="lew-select-options-list lew-scrollbar"
              :style="{
                height: `${getVirtualHeight}px`,
                paddingRight: isShowScrollBar ? '5px' : '0px'
              }"
            >
              <template #default="{ itemData: templateProps }">
                <div
                  :style="{ height: itemHeight + 'px' }"
                  @click="selectHandle(templateProps)"
                >
                  <slot
                    v-if="$slots.item"
                    name="item"
                    :props="{
                      ...templateProps,
                      checked: getChecked(templateProps.value)
                    }"
                  ></slot>
                  <div
                    v-else
                    class="lew-select-item"
                    :class="getSelectItemClassName(templateProps)"
                  >
                    <lew-text-trim
                      :text="
                        templateProps.isGroup
                          ? `${templateProps.label} (${templateProps.total})`
                          : templateProps.label
                      "
                      :delay="[500, 0]"
                      class="lew-select-label"
                    />
                    <Icon
                      v-if="getChecked(templateProps.value) && showCheckIcon"
                      class="lew-icon-check"
                      :size="16"
                      :strokeWidth="3"
                      type="check"
                    />
                  </div>
                </div>
              </template>
            </virt-list>
          </transition>
        </div>
        <slot name="footer"></slot>
      </div>
    </template>
  </lew-popover>
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
      right: 9px;
      padding: 2px;
      transform: translateY(-50%) rotate(0deg);
      transition: all var(--lew-form-transition-bezier);
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
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
      solid;
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
    background-color: var(--lew-form-bgcolor-focus-hover);
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
    opacity: 0.4;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
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
      color: var(--lew-text-color-7);
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
