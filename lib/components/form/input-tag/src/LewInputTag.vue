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

let originalKeydownHandler: ((event: KeyboardEvent) => void) | null = null

function attachKeydownListener() {
  originalKeydownHandler = document.onkeydown
  document.onkeydown = function (event: KeyboardEvent) {
    const keyCode = event.key || event.code
    if (!isInputActive.value)
      return

    if (inputValue.value) {
      if (keyCode === 'Enter' || keyCode === 'NumpadEnter') {
        isTagMarkedForDeletion.value = false
        document.onkeydown = originalKeydownHandler
        isInputActive.value = false
        if (inputValue.value) {
          if (props.allowDuplicates) {
            addTag()
          }
          else {
            if (
              !Array.isArray(modelValue.value)
              || !modelValue.value.includes(inputValue.value)
            ) {
              addTag()
            }
            else {
              LewMessage.warning(locale.t('inputTag.duplicate'))
            }
          }
          openInput()
        }
      }
    }
    else {
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

function detachKeydownListener() {
  if (document.onkeydown && document.onkeydown !== originalKeydownHandler) {
    document.onkeydown = originalKeydownHandler
  }
}

function openInput() {
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

function clear() {
  modelValue.value = []
  inputValue.value = ''
  emit('clear')
  emit('change', undefined)
}

function onBlur() {
  isInputActive.value = false
  isTagMarkedForDeletion.value = false
  detachKeydownListener()
  if (inputValue.value) {
    addTag()
  }
}

function onFocus() {
  if (props.disabled || props.readonly)
    return
  isInputActive.value = true
  attachKeydownListener()
}

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, clearable } = props
  return object2class('lew-input-tag-view', {
    size,
    readonly,
    disabled,
    clearable,
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

const getTagStyle = computed(() => (index: number) => {
  return {
    maxWidth: '100%',
    backgroundColor:
      isTagMarkedForDeletion.value
      && index === (modelValue.value || []).length - 1
        ? 'var(--lew-color-red-light)'
        : '',
    color:
      isTagMarkedForDeletion.value
      && index === (modelValue.value || []).length - 1
        ? 'var(--lew-color-red-dark)'
        : 'var(--lew-color-inputtag-primary-tag-text)',
  }
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
      <transition-group name="tag-list">
        <LewTag
          v-for="(item, index) in modelValue"
          :key="index"
          type="light"
          :style="getTagStyle(index)"
          :size="size"
          :closeable="!readonly && !disabled"
          :readonly="readonly || disabled"
          @close="delTag(index)"
        >
          {{ item }}
        </LewTag>
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
      </transition-group>
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
    .lew-tag {
      background-color: var(--lew-bgcolor-0);
      user-select: none;
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
      .lew-tag {
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

.lew-input-tag-view:focus-within {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  background-color: var(--lew-form-bgcolor-focus);

  :deep(.lew-tag) {
    background-color: var(--lew-color-inputtag-primary-tag-focus-bg);
  }
}

.tag-list-move,
.tag-list-enter-active,
.tag-list-leave-active {
  transition:
    background-color var(--lew-form-transition-ease),
    border-color var(--lew-form-transition-ease);
}

.tag-list-enter-from,
.tag-list-leave-to {
  opacity: 0;
  transform: scale(0);
}

.tag-list-leave-active {
  position: absolute !important;
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
