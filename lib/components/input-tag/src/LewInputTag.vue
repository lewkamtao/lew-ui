<script setup lang="ts">
import { inputTagProps } from './props'
import { LewInput, LewTag, LewMessage } from 'lew-ui'
import { cloneDeep } from 'lodash-es'
import { object2class } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { locale } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewMessage)
}
const emit = defineEmits(['remove', 'change', 'clear', 'add'])

const props = defineProps(inputTagProps)
const modelValue: Ref<string[] | undefined> = defineModel()
const inputValue = ref()
const lewInputRef = ref()
const isInputActive = ref(false)
let shouldReopenInput = false
const isTagMarkedForDeletion = ref(false)

const openInput = () => {
  if (isInputActive.value) return
  if (
    props.maxLength > 0 &&
    (modelValue.value || []).length >= props.maxLength
  ) {
    LewMessage.warning(
      locale.t('inputTag.maxLength', { maxLength: props.maxLength })
    )
    return
  }
  isInputActive.value = true
  nextTick(() => {
    lewInputRef.value.toFocus()
  })
  document.onkeydown = function (event) {
    if (!inputValue.value) {
      // 处理删除键（Backspace或Delete）
      if (event.keyCode === 8 || event.keyCode === 46) {
        if (
          modelValue.value &&
          modelValue.value.length > 0 &&
          isTagMarkedForDeletion.value
        ) {
          // 第二次按删除键，确认删除最后一个标签
          modelValue.value.splice(modelValue.value.length - 1, 1)
          emit('change', cloneDeep(modelValue.value))
          isTagMarkedForDeletion.value = false
        } else {
          // 第一次按删除键，标记最后一个标签为待删除状态
          isTagMarkedForDeletion.value = true
        }
      }
    } else if (event.keyCode === 13) {
      // 处理回车键
      isTagMarkedForDeletion.value = false
      shouldReopenInput = true
    }
  }
}

const blurFn = () => {
  document.onkeydown = null
  isInputActive.value = false
  isTagMarkedForDeletion.value = false

  // 处理添加标签
  if (inputValue.value) {
    if (props.allowDuplicates) {
      addTag()
    } else {
      if (!(modelValue.value || []).includes(inputValue.value)) {
        addTag()
      } else {
        LewMessage.warning(locale.t('inputTag.duplicate'))
      }
    }
  }

  // 如果是回车触发的失焦，重新打开输入框
  if (shouldReopenInput) {
    openInput()
    shouldReopenInput = false
  }
}

const addTag = () => {
  let _value = modelValue.value || []
  if (inputValue.value) {
    if (props.maxLength > 0 && _value.length >= props.maxLength) {
      inputValue.value = ''
      isInputActive.value = false
      return
    }
    _value.push(inputValue.value)
    inputValue.value = ''
    modelValue.value = _value
    emit('change', _value)
    emit('add', inputValue.value)
  }
}

const autoWidthDelay = ref(false)

const delTag = (index: number) => {
  const removedTag = modelValue.value?.[index]
  modelValue.value && modelValue.value.splice(index, 1)
  if (modelValue.value && modelValue.value.length === 0) {
    autoWidthDelay.value = true
    setTimeout(() => {
      autoWidthDelay.value = false
    }, 550)
  }
  emit('change', modelValue.value)
  emit('remove', removedTag)
}

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, clearable } = props
  return object2class('lew-input-tag-view', {
    size,
    readonly,
    disabled,
    clearable
  })
})

const getIconSize = computed(() => {
  const size: Record<string, number> = {
    small: 13,
    medium: 14,
    large: 16
  }
  return size[props.size]
})

const clear = () => {
  modelValue.value = []
  inputValue.value = ''
  emit('change', [])
  emit('clear')
}
</script>

<template>
  <div
    class="lew-input-tag-view"
    @click="openInput"
    :class="getInputClassNames"
    :style="{ width: any2px(width) }"
  >
    <div
      :style="{ padding: (modelValue || []).length > 0 ? '4px' : '' }"
      class="lew-input-tag-box"
    >
      <transition-group name="tag-list">
        <lew-tag
          v-for="(item, index) in modelValue"
          :key="index"
          type="light"
          :style="{
            maxWidth: '100%',
            backgroundColor:
              isTagMarkedForDeletion && index === (modelValue || []).length - 1
                ? 'var(--lew-color-red-light)'
                : ''
          }"
          :size="size"
          :closable="!readonly && !disabled"
          :readonly="readonly || disabled"
          @close="delTag(index)"
        >
          {{ item }}
        </lew-tag>
        <lew-input
          v-if="isInputActive || (modelValue || []).length === 0"
          ref="lewInputRef"
          :auto-width="(modelValue || []).length > 0"
          v-model="inputValue"
          class="lew-input-tag"
          :size="size"
          :readonly="!isInputActive"
          :placeholder="
            (modelValue || []).length === 0
              ? locale.t('inputTag.placeholder')
              : ' '
          "
          ok-by-enter
          @input="isTagMarkedForDeletion = false"
          @blur="blurFn"
        />
      </transition-group>

      <transition name="lew-form-icon-ani">
        <Icon
          v-if="
            clearable && (modelValue || []).length > 0 && !readonly && !disabled
          "
          class="lew-form-icon-close"
          :class="{
            'lew-form-icon-close-focus': isInputActive
          }"
          :size="getIconSize"
          type="close"
          @mousedown.prevent=""
          @click="clear"
        />
      </transition>
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
  transition: all var(--lew-form-transition-ease);
  overflow: hidden;
  width: 100%;
  cursor: text;
  :deep() {
    .lew-tag {
      background-color: var(--lew-bgcolor-0);
    }
  }

  .lew-input-tag-box {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    box-sizing: border-box;
    transition: all var(--lew-form-transition-bezier);
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
    margin-left: 2px;
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

.lew-input-tag-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
}
.lew-input-tag-view:focus-within {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  background-color: var(--lew-form-bgcolor-focus);

  :deep(.lew-tag) {
    background-color: var(--lew-color-primary-light);
  }
}

.tag-list-move,
.tag-list-enter-active,
.tag-list-leave-active {
  transition: all var(--lew-form-transition-bezier);
}

.tag-list-enter-from,
.tag-list-leave-to {
  opacity: 0;
  transform: translateX(-12px);
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
