<script setup lang="ts">
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, getColorType, object2class } from 'lew-ui/utils'
import { computed, getCurrentInstance, ref } from 'vue'
import { buttonProps } from './props'

// Props & Emit
const props = defineProps(buttonProps)
const emit = defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
}>()

// Refs
const buttonRef = ref<HTMLButtonElement>()
const _loading = ref(false)

// Methods
function focus() {
  buttonRef.value?.focus()
}

function blur() {
  buttonRef.value?.blur()
}

async function handleClick(event: MouseEvent) {
  if (props.disabled || _loading.value || props.loading) {
    return
  }

  emit('click', event)

  if (typeof props.request === 'function') {
    if (_loading.value) {
      return
    }
    _loading.value = true
    try {
      await props.request()
    }
    catch (error) {
      console.error('[LewButton] Request failed:', error)
    }
    finally {
      _loading.value = false
    }
  }
}

function handleFocus(event: FocusEvent) {
  if (!props.disabled) {
    emit('focus', event)
  }
}

function handleBlur(event: FocusEvent) {
  if (!props.disabled) {
    emit('blur', event)
  }
}

function handleMouseenter(event: MouseEvent) {
  if (!props.disabled) {
    emit('mouseenter', event)
  }
}

function handleMouseleave(event: MouseEvent) {
  if (!props.disabled) {
    emit('mouseleave', event)
  }
}

// Slot detection
const instance = getCurrentInstance()
const hasDefaultSlot = ref(false)

if (instance?.slots.default) {
  hasDefaultSlot.value = true
}

// Computed
const getButtonClass = computed(() => {
  const { size, type, color, singleIcon } = props
  const loading = _loading.value || props.loading
  return object2class('lew-button', {
    size,
    type,
    loading,
    singleIcon,
    color,
  })
})

const getIconSize = computed(() => {
  const { size } = props
  switch (size) {
    case 'mini':
      return 12
    case 'small':
      return 14
    case 'medium':
      return 16
    case 'large':
      return 18
    default:
      return 16
  }
})

const getStyle = computed(() => {
  const { round, type, color, dashed, width } = props
  const styleObj: Record<string, string> = {}
  const _color = getColorType(color) || 'primary'
  const fillTextColor = () => {
    return ['green', 'yellow', 'mint', 'teal', 'cyan'].includes(_color) ? 'var(--lew-text-color-0-invert)' : 'var(--lew-color-white)'
  }

  // 基础样式
  const baseStyle = {
    fill: {
      backgroundColor: `var(--lew-color-${_color})`,
      color: fillTextColor(),
    },
    light: {
      backgroundColor: `var(--lew-color-${_color}-light)`,
      color: `var(--lew-color-${_color}-dark)`,
    },
    ghost: {
      backgroundColor: 'transparent',
      border: `var(--lew-form-border-width) ${
        dashed ? 'dashed' : 'solid'
      } var(--lew-color-${_color}-dark)`,
      color: `var(--lew-color-${_color}-dark)`,
      boxShadow: 'none',
    },
    text: {
      backgroundColor: 'transparent',
      color: `var(--lew-color-${_color}-dark)`,
      boxShadow: 'none',
    },
  }

  // 合并样式
  Object.assign(
    styleObj,
    baseStyle[type as keyof typeof baseStyle] || {
      backgroundColor: `var(--lew-color-${_color})`,
    },
  )

  // 圆角样式
  styleObj.borderRadius = round ? '50px' : 'none'

  if (width) {
    styleObj.width = any2px(width)
  }

  return styleObj
})

// Expose methods
defineExpose({
  focus,
  blur,
})
</script>

<template>
  <button
    ref="buttonRef"
    class="lew-button"
    :class="getButtonClass"
    :disabled="disabled"
    :style="getStyle"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div
      class="lew-button-loading-icon"
      :class="{
        'lew-button-loading-isShow': (_loading || loading) && !disabled,
      }"
    >
      <CommonIcon :size="getIconSize" loading type="loader" />
    </div>
    <div v-if="$slots.default || text" class="lew-button-content">
      <span class="lew-button-text">
        <template v-if="$slots.default">
          <slot />
        </template>
        <template v-else>
          {{ text }}
        </template>
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.lew-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  flex-shrink: 0;
  user-select: none;
  width: auto;
  white-space: nowrap;
  box-sizing: border-box;
  transition: var(--lew-form-transition-ease);
  border: none;
  cursor: pointer;
  border-radius: var(--lew-border-radius-small);
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: var(--lew-form-box-shadow);
  outline: none;

  .lew-button-loading-icon {
    position: absolute;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: opacity 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .lew-button-loading-isShow {
    opacity: 1;
  }

  .lew-button-content {
    position: relative;
    font-size: 0px;
  }

  .lew-button-loading-isShow {
    opacity: 1;
  }
}
.lew-button-text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.lew-button::after {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.2);
  transition: all 0.1s;
  opacity: 0;
  content: '';
}

