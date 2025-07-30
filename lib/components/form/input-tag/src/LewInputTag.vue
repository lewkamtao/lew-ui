<script setup lang="ts">
import { LewInput, LewMessage, LewTag, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { inputTagProps } from './props'

const props = defineProps(inputTagProps)
const emit = defineEmits(['remove', 'change', 'clear', 'add'])
// 获取app实例
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  try {
    app.use(LewMessage)
  }
  catch (error) {
    console.error('注册LewMessage失败:', error)
  }
}

const modelValue = defineModel<string[] | undefined>()
const inputValue = ref<string>('')
const lewInputRef = ref<any>(null)
const isInputActive = ref<boolean>(false)
const isTagMarkedForDeletion = ref<boolean>(false)
const autoWidthDelay = ref<boolean>(false)

// 存储原始的键盘事件处理函数
let originalKeydownHandler: ((event: KeyboardEvent) => void) | null = null

function openInput() {
  // 如果输入框已激活或组件被禁用或只读，直接返回
  if (isInputActive.value || props.disabled || props.readonly)
    return

  try {
    // 检查是否达到最大标签数量限制
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

    // 激活输入框
    isInputActive.value = true

    // 在下一个渲染周期聚焦输入框
    nextTick(() => {
      if (
        lewInputRef.value
        && typeof lewInputRef.value.toFocus === 'function'
      ) {
        lewInputRef.value.toFocus()
      }
    })

    // 保存原始的键盘事件处理函数
    originalKeydownHandler = document.onkeydown

    // 设置键盘事件处理
    document.onkeydown = function (event: KeyboardEvent) {
      try {
        // 使用更现代的事件属性
        const keyCode = event.key || event.code

        // 输入框有值的情况
        if (inputValue.value) {
          if (keyCode === 'Enter' || keyCode === 'NumpadEnter') {
            // 处理回车键
            isTagMarkedForDeletion.value = false

            // 清除键盘事件处理器并恢复原始处理器
            document.onkeydown = originalKeydownHandler
            isInputActive.value = false

            // 处理添加标签
            if (inputValue.value) {
              if (props.allowDuplicates) {
                addTag()
              }
              else {
                // 检查是否有重复标签
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
              // 重新打开输入框
              openInput()
            }
          }
        }
        else {
          // 输入框为空的情况
          // 处理删除键（Backspace或Delete）
          if (keyCode === 'Backspace' || keyCode === 'Delete') {
            if (
              Array.isArray(modelValue.value)
              && modelValue.value.length > 0
              && isTagMarkedForDeletion.value
            ) {
              // 第二次按删除键，确认删除最后一个标签
              try {
                const newValue = [...(modelValue.value || [])]
                newValue.splice(newValue.length - 1, 1)
                modelValue.value = newValue
                emit('change', cloneDeep(newValue))
              }
              catch (error) {
                console.error('删除标签时出错:', error)
              }
              isTagMarkedForDeletion.value = false
            }
            else {
              // 第一次按删除键，标记最后一个标签为待删除状态
              isTagMarkedForDeletion.value = true
            }
          }

          if (keyCode === 'Enter' || keyCode === 'NumpadEnter') {
            // 当输入框为空且按下回车键时，失焦
            if (
              lewInputRef.value
              && typeof lewInputRef.value.toBlur === 'function'
            ) {
              lewInputRef.value.toBlur()
            }
          }
        }
      }
      catch (error) {
        console.error('键盘事件处理出错:', error)
        // 恢复原始键盘事件处理器
        document.onkeydown = originalKeydownHandler
      }
    }
  }
  catch (error) {
    console.error('打开输入框时出错:', error)
    isInputActive.value = false
  }
}

// 组件卸载时清除键盘事件处理器
onUnmounted(() => {
  try {
    if (document.onkeydown && document.onkeydown !== originalKeydownHandler) {
      document.onkeydown = originalKeydownHandler
    }
  }
  catch (error) {
    console.error('卸载组件时清除键盘事件处理器出错:', error)
  }
})

function addTag() {
  try {
    const _value = Array.isArray(modelValue.value) ? [...modelValue.value] : []

    if (!inputValue.value || inputValue.value.trim() === '') {
      return
    }

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
  catch (error) {
    console.error('添加标签时出错:', error)
  }
}

function delTag(index: number) {
  try {
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
    emit('remove', removedTag)
  }
  catch (error) {
    console.error('删除标签时出错:', error)
  }
}

const getInputClassNames = computed(() => {
  try {
    const { size, readonly, disabled, clearable } = props
    return object2class('lew-input-tag-view', {
      size,
      readonly,
      disabled,
      clearable,
    })
  }
  catch (error) {
    console.error('计算输入框类名时出错:', error)
    return 'lew-input-tag-view'
  }
})

const getIconSize = computed(() => {
  try {
    const size: Record<string, number> = {
      small: 13,
      medium: 14,
      large: 16,
    }
    return size[props.size] || 14
  }
  catch (error) {
    console.error('计算图标大小时出错:', error)
    return 14
  }
})

function clear() {
  try {
    modelValue.value = []
    inputValue.value = ''
    emit('change', [])
    emit('clear')
  }
  catch (error) {
    console.error('清空标签时出错:', error)
  }
}

function onBlur() {
  isInputActive.value = false
  if (inputValue.value) {
    addTag()
  }
}
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
          :style="{
            maxWidth: '100%',
            backgroundColor:
              isTagMarkedForDeletion && index === (modelValue || []).length - 1
                ? 'var(--lew-color-red-light)'
                : '',
            color:
              isTagMarkedForDeletion && index === (modelValue || []).length - 1
                ? 'var(--lew-color-red-dark)'
                : 'var(--lew-color-primary-dark)',
          }"
          :size="size"
          :closable="!readonly && !disabled"
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
          @blur="onBlur"
        />
      </transition-group>

      <transition name="lew-form-icon-ani">
        <CommonIcon
          v-if="
            clearable && (modelValue || []).length > 0 && !readonly && !disabled
          "
          class="lew-form-icon-close"
          :class="{
            'lew-form-icon-close-focus': isInputActive,
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
  transition: all var(--lew-form-transition-ease);
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
