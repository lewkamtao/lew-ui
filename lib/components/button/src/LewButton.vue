<script setup lang="ts">
import { LewIcon } from 'lew-ui'
import { object2class, getColorType } from 'lew-ui/utils'
import { buttonProps } from './props'

const emit = defineEmits(['click'])
const props = defineProps(buttonProps)

const _loading = ref(false)

const buttonRef = ref()

const focus = () => {
  buttonRef.value?.focus()
}

const handleClick = async (e: MouseEvent) => {
  if (props.disabled || _loading.value || props.loading) return
  emit('click', e)
  if (typeof props.request === 'function') {
    if (_loading.value) {
      return
    }
    _loading.value = true
    await props.request()
    _loading.value = false
  }
}
const instance = getCurrentInstance()
const hasDefaultSlot = ref(false)

if (instance?.slots.default) {
  hasDefaultSlot.value = true
}

const getButtonClass = computed(() => {
  const { size, type, icon, text, color } = props
  const loading = _loading.value || props.loading
  const singleIcon = !!(!text && icon && !hasDefaultSlot.value)
  return object2class('lew-button', {
    size,
    type,
    loading,
    singleIcon,
    color
  })
})

const getIconSize = computed(() => {
  const { size, iconSize } = props
  switch (size) {
    case 'mini':
      return iconSize ? Number(iconSize) : 12
    case 'small':
      return iconSize ? Number(iconSize) : 14
    case 'medium':
      return iconSize ? Number(iconSize) : 16
    case 'large':
      return iconSize ? Number(iconSize) : 18
    default:
      return iconSize ? Number(iconSize) : 16
  }
})

const getStyle = computed(() => {
  const { round, type, color, dashed } = props
  const styleObj: Record<string, string> = {}
  const _color = getColorType(color) || 'primary'
  switch (type) {
    case 'fill':
      styleObj.backgroundColor = `var(--lew-color-${_color})`
      styleObj.color = 'var(--lew-color-white)'
      break
    case 'light':
      styleObj.backgroundColor = `var(--lew-color-${_color}-light)`
      styleObj.color = `var(--lew-color-${_color}-dark)`
      break
    case 'ghost':
      styleObj.backgroundColor = 'transparent'
      styleObj.border = `var(--lew-form-border-width) ${dashed ? 'dashed' : 'solid'} var(--lew-color-${_color})`
      styleObj.color = `var(--lew-color-${_color}-dark)`
      styleObj.boxShadow = 'none'
      break
    case 'text':
      styleObj.backgroundColor = 'transparent'
      styleObj.color = `var(--lew-color-${_color}-dark)`
      styleObj.boxShadow = 'none'
      break
    default:
      styleObj.backgroundColor = `var(--lew-color-${_color})`
      break
  }
  styleObj.borderRadius = round ? '50px' : 'none'
  return styleObj
})

defineExpose({ focus })
</script>

<template>
  <button
    ref="buttonRef"
    class="lew-button"
    :class="getButtonClass"
    :disabled="disabled"
    :style="getStyle"
    @click="handleClick"
  >
    <div
      class="lew-loading-icon"
      :class="{
        'lew-loading-isShow': (_loading || loading) && !disabled
      }"
    >
      <lew-icon
        :size="getIconSize"
        animation="spin"
        strokeWidth="2"
        animationSpeed="fast"
        type="loader"
      />
    </div>
    <template v-if="iconPosition === 'left'">
      <slot v-if="$slots.icon" name="icon"> </slot>
      <lew-icon
        v-else-if="icon"
        strokeWidth="2"
        class="lew-button-icon"
        :size="getIconSize"
        :type="icon"
      />
    </template>
    <div v-if="$slots.default || text" class="lew-button-content">
      <span class="lew-button-text">
        <template v-if="$slots.default">
          <slot></slot>
        </template>
        <template v-else>
          {{ text }}
        </template>
      </span>
    </div>
    <template v-if="iconPosition === 'right'">
      <slot v-if="$slots.icon" name="icon"> </slot>
      <lew-icon
        v-else-if="icon"
        class="lew-button-icon"
        strokeWidth="2"
        :size="getIconSize"
        :type="icon"
      />
    </template>
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

  .lew-loading-icon {
    position: absolute;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: opacity 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .lew-loading-isShow {
    opacity: 1;
  }
  .lew-button-content {
    position: relative;
    z-index: 2;
  }

  .lew-loading-isShow {
    opacity: 1;
  }
}

.lew-button::after {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.2);
  transition: var(--lew-form-transition-ease);
  opacity: 0;
  content: '';
}

.lew-button-color-black::after {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #fff, $alpha: 0.2);
  transition: 0.1s all;
  opacity: 0;
  content: '';
}

.lew-button-type-text.lew-button-color-black::after {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.2);
  transition: 0.1s all;
  opacity: 0;
  content: '';
}

.lew-button-type-ghost::after {
  display: none;
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
  padding: 0px 10px;
  .lew-loading-icon {
    left: 7px;
  }
}

.lew-button-size-small {
  min-width: 40px;
  height: calc(var(--lew-form-item-height-small));
  line-height: calc(var(--lew-form-item-height-small));
  font-size: var(--lew-form-font-size-small);
  gap: 3px;
  padding: 0px 14px;
  .lew-loading-icon {
    left: 8px;
  }
}

.lew-button-size-medium {
  min-width: 50px;
  height: calc(var(--lew-form-item-height-medium));
  line-height: calc(var(--lew-form-item-height-medium));
  font-size: var(--lew-form-font-size-medium);
  gap: 4px;
  padding: 0px 16px;
  .lew-loading-icon {
    left: 9px;
  }
}

.lew-button-size-large {
  min-width: 60px;
  height: calc(var(--lew-form-item-height-large));
  line-height: calc(var(--lew-form-item-height-large));
  font-size: var(--lew-form-font-size-large);
  gap: 5px;
  padding: 0px 20px;
  .lew-loading-icon {
    left: 10px;
  }
}
.lew-button-singleIcon {
  .lew-loading-icon {
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
  padding-left: 23px;
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
  background-color: var(--lew-bgcolor-2) !important;
}
.lew-button-type-ghost:hover {
  background-color: var(--lew-bgcolor-2) !important;
}
.lew-button-type-ghost:active {
  background-color: var(--lew-color-normal-light) !important;
}
</style>
<style lang="scss">
.lew-dark .lew-button-color-black.lew-button-type-fill {
  color: #000 !important;
}
</style>