.lew-button:hover:after {
  opacity: 0.4;
}

.lew-button:active {
  opacity: 1;
}

.lew-button:active::after {
  opacity: 1;
}

.lew-button-size-mini {
  min-width: 30px;
  height: calc(var(--lew-form-item-height-mini));
  line-height: calc(var(--lew-form-item-height-mini));
  font-size: var(--lew-form-font-size-mini);
  gap: 2px;
  padding: 0px 14px;
  .lew-button-text {
    font-size: var(--lew-form-font-size-mini);
    gap: 2px;
  }
  .lew-button-loading-icon {
    left: 7px;
  }
}

.lew-button-size-small {
  min-width: 40px;
  height: calc(var(--lew-form-item-height-small));
  line-height: calc(var(--lew-form-item-height-small));
  gap: 3px;
  padding: 0px 16px;
  .lew-button-text {
    font-size: var(--lew-form-font-size-small);
    gap: 3px;
  }
  .lew-button-loading-icon {
    left: 8px;
  }
}

.lew-button-size-medium {
  min-width: 50px;
  height: calc(var(--lew-form-item-height-medium));
  line-height: calc(var(--lew-form-item-height-medium));
  gap: 4px;
  padding: 0px 18px;
  .lew-button-text {
    font-size: var(--lew-form-font-size-medium);
    gap: 4px;
  }

  .lew-button-loading-icon {
    left: 9px;
  }
}

.lew-button-size-large {
  min-width: 60px;
  height: calc(var(--lew-form-item-height-large));
  line-height: calc(var(--lew-form-item-height-large));
  gap: 5px;
  padding: 0px 20px;
  .lew-button-text {
    font-size: var(--lew-form-font-size-large);
    gap: 5px;
  }
  .lew-button-loading-icon {
    left: 10px;
  }
}

.lew-button-singleIcon {
  .lew-button-loading-icon {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.lew-button-size-mini.lew-button-singleIcon {
  min-width: auto;
  padding: 0px;
  width: calc(var(--lew-form-item-height-mini));
  height: calc(var(--lew-form-item-height-mini));
}

.lew-button-size-small.lew-button-singleIcon {
  min-width: auto;
  padding: 0px;
  width: calc(var(--lew-form-item-height-small));
  height: calc(var(--lew-form-item-height-small));
}

.lew-button-size-medium.lew-button-singleIcon {
  min-width: auto;
  padding: 0px;
  width: calc(var(--lew-form-item-height-medium));
  height: calc(var(--lew-form-item-height-medium));
}

.lew-button-size-large.lew-button-singleIcon {
  min-width: auto;
  padding: 0px;
  width: calc(var(--lew-form-item-height-large));
  height: calc(var(--lew-form-item-height-large));
}

.lew-button.lew-button-loading.lew-button-singleIcon {
  padding: 0px;

  .lew-button-text {
    display: none;
  }

  .lew-button-icon {
    display: none;
  }
}

.lew-button-loading {
  cursor: progress;
  padding-left: 0px;
}

.lew-button-size-mini.lew-button-loading {
  padding-left: 24px;
}

.lew-button-size-small.lew-button-loading {
  padding-left: 27px;
}

.lew-button-size-medium.lew-button-loading {
  padding-left: 31px;
}

.lew-button-size-large.lew-button-loading {
  padding-left: 34px;
}

.lew-button[disabled] {
  pointer-events: none; //鼠标点击不可修改
  opacity: var(--lew-disabled-opacity);
}

.lew-button-type-text:hover {
  background-color: var(--lew-bgcolor-1) !important;
}

.lew-button-type-ghost:hover {
  background-color: var(--lew-bgcolor-1) !important;
}
</style>
