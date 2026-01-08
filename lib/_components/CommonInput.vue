<script setup lang="ts">
import type { LewSize } from 'lew-ui'
import { LewInput, LewTag, locale } from 'lew-ui'
import CloseIcon from 'lew-ui/_components/CloseIcon.vue'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '100%',
  },
  formatItems: {
    type: null,
  },
  focus: {
    type: Boolean,
    default: false,
  },
  popoverVisible: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },

  selectedLabel: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['clear', 'delete', 'input'])

const lewSelectRef = ref()
const selectWidth = ref()
const inputRef = ref()
const searchInputRef = ref()

const modelValue: any = defineModel()
const keyword: any = defineModel('keyword')

watch(
  () => props.focus,
  (v) => {
    if (!v && props.multiple) {
      keyword.value = ''
    }
  },
)

function updateWidths() {
  if (lewSelectRef.value) {
    selectWidth.value = lewSelectRef.value.clientWidth
  }
}

let resizeObserver: ResizeObserver | null = null

function clearHandle() {
  emit('clear')
}

function inputHandle(e: Event) {
  emit('input', e)
}

function deleteTag(value: string) {
  emit('delete', value)
}

const getSelectClassName = computed(() => {
  let {
    clearable,
    size,
    disabled,
    readonly,
    focus,
    multiple,
    searchable,
  } = props

  if (multiple) {
    clearable = clearable && (modelValue.value || []).length > 0
  }
  else {
    clearable = clearable && !!modelValue.value
  }

  return object2class('lew-select', {
    clearable,
    size,
    disabled,
    readonly,
    focus,
    searchable,
    multiple,
  })
})

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16,
  }
  return size[props.size]
})

onMounted(() => {
  updateWidths()
  // 设置 ResizeObserver 监听宽度变化
  if (lewSelectRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateWidths()
    })
    resizeObserver.observe(lewSelectRef.value)
  }
})

