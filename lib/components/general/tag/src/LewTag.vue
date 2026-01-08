<script setup lang="ts">
import CloseIcon from 'lew-ui/_components/CloseIcon.vue'
import { getColorType } from 'lew-ui/utils'
import { isFunction } from 'lodash-es'
import { tagEmits } from './emits'
import { tagProps } from './props'

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)
const slots = useSlots()
const isClosing = ref(false)

// v-model 支持
const modelValue = defineModel<string>()

// 编辑状态
const isEditing = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const tagRef = ref<HTMLElement | null>(null)
const editValue = ref('')
const inputWidth = ref('20px')

// 判断是否使用了 v-model（可编辑模式）
const isEditableMode = computed(() => {
  return props.editable && modelValue.value !== undefined
})

// 显示的文本内容
const displayText = computed(() => {
  if (modelValue.value !== undefined) {
    return modelValue.value
  }
  return props.text || ''
})

const tagClass = computed(() => {
  const resolvedColor = getColorType(props.color) || 'primary'
  return [
    'lew-tag',
    `lew-tag--${props.size || 'medium'}`,
    `lew-tag--${props.type || 'light'}`,
    `lew-tag--${resolvedColor}`,
    props.round && 'lew-tag--round',
    props.oversize && 'lew-tag--oversize',
    props.disabled && 'lew-tag--disabled',
    isEditing.value && 'lew-tag--editing',
    isEditableMode.value && 'lew-tag--editable',
  ]
    .filter(Boolean)
    .join(' ')
})

// 计算输入框宽度
function updateInputWidth() {
  const text = editValue.value || props.placeholder || ''
  if (!tagRef.value)
    return

  // 创建临时元素测量文本宽度，添加到标签内部以正确继承样式
  const span = document.createElement('span')
  span.style.cssText = `
    position: absolute;
    visibility: hidden;
    white-space: pre;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    pointer-events: none;
  `
  span.textContent = text || 'W'
  tagRef.value.appendChild(span)
  const width = span.offsetWidth
  tagRef.value.removeChild(span)
  inputWidth.value = `${Math.max(width, 20)}px`
}

// 点击标签进入编辑模式
function handleTagClick(e: MouseEvent) {
  e.stopPropagation()
  if (!isEditableMode.value || props.disabled || isEditing.value)
    return

  isEditing.value = true
  editValue.value = modelValue.value || ''
  updateInputWidth()
  emit('focus')

  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

// 输入时更新宽度
function handleInput() {
  updateInputWidth()
}

// 输入框失焦，保存并退出编辑模式
function handleInputBlur() {
  if (!isEditing.value)
    return

  isEditing.value = false
  const newValue = editValue.value.trim()

  if (newValue !== modelValue.value) {
    // emit change 事件，父组件可通过更新 :model-value + key 策略来拒绝更新
    emit('change', newValue)
    // 延迟更新，让父组件有机会先处理
    nextTick(() => {
      // 组件未被重建时才更新 modelValue
      modelValue.value = newValue
    })
  }

  emit('blur')
}

// 键盘事件处理
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    inputRef.value?.blur()
  }
  else if (e.key === 'Escape') {
    e.preventDefault()
    editValue.value = modelValue.value || ''
    isEditing.value = false
    emit('blur')
  }
}

async function handleClose(): Promise<void> {
  if (props.disabled || isClosing.value)
    return

  if (props.close) {
    isClosing.value = true
    let result = false
    try {
      result = await props.close()
    }
    catch {
      isClosing.value = false
      return
    }
    if (result === true) {
      emit('close')
    }
    isClosing.value = false
  }
  else {
    emit('close')
  }
}
</script>

