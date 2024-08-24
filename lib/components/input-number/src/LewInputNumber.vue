<script setup lang="ts">
import { object2class, any2px } from 'lew-ui/utils'
import { LewTooltip } from 'lew-ui'
import { inputNumberProps } from './props'

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const emit = defineEmits(['blur', 'focus', 'change', 'input'])

const props = defineProps(inputNumberProps)
const modelValue: Ref<number | undefined> = defineModel({ required: true })
const lewInputRef = ref()
const isFocus = ref(false)

const validationMessage = ref('')

const toFocus = () => {
  lewInputRef.value?.focus()
}

const focus = (e: any) => {
  if (props.selectByFocus) {
    e?.currentTarget?.select()
  }
  emit('focus')
}

const blur = () => {
  emit('blur', modelValue)
}

const inputFn = (e: any) => {
  validationMessage.value = lewInputRef.value.validationMessage
  emit('input', modelValue.value, e)
}

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, align } = props
  return object2class('lew-input-number-view', {
    focus: isFocus.value,
    size,
    readonly,
    disabled,
    align
  })
})

const changeFn = () => {
  emit('change', modelValue.value)
}

const getInputNumberStyle: any = computed(() => {
  const { size, align } = props
  return {
    textAlign: align,
    padding: `var(--lew-form-input-padding-${size})`,
    fontSize: `var(--lew-form-font-size-${size})`,
    height: `var(--lew-form-item-height-${size})`,
    lineHeight: `var(--lew-form-input-line-height-${size})`
  }
})

const getIconSize = computed(() => {
  const { size } = props
  const sizeMap: Record<string, number> = {
    small: 12,
    medium: 14,
    large: 16
  }
  return `${sizeMap[size]}px`
})

const getControlStyle = computed(() => {
  const { size } = props
  return {
    height: `var(--lew-form-item-height-${size})`
  }
})

let longClickTimer = ref()

const clearTimer = () => {
  clearInterval(longClickTimer.value)
}

const plus = () => {
  lewInputRef.value.stepUp()
  modelValue.value = lewInputRef.value.value
  longClickTimer.value = setTimeout(() => {
    longClickTimer.value = setInterval(() => {
      lewInputRef.value.stepUp()
      modelValue.value = lewInputRef.value.value
      if (props.max !== '' && lewInputRef.value.value >= Number(props.max || 0)) {
        clearTimer()
      }
    }, 80)
  }, 250)
}
const minus = () => {
  lewInputRef.value.stepDown()
  modelValue.value = lewInputRef.value.value
  longClickTimer.value = setTimeout(() => {
    longClickTimer.value = setInterval(() => {
      lewInputRef.value.stepDown()
      modelValue.value = lewInputRef.value.value
      if (props.min !== '' && lewInputRef.value.value <= Number(props.min || 0)) {
        clearTimer()
      }
    }, 80)
  }, 250)
}

const checkValidationMessage = () => {
  validationMessage.value = lewInputRef.value.validationMessage
  return (validationMessage.value || '').length === 0
}

const validCheck = () => {
  return ((lewInputRef.value && lewInputRef.value.validationMessage) || '').length === 0
}

defineExpose({ toFocus, validCheck })
</script>

<template>
  <div
    @wheel="(e) => e.preventDefault()"
    @mouseenter="checkValidationMessage"
    @mouseleave="validationMessage = ''"
    class="lew-input-number-view"
    :class="getInputClassNames"
    :style="{ width: any2px(width) }"
  >
    <input
      v-tooltip="{
        content: validationMessage,
        triggerFrom: 'input-number'
      }"
      title=""
      type="number"
      ref="lewInputRef"
      v-model="modelValue"
      class="lew-input-number"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :style="getInputNumberStyle"
      @input="inputFn"
      @change="changeFn"
      @blur="blur"
      @focus="focus"
    />
    <lew-flex
      @mouseenter="isFocus = true"
      @mouseleave="isFocus = false"
      :style="getControlStyle"
      direction="y"
      x="end"
      gap="2px"
      class="lew-input-number-control"
    >
      <lew-icon
        @mousedown="plus"
        @mouseup="clearTimer"
        @mouseleave="clearTimer"
        class="lew-input-number-icon"
        :size="getIconSize"
        type="chevron-up"
      ></lew-icon>
      <lew-icon
        @mousedown="minus"
        @mouseup="clearTimer"
        @mouseleave="clearTimer"
        class="lew-input-number-icon"
        :size="getIconSize"
        type="chevron-down"
      ></lew-icon>
    </lew-flex>
  </div>
</template>

<style lang="scss" scoped>
.lew-input-number-view {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  transition: var(--lew-form-transition-ease);
  box-sizing: border-box;
  outline: 0px var(--lew-form-border-color) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  box-shadow: var(--lew-form-box-shadow);
  overflow: hidden;

  .lew-input-number {
    width: calc(100% - 30px);
    text-overflow: ellipsis;
    border: none;
    background: none;
    color: var(--lew-text-color-1);
    outline: none;
    box-sizing: border-box;
    overflow: hidden;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  .lew-input-number:invalid {
    text-decoration: line-through;
  }

  .lew-input-number::placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-input-number-control {
    width: 30px;
    height: 100%;
    user-select: none;
    padding-right: 2px;

    .lew-input-number-icon {
      padding: 0px 6px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.1s;
      transform: scale(1);
    }

    .lew-input-number-icon:active {
      transform: scale(0.95);
    }
  }
}

.lew-input-number-view:hover {
  background-color: var(--lew-form-bgcolor-hover);

  .lew-input-number-control {
    .lew-input-number-icon {
      background-color: var(--lew-bgcolor-2);
    }
  }
}

.lew-input-number-view:focus-within {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-outline);
  background-color: var(--lew-form-bgcolor-focus);

  .lew-input-number-control {
    .lew-input-number-icon {
      background-color: var(--lew-bgcolor-3);
    }
  }
}

.lew-input-number-view-focus {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-outline);
  background-color: var(--lew-form-bgcolor-focus) !important;

  .lew-input-number-control {
    .lew-input-number-icon {
      background-color: var(--lew-bgcolor-3) !important;
    }
  }
}

.lew-input-number-view-readonly {
  pointer-events: none;
}

.lew-input-number-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}
</style>
