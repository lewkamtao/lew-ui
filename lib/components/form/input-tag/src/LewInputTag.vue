<script setup lang="ts">
import { LewInput, LewMessage, LewTag, locale } from 'lew-ui'
import CloseIcon from 'lew-ui/_components/CloseIcon.vue'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { inputTagEmits } from './emits'
import { inputTagProps } from './props'

const props = defineProps(inputTagProps)
const emit = defineEmits(inputTagEmits)

const modelValue = defineModel<string[] | undefined>()
const inputValue = ref<string>('')
const lewInputRef = ref<any>(null)
const isInputActive = ref<boolean>(false)
const isTagMarkedForDeletion = ref<boolean>(false)
const autoWidthDelay = ref<boolean>(false)
const editingIndex = ref<number>(-1)
const selectedTagIndex = ref<number>(-1)

let originalKeydownHandler: ((event: KeyboardEvent) => void) | null = null

function attachKeydownListener() {
  originalKeydownHandler = document.onkeydown
  document.onkeydown = function (event: KeyboardEvent) {
    const keyCode = event.key || event.code
    if (!isInputActive.value && selectedTagIndex.value < 0)
      return

    const tagsLength = (modelValue.value || []).length

    // 处理标签选中状态下的键盘事件
    if (selectedTagIndex.value >= 0) {
      handleSelectedTagKeydown(event, keyCode, tagsLength)
      return
    }

    // 处理输入框状态下的键盘事件
    if (inputValue.value) {
      if (keyCode === 'Enter' || keyCode === 'NumpadEnter') {
        isTagMarkedForDeletion.value = false
        document.onkeydown = originalKeydownHandler
        isInputActive.value = false
        tryAddTag()
        openInput()
      }
    }
    else {
      // 输入框为空时的键盘导航
      if (keyCode === 'ArrowLeft' && tagsLength > 0) {
        event.preventDefault()
        selectedTagIndex.value = tagsLength - 1
        isTagMarkedForDeletion.value = false
        return
      }

      if (keyCode === 'Backspace' || keyCode === 'Delete') {
        if (
          Array.isArray(modelValue.value)
          && modelValue.value.length > 0
          && isTagMarkedForDeletion.value
        ) {
          const newValue = [...(modelValue.value || [])]
          newValue.splice(newValue.length - 1, 1)
          modelValue.value = newValue
          emit('change', cloneDeep(newValue))
          isTagMarkedForDeletion.value = false
        }
        else {
          isTagMarkedForDeletion.value = true
        }
      }
    }
  }
}

// 处理选中标签时的键盘事件
function handleSelectedTagKeydown(
  event: KeyboardEvent,
  keyCode: string,
  tagsLength: number,
) {
  event.preventDefault()

  switch (keyCode) {
    case 'ArrowLeft':
      if (selectedTagIndex.value > 0) {
        selectedTagIndex.value--
      }
      break
    case 'ArrowRight':
      if (selectedTagIndex.value < tagsLength - 1) {
        selectedTagIndex.value++
      }
      else {
        // 移动到输入框
        selectedTagIndex.value = -1
        nextTick(() => {
          lewInputRef.value?.focus()
        })
      }
      break
    case 'Enter':
    case 'NumpadEnter':
      // 进入编辑模式
      startEditingSelectedTag()
      break
    case 'Backspace':
    case 'Delete':
      // 删除选中的标签
      deleteSelectedTag()
      break
    case 'Escape':
      // 取消选中，回到输入框
      selectedTagIndex.value = -1
      nextTick(() => {
        lewInputRef.value?.focus()
      })
      break
  }
}

// 开始编辑选中的标签
function startEditingSelectedTag() {
  if (selectedTagIndex.value < 0 || props.readonly || props.disabled)
    return

  const index = selectedTagIndex.value
  editingIndex.value = index
  selectedTagIndex.value = -1

  // 触发标签的点击事件来进入编辑模式
  nextTick(() => {
    const tagEl = document.querySelector(
      `.lew-input-tag-item:nth-child(${index + 1})`,
    ) as HTMLElement
    tagEl?.click()
  })
}

// 删除选中的标签
function deleteSelectedTag() {
  if (selectedTagIndex.value < 0)
    return

  const index = selectedTagIndex.value
  const tagsLength = (modelValue.value || []).length

  delTag(index)

  // 更新选中索引
  if (tagsLength <= 1) {
    selectedTagIndex.value = -1
    nextTick(() => {
      lewInputRef.value?.focus()
    })
  }
  else if (index >= tagsLength - 1) {
    selectedTagIndex.value = tagsLength - 2
  }
}

function detachKeydownListener() {
  if (document.onkeydown && document.onkeydown !== originalKeydownHandler) {
    document.onkeydown = originalKeydownHandler
  }
}