<template>
  <div ref="tagRef" :class="tagClass" @click="handleTagClick">
    <div v-if="slots.left" class="lew-tag-left">
      <slot name="left" />
    </div>

    <div class="lew-tag-value">
      <!-- 编辑模式：显示输入框 -->
      <input
        v-if="isEditing"
        ref="inputRef"
        v-model="editValue"
        class="lew-tag-input"
        :style="{ width: inputWidth }"
        :placeholder="props.placeholder"
        @blur="handleInputBlur"
        @keydown="handleKeydown"
        @input="handleInput"
      >
      <!-- 非编辑模式：显示文本 -->
      <template v-else-if="isEditableMode">
        <span v-if="displayText" class="lew-tag-text">{{ displayText }}</span>
        <span v-else class="lew-tag-placeholder">{{ props.placeholder }}</span>
      </template>
      <!-- 普通模式：使用 slot 或 text -->
      <template v-else>
        <slot v-if="!props.text" />
        <template v-else>
          {{ props.text }}
        </template>
      </template>
    </div>

    <div v-if="slots.right" class="lew-tag-right">
      <slot name="right" />
    </div>

    <CloseIcon
      v-if="props.closeable || isFunction(props.close)"
      :size="
        props.size === 'small' ? 'small' : props.size === 'large' ? 'medium' : 'small'
      "
      :loading="isClosing"
      :disabled="props.disabled || isClosing"
      class="lew-tag-close"
      @click.stop="handleClose"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-tag {
  // CSS 变量定义
  --lew-tag-bg: transparent;
  --lew-tag-color: var(--lew-color-primary);
  --lew-tag-border: none;
  --lew-tag-theme-color: var(--lew-color-primary); // 用于编辑模式边框

  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  padding: 0;
  align-items: center;
  justify-content: center;

  // 视觉
  background-color: var(--lew-tag-bg);
  color: var(--lew-tag-color);
  border: var(--lew-tag-border);

  &--small {
    min-height: 20px;
    min-width: 20px;
    line-height: 16px;
    font-size: 12px;
    border-radius: 5px;
    padding: 0px 4px;
    gap: 2px;

    &.lew-tag--oversize {
      padding: 4px 10px;
    }
  }

  &--medium {
    min-height: 24px;
    min-width: 24px;
    line-height: 18px;
    font-size: 13px;
    border-radius: 6px;
    padding: 0px 6px;
    gap: 3px;

    &.lew-tag--oversize {
      padding: 5px 12px;
    }
  }

  &--large {
    min-height: 28px;
    min-width: 28px;
    line-height: 20px;
    font-size: 14px;
    border-radius: 7px;
    padding: 0px 8px;
    gap: 4px;

    &.lew-tag--oversize {
      padding: 6px 14px;
    }
  }

  &--round {
    border-radius: 20px !important;
  }

  &--disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  &--editable {
    cursor: text;
    // 默认透明边框，防止 hover/editing 时宽度抖动
    border: var(--lew-form-border-width) solid transparent !important;
    transition:
      box-shadow 0.15s ease,
      border-color 0.15s ease;

    &:hover:not(.lew-tag--editing) {
      border-color: color-mix(in srgb, var(--lew-tag-theme-color) 40%, transparent) !important;
      box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--lew-tag-theme-color) 30%, transparent);
    }
  }

  &--editing {
    border-color: var(--lew-tag-theme-color) !important;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--lew-tag-theme-color) 40%, transparent);

    .lew-tag-close {
      display: none;
    }
  }

  &--ghost {
    --lew-tag-bg: transparent;
    box-shadow: none;
  }

  .lew-tag-value {
    box-sizing: border-box;
    font-weight: normal;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }

  .lew-tag-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lew-tag-placeholder {
    color: var(--lew-text-color-5);
    opacity: 0.6;
  }

  .lew-tag-input {
    border: none;
    outline: none;
    background: transparent;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
    min-width: 20px;
    max-width: 200px;
    line-height: inherit;

    &::placeholder {
      color: var(--lew-text-color-5);
      opacity: 0.6;
    }
  }

  .lew-tag-close {
    // CloseButton 组件已处理样式
    flex-shrink: 0;
  }

  .lew-tag-left,
  .lew-tag-right {
    display: inline-flex;
    box-sizing: border-box;
    align-items: center;
  }

  &.lew-tag-bold {
    font-weight: bold;

    .lew-tag-value {
      font-weight: bold;
    }
  }
}

// 类型 & 颜色变体（使用 Mixin 减少重复）
@mixin tag-variant($name) {
  .lew-tag--#{$name} {
    --lew-tag-theme-color: var(--lew-color-#{$name});
  }

  .lew-tag--#{$name}.lew-tag--fill {
    --lew-tag-bg: var(--lew-color-tag-#{$name}-fill);
    --lew-tag-color: var(--lew-color-tag-#{$name}-fill-text);
    --lew-tag-border: none;
  }

  .lew-tag--#{$name}.lew-tag--light {
    --lew-tag-bg: color-mix(in srgb, var(--lew-color-tag-#{$name}-light) 35%, var(--lew-bgcolor-0));
    --lew-tag-color: var(--lew-color-tag-#{$name}-light-text);
    --lew-tag-border: none;

    // 如果浏览器不支持 color-mix，使用 fallback
    @supports not (color-mix(in srgb, red 50%, white)) {
      --lew-tag-bg: var(--lew-color-tag-#{$name}-light);
    }
  }

  .lew-tag--#{$name}.lew-tag--ghost {
    --lew-tag-bg: transparent;
    --lew-tag-border: var(--lew-form-border-width) solid var(--lew-color-#{$name});
    --lew-tag-color: var(--lew-color-tag-#{$name}-ghost-text);
  }
}

// 生成所有主题色变体
@include tag-variant('blue');
@include tag-variant('gray');
@include tag-variant('red');
@include tag-variant('green');
@include tag-variant('yellow');
@include tag-variant('indigo');
@include tag-variant('purple');
@include tag-variant('pink');
@include tag-variant('orange');
@include tag-variant('cyan');
@include tag-variant('teal');
@include tag-variant('mint');
@include tag-variant('brown');
@include tag-variant('black');
@include tag-variant('error');
@include tag-variant('success');
@include tag-variant('warning');
@include tag-variant('info');
@include tag-variant('normal');
@include tag-variant('primary');
@include tag-variant('danger');
</style>
