<script setup lang="ts">
import { locale } from 'lew-ui'
import { any2px, object2class } from 'lew-ui/utils'
import { colorPickerEmits } from './emits'
import { colorPickerProps } from './props'

// Props and Emits
const props = defineProps(colorPickerProps)

const emit = defineEmits(colorPickerEmits)

// Constants
const SIZE_WIDTH_MAP = {
  small: 110,
  medium: 117,
  large: 130,
} as const

// v-model
const modelValue = defineModel<string | undefined>({ required: true })

// State
const isFocus = ref(false)
const pickerValueInputRef = ref<HTMLInputElement>()

// Computed properties
const getDisplayPlaceholder = computed(() => {
  return props.placeholder || locale.t('colorPicker.placeholder')
})

const getPickerClassName = computed(() => {
  const { disabled, readonly, size } = props
  return object2class('lew-color-picker', {
    disabled,
    readonly,
    focus: isFocus.value,
    size,
  })
})

const getPickerViewStyle = computed(() => {
  const { size, width } = props
  const defaultWidth = SIZE_WIDTH_MAP[size] || SIZE_WIDTH_MAP.medium
  return {
    width: width === 'auto' || !width ? any2px(defaultWidth) : any2px(width),
  }
})

// Methods
function focus() {
  isFocus.value = true
  pickerValueInputRef.value?.select()
}

function blur() {
  isFocus.value = false
  if (modelValue.value) {
    const convertedValue = convertToHex(modelValue.value)
    modelValue.value = convertedValue
    emit('change', convertedValue)
  }
}

function change() {
  emit('change', modelValue.value)
}

function convertToHex(color: string): string {
  const trimmedColor = color.trim()

  // 6位十六进制颜色
  if (/^#?[0-9a-f]{6}$/i.test(trimmedColor)) {
    return trimmedColor.startsWith('#') ? trimmedColor : `#${trimmedColor}`
  }

  // 3位十六进制颜色
  if (/^#?[0-9a-f]{3}$/i.test(trimmedColor)) {
    const hex = trimmedColor.replace('#', '')
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  // RGB/RGBA 颜色
  const rgbMatch = trimmedColor.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+(?:\.\d+)?)?\)$/i,
  )
  if (rgbMatch) {
    const r = Number.parseInt(rgbMatch[1], 10).toString(16).padStart(2, '0')
    const g = Number.parseInt(rgbMatch[2], 10).toString(16).padStart(2, '0')
    const b = Number.parseInt(rgbMatch[3], 10).toString(16).padStart(2, '0')
    return `#${r}${g}${b}`
  }

  return ''
}
</script>

<template>
  <div class="lew-color-picker-view" :style="getPickerViewStyle">
    <div class="lew-color-picker" :class="getPickerClassName">
      <input
        v-model="modelValue"
        class="lew-color-picker-input"
        type="color"
        @change="change"
      >
      <input
        ref="pickerValueInputRef"
        v-model="modelValue"
        class="lew-color-value-input"
        type="text"
        :placeholder="getDisplayPlaceholder"
        @focus="focus"
        @blur="blur"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-color-picker-view {
  > div {
    width: 100%;
  }

  .lew-color-picker {
    position: relative;
    width: auto;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px;
    background-color: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    border-radius: var(--lew-border-radius-small);
    box-shadow: var(--lew-form-box-shadow);
    transition: all var(--lew-form-transition-ease);

    .lew-color-picker-input {
      border: none;
      outline: none;
      margin-left: -4px;
      flex-shrink: 0;
    }

    .lew-color-value-input {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      background-color: transparent;
      padding-left: 8px;
      color: var(--lew-text-color-1);
    }
  }

  .lew-color-picker-size-small {
    height: var(--lew-form-item-height-small);
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-small);
    line-height: var(--lew-form-input-line-height-small);

    .lew-color-picker-input {
      width: calc(var(--lew-form-item-height-small) - 12px);
      height: calc(var(--lew-form-item-height-small) - 12px);
    }

    .lew-color-value-input {
      font-size: var(--lew-form-font-size-small);
    }
  }

  .lew-color-picker-size-medium {
    height: var(--lew-form-item-height-medium);
    padding: var(--lew-form-input-padding-medium);
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);

    .lew-color-picker-input {
      width: calc(var(--lew-form-item-height-medium) - 12px);
      height: calc(var(--lew-form-item-height-medium) - 12px);
    }

    .lew-color-value-input {
      font-size: var(--lew-form-font-size-medium);
    }
  }

  .lew-color-picker-size-large {
    height: var(--lew-form-item-height-large);
    padding: var(--lew-form-input-padding-large);
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);

    .lew-color-picker-input {
      width: calc(var(--lew-form-item-height-large) - 12px);
      height: calc(var(--lew-form-item-height-large) - 12px);
    }

    .lew-color-value-input {
      font-size: var(--lew-form-font-size-large);
    }
  }

  .lew-color-picker:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-color-picker:active {
    background-color: var(--lew-form-bgcolor-active);
  }

  .lew-color-picker-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  }

  .lew-color-picker-focus:hover {
    background-color: var(--lew-form-bgcolor-focus-hover);
  }

  .lew-color-picker-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  .lew-color-picker-readonly {
    pointer-events: none;
  }
}
</style>