function openInput() {
  // 如果正在编辑标签，不打开输入框
  if (editingIndex.value >= 0)
    return
  if (isInputActive.value || props.disabled || props.readonly)
    return
  if (
    props.maxLength > 0
    && Array.isArray(modelValue.value)
    && modelValue.value.length >= props.maxLength
  ) {
    LewMessage.warning(
      locale.t('inputTag.maxLength', { maxLength: props.maxLength }),
    )
    return
  }
  isInputActive.value = true
  nextTick(() => {
    if (lewInputRef.value && typeof lewInputRef.value?.focus === 'function') {
      lewInputRef.value?.focus()
    }
  })
  attachKeydownListener()
}

// 尝试添加标签
function tryAddTag(): boolean {
  if (!inputValue.value || inputValue.value.trim() === '')
    return false
  addTag()
  return true
}

function addTag() {
  const _value = Array.isArray(modelValue.value) ? [...modelValue.value] : []
  if (!inputValue.value || inputValue.value.trim() === '')
    return
  if (props.maxLength > 0 && _value.length >= props.maxLength) {
    inputValue.value = ''
    isInputActive.value = false
    LewMessage.warning(
      locale.t('inputTag.maxLength', { maxLength: props.maxLength }),
    )
    return
  }
  _value.push(inputValue.value)
  const addedValue = inputValue.value
  inputValue.value = ''
  modelValue.value = _value
  emit('change', cloneDeep(_value))
  emit('add', addedValue)
}

function delTag(index: number) {
  if (
    !Array.isArray(modelValue.value)
    || index < 0
    || index >= modelValue.value.length
  ) {
    return
  }
  const removedTag = modelValue.value[index]
  const newValue = [...modelValue.value]
  newValue.splice(index, 1)
  modelValue.value = newValue
  if (newValue.length === 0) {
    autoWidthDelay.value = true
    setTimeout(() => {
      autoWidthDelay.value = false
    }, 550)
  }
  emit('change', cloneDeep(newValue))
  emit('remove', removedTag, index)
}

// 标签编辑相关
function handleTagChange(index: number, newValue: string) {
  if (!Array.isArray(modelValue.value))
    return

  const trimmedValue = newValue.trim()

  // 如果编辑后为空，删除该标签
  if (!trimmedValue) {
    delTag(index)
    return
  }

  // 更新值
  const newArray = [...modelValue.value]
  newArray[index] = trimmedValue
  modelValue.value = newArray
  emit('change', cloneDeep(newArray))
}

function handleTagFocus(index: number) {
  editingIndex.value = index
  selectedTagIndex.value = -1
  isTagMarkedForDeletion.value = false
}

function handleTagBlur() {
  editingIndex.value = -1
}

function clear() {
  modelValue.value = []
  inputValue.value = ''
  emit('clear')
  emit('change', undefined)
}

function onBlur() {
  isTagMarkedForDeletion.value = false
  selectedTagIndex.value = -1
  detachKeydownListener()
  if (inputValue.value) {
    tryAddTag()
  }
  // 延迟移除输入框，避免闪烁
  setTimeout(() => {
    isInputActive.value = false
  }, 150)
}

function onFocus() {
  if (props.disabled || props.readonly)
    return
  isInputActive.value = true
  selectedTagIndex.value = -1
  attachKeydownListener()
}

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, clearable } = props
  return object2class('lew-input-tag-view', {
    size,
    readonly,
    disabled,
    clearable,
    'tag-editing': editingIndex.value >= 0,
    'input-focused': isInputActive.value,
  })
})

const getIconSize = computed(() => {
  const size: Record<string, number> = {
    small: 13,
    medium: 14,
    large: 16,
  }
  return size[props.size] || 14
})

const shouldShowIcon = computed(
  () => !((modelValue.value || []).length > 0 && props.clearable),
)

const shouldShowClearIcon = computed(
  () =>
    (modelValue.value || []).length > 0 && props.clearable && !props.readonly,
)

const isTagMarked = computed(() => (index: number) => {
  return (
    isTagMarkedForDeletion.value
    && index === (modelValue.value || []).length - 1
  )
})

const isTagSelected = computed(() => (index: number) => {
  return selectedTagIndex.value === index
})

onUnmounted(() => {
  detachKeydownListener()
})
</script>