onUnmounted(() => {
  // 清理 ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

const showClearButton = computed(() => {
  if (props.multiple) {
    // 当 modelValue 是 [] 时也不展示
    return (
      props.clearable
      && Array.isArray(modelValue.value)
      && modelValue.value.length > 0
      && !props.readonly
      && !props.loading
    )
  }
  else {
    // 额外处理 modelValue === [] 的情况也不展示
    if (Array.isArray(modelValue.value) && modelValue.value.length === 0) {
      return false
    }
    return (
      props.clearable && !!modelValue.value && !props.readonly && !props.loading
    )
  }
})

const hasSelectedItems = computed(() => {
  if (props.multiple) {
    return (modelValue.value || []).length > 0
  }
  else {
    return !!modelValue.value
  }
})

const showPlaceholder = computed(() => {
  if (props.multiple && !props.searchable) {
    return (modelValue.value || []).length === 0
  }
  else {
    // 单选模式下不显示div placeholder，因为input已经有placeholder了
    return false
  }
})

const selectedItemsText = computed(() => {
  if (!hasSelectedItems.value)
    return ''

  if (props.multiple) {
    // 多选模式不需要文本显示，使用tag显示
    return ''
  }
  else {
    return props.selectedLabel || props.formatItems
  }
})

const placeholderText = computed(() => {
  if (props.multiple) {
    return props.placeholder || locale.t('selectMultiple.placeholder')
  }
  else {
    return props.placeholder || locale.t('select.placeholder')
  }
})

const getValueStyle = computed(() => {
  return {
    opacity: props.focus ? 0.6 : 1,
    paddingRight: props.clearable ? '24px' : '',
  }
})

function getInputRefStyle() {
  return {
    fontSize: getComputedStyle(inputRef.value).fontSize,
    padding: getComputedStyle(inputRef.value).padding,
    fontFamily: getComputedStyle(inputRef.value).fontFamily,
    marginLeft: getComputedStyle(inputRef.value).marginLeft,
  }
}

function focus() {
  if (props.multiple) {
    setTimeout(() => {
      searchInputRef.value?.focus()
    }, 100)
  }
  else {
    inputRef.value?.focus()
  }
}

// 新增计算属性：选择器图标类名
const selectIconClass = computed(() => {
  return {
    'lew-icon-select-hide': showClearButton.value,
  }
})

defineExpose({
  clearHandle,
  getInputRefStyle,
})
</script>

<template>
  <div
    ref="lewSelectRef"
    class="lew-select"
    :class="getSelectClassName"
    :style="{ width: any2px(width) }"
    @click="focus"
  >
    <div v-if="loading" class="lew-icon-loading-box">
      <CommonIcon :size="getIconSize" :loading="loading" type="loading" />
    </div>
    <CommonIcon
      v-else
      :size="getIconSize"
      type="chevron-down"
      class="lew-icon-select"
      :class="selectIconClass"
    />
    <CloseIcon
      v-if="showClearButton"
      :size="size as LewSize"
      class="lew-form-icon-close"
      @click.stop="clearHandle"
    />
    <template v-if="!multiple">
      <input
        ref="inputRef"
        :value="selectedItemsText"
        :title="selectedItemsText"
        class="lew-value lew-single-input"
        :style="getValueStyle"
        :readonly="!searchable"
        :placeholder="placeholderText"
        @input="inputHandle"
      >
      <div v-show="showPlaceholder" class="lew-placeholder">
        {{ placeholderText }}
      </div>
    </template>

    <template v-else>
      <div v-show="showPlaceholder" class="lew-placeholder">
        {{ placeholderText }}
      </div>
      <div
        v-show="!showPlaceholder"
        class="lew-multiple-box"
        :style="{ padding: hasSelectedItems ? '4px' : '' }"
      >
        <LewTag
          v-for="item in formatItems"
          :key="item.value"
          type="light"
          :size="props.size as any"
          :closeable="!disabled && !readonly"
          @close="deleteTag(item.value)"
        >
          {{ item.label }}
        </LewTag>
        <LewInput
          v-if="searchable && (props.focus || (formatItems || []).length === 0)"
          ref="searchInputRef"
          key="search-input"
          v-model="keyword"
          :auto-width="hasSelectedItems"
          class="lew-multiple-search-input"
          :size="(size as any)"
          :placeholder="!hasSelectedItems ? placeholderText : ' '"
          @input="(value) => inputHandle({ target: { value } } as unknown as Event)"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.lew-select {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  transition:
    background-color var(--lew-form-transition-ease),
    border-color var(--lew-form-transition-ease);
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  box-shadow: var(--lew-form-box-shadow);

  .lew-icon-loading-box {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
  }

  .lew-icon-select {
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%) rotate(0deg);
    opacity: var(--lew-form-icon-opacity);

    &-hide {
      opacity: 0;
    }
  }

  .lew-form-icon-close {
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: 9;
    transform: translateY(-50%);
  }

  .lew-placeholder {
    color: rgb(165, 165, 165);
  }

  :deep() {
    .lew-tag {
      background-color: var(--lew-bgcolor-0) !important;
    }
  }

  .lew-placeholder {
    width: calc(100% - 24px);
    transition: all 0.2s;
    height: 100%;
  }

  .lew-value {
    display: flex;
    align-items: center;
    width: calc(100% - 24px);
    transition: all 0.2s;
    min-height: 100%;
    padding: 2px 0;
    box-sizing: border-box;
  }

  .lew-single-input {
    border: none;
    outline: none;
    background: none;
    color: var(--lew-text-color-1);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
    padding: 0;

    &::placeholder {
      color: rgb(165, 165, 165);
    }
  }

  .lew-multiple-box {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    box-sizing: border-box;
    transition: width var(--lew-form-transition-bezier);
    width: calc(100% - 24px);
    min-height: calc(100% - 4px);

    :deep() {
      .lew-input-view {
        border-radius: 0px !important;
      }
    }
  }

  .lew-multiple-search-input {
    flex-shrink: 1;
    border: none !important;
    outline: none !important;
    background: none !important;
    box-shadow: none !important;
    overflow: hidden;
    width: auto;

    :deep() {
      .lew-input-view {
        border-radius: 0px !important;
      }

      .lew-input-box {
        padding: 0px !important;
        height: 100%;
      }

      input {
        left: 0px !important;
      }
    }
  }

  :deep(.lew-input) {
    padding: 0 !important;
  }

  .lew-placeholder {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
  }

  &:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  &:active {
    background-color: var(--lew-form-bgcolor-active);
  }
}

.lew-select-size {
  &-small {
    min-height: var(--lew-form-item-height-small);

    .lew-placeholder {
      font-size: var(--lew-form-font-size-small);
      margin-left: 10px;
      padding-right: 26px;
      line-height: calc(var(--lew-form-item-height-small) - (var(--lew-form-border-width) * 2));
    }

    .lew-single-input {
      font-size: var(--lew-form-font-size-small);
      margin-left: 10px;
      padding-right: 26px;
    }

    .lew-multiple-box {
      padding: var(--lew-form-input-padding-small);
      font-size: var(--lew-form-font-size-small);
      padding-top: 0px;
      padding-bottom: 0px;
      padding-right: 26px;
    }

    .lew-multiple-search-input {
      height: 20px;
    }

    .lew-value {
      padding: 1px 0;
    }
  }

  &-medium {
    min-height: var(--lew-form-item-height-medium);

    .lew-placeholder {
      font-size: var(--lew-form-font-size-medium);
      margin-left: 12px;
      padding-right: 28px;
      line-height: calc(var(--lew-form-item-height-medium) - (var(--lew-form-border-width) * 2));
    }

    .lew-single-input {
      font-size: var(--lew-form-font-size-medium);
      margin-left: 12px;
      padding-right: 28px;
    }

    .lew-multiple-box {
      padding: var(--lew-form-input-padding-medium);
      font-size: var(--lew-form-font-size-medium);
      padding-top: 0px;
      padding-bottom: 0px;
      padding-right: 28px;
    }

    .lew-multiple-search-input {
      height: 24px;
    }

    .lew-value {
      padding: 2px 0;
    }
  }

  &-large {
    min-height: var(--lew-form-item-height-large);

    .lew-placeholder {
      font-size: var(--lew-form-font-size-large);
      margin-left: 14px;
      padding-right: 30px;
      line-height: calc(var(--lew-form-item-height-large) - (var(--lew-form-border-width) * 2));
    }

    .lew-single-input {
      font-size: var(--lew-form-font-size-large);
      margin-left: 14px;
      padding-right: 30px;
    }

    .lew-multiple-box {
      padding: var(--lew-form-input-padding-large);
      font-size: var(--lew-form-font-size-large);
      padding-top: 0px;
      padding-bottom: 0px;
      padding-right: 30px;
    }

    .lew-multiple-search-input {
      height: 28px;
    }

    .lew-value {
      padding: 3px 0;
    }
  }
}

.lew-select-focus {
  background-color: var(--lew-form-bgcolor-focus);
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  :deep() {
    .lew-tag {
      background-color: var(--lew-color-primary-light) !important;
    }
  }

  .lew-icon-select {
    transform: translateY(-50%) rotate(180deg);
    color: var(--lew-text-color-1);

    &-hide {
      opacity: 0;
    }
  }
}

.lew-select-focus:hover {
  background-color: var(--lew-form-bgcolor-focus);
}

.lew-select-readonly {
  pointer-events: none;

  .lew-select {
    user-select: text;
  }
}

.lew-select-searchable {
  cursor: text;

  .lew-single-input {
    cursor: text;
  }
}

.lew-select-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;

  &:hover {
    border-radius: var(--lew-border-radius-small);
    background-color: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  }
}

.lew-select-init-loading {
  pointer-events: none;
  cursor: wait;

  .lew-placeholder,
  .lew-select-multiple-text-value {
    cursor: wait;
  }
}
</style>
