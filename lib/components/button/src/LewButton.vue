<script setup lang="ts">
import { object2class, getColorType } from 'lew-ui/utils'
import { buttonProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'

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
  const { size, type, color, singleIcon } = props
  const loading = _loading.value || props.loading
  return object2class('lew-button', {
    size,
    type,
    loading,
    singleIcon,
    color
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
      styleObj.border = `var(--lew-form-border-width) ${dashed ? 'dashed' : 'solid'} var(--lew-color-${_color}-dark)`
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
      class="lew-button-loading-icon"
      :class="{
        'lew-button-loading-isShow': (_loading || loading) && !disabled
      }"
    >
      <Icon :size="getIconSize" loading type="loader" />
    </div>
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
  transition: all var(--lew-form-transition-ease);
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
  transition: all var(--lew-form-transition-ease);
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
  padding: 0px 14px;
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
  padding: 0px 16px;
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