<template>
  <div
    class="lew-input-tag-view"
    :class="getInputClassNames"
    :style="{ width: any2px(width) }"
    @click="openInput"
  >
    <div
      :style="{ padding: (modelValue || []).length > 0 ? '4px' : '' }"
      class="lew-input-tag-box"
    >
      <LewTag
        v-for="(item, index) in modelValue"
        :key="`${index}-${item}`"
        :model-value="readonly || disabled ? undefined : item"
        :text="readonly || disabled ? item : undefined"
        type="light"
        class="lew-input-tag-item"
        :class="{
          'lew-input-tag-item-marked': isTagMarked(index),
          'lew-input-tag-item-editing': editingIndex === index,
          'lew-input-tag-item-selected': isTagSelected(index),
        }"
        :size="size"
        :closeable="!readonly && !disabled"
        :editable="!readonly && !disabled"
        :disabled="disabled"
        @close="delTag(index)"
        @change="(val: string) => handleTagChange(index, val)"
        @focus="handleTagFocus(index)"
        @blur="handleTagBlur"
      />
      <LewInput
        v-if="isInputActive || (modelValue || []).length === 0"
        ref="lewInputRef"
        v-model="inputValue"
        :auto-width="(modelValue || []).length > 0"
        class="lew-input-tag"
        :size="size"
        :readonly="!isInputActive"
        :placeholder="
          (modelValue || []).length === 0
            ? locale.t('inputTag.placeholder')
            : ' '
        "
        @input="isTagMarkedForDeletion = false"
        @focus="onFocus"
        @blur="onBlur"
      />
      <CommonIcon
        class="lew-input-tag-icon"
        :size="getIconSize"
        :class="{
          'lew-input-tag-icon-hide': !shouldShowIcon,
        }"
        type="tags"
      />
      <CloseIcon
        v-if="shouldShowClearIcon"
        :size="size"
        class="lew-form-icon-close"
        @click.stop="clear"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-input-tag-view {
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  box-sizing: border-box;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  box-shadow: var(--lew-form-box-shadow);
  transition:
    background-color var(--lew-form-transition-ease),
    border-color var(--lew-form-transition-ease);
  overflow: hidden;
  width: 100%;
  cursor: text;

  :deep() {
    .lew-input-tag-item {
      max-width: 100%;
      background-color: var(--lew-bgcolor-0);
      user-select: none;
      cursor: text;
    }

    .lew-input-tag-item-marked {
      background-color: var(--lew-color-error-light) !important;
      color: var(--lew-color-error-dark) !important;
    }

    .lew-input-tag-item-editing {
      z-index: 1;
    }

    .lew-input-tag-item-selected {
      box-shadow: 0 0 0 1.5px var(--lew-color-primary);
      background-color: var(--lew-color-primary-light) !important;
    }

    .lew-tag-close:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }

    .lew-tag-close:active {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }

  .lew-input-tag-icon {
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    opacity: var(--lew-form-icon-opacity);
  }

  .lew-input-tag-icon-hide {
    opacity: 0;
  }

  .lew-form-icon-close {
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: 9;
    transform: translateY(-50%);
  }

  .lew-input-tag-box {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    box-sizing: border-box;
    transition: width var(--lew-form-transition-bezier);
    width: 100%;

    :deep() {
      .lew-input-view {
        border-radius: 0px !important;
      }
    }
  }

  .lew-input-tag {
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
        height: 26px;
        left: 0px !important;
      }
    }
  }

  :deep(.lew-input) {
    padding: 0 !important;
  }
}

.lew-dark {
  .lew-input-tag-view {
    :deep() {
      .lew-input-tag-item {
        background-color: var(--lew-bgcolor-0);
      }

      .lew-tag-close:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }

      .lew-tag-close:active {
        background-color: rgba(255, 255, 255, 0.05);
      }
    }
  }
}

.lew-input-tag-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
}

// 只有输入框聚焦时才显示外层聚焦样式，编辑标签时不显示
.lew-input-tag-view-input-focused:not(.lew-input-tag-view-tag-editing) {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  background-color: var(--lew-form-bgcolor-focus);

  :deep(.lew-input-tag-item:not(.lew-input-tag-item-editing):not(.lew-input-tag-item-marked)) {
    background-color: var(--lew-color-primary-light);
  }

  :deep(.lew-input-tag-item-marked) {
    background-color: var(--lew-color-error-light) !important;
    color: var(--lew-color-error-dark) !important;
  }
}

.lew-input-tag-view-size-small {
  min-height: var(--lew-form-item-height-small);
  line-height: var(--lew-form-input-line-height-small);

  .lew-input-tag-box {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-small);
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .lew-input-tag {
    height: 20px;
  }
}

.lew-input-tag-view-size-medium {
  line-height: var(--lew-form-input-line-height-medium);
  min-height: var(--lew-form-item-height-medium);

  .lew-input-tag-box {
    padding: var(--lew-form-input-padding-medium);
    font-size: var(--lew-form-font-size-medium);
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .lew-input-tag {
    height: 24px;
  }
}

.lew-input-tag-view-size-large {
  line-height: var(--lew-form-input-line-height-large);
  min-height: var(--lew-form-item-height-large);

  .lew-input-tag-box {
    padding: var(--lew-form-input-padding-large);
    font-size: var(--lew-form-font-size-large);
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .lew-input-tag {
    height: 28px;
  }
}

.lew-input-tag-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}

.lew-input-tag-view-readonly {
  pointer-events: none;
}
</style>
