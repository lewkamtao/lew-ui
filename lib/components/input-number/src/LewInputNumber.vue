<script setup lang="ts">
import { object2class, any2px } from 'lew-ui/utils'
import { LewTooltip } from 'lew-ui'
import { inputNumberProps } from './props'

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const emit = defineEmits(['clear', 'blur', 'focus', 'change', 'input', 'ok'])

const props = defineProps(inputNumberProps)
const modelValue: Ref<string | undefined> = defineModel({ required: true })
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
  isFocus.value = true
}

const blur = () => {
  emit('blur', modelValue)
  isFocus.value = false
}

const inputFn = (e: any) => {
  validationMessage.value = lewInputRef.value.validationMessage
  emit('input', modelValue.value, e)
}

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, align } = props
  return object2class('lew-input-number-view', {
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
    medium: 13,
    large: 14
  }
  return `${sizeMap[size]}px`
})

defineExpose({ toFocus })
</script>

<template>
  <div class="lew-input-number-view" :class="getInputClassNames" :style="{ width: any2px(width) }">
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
      :readonly="readonly"
      :disabled="disabled"
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
      :style="{
        height: `var(--lew-form-item-height-${size})`
      }"
      direction="y"
      x="end"
      gap="2px"
      class="lew-input-number-control"
    >
      <lew-icon class="lew-input-number-icon" :size="getIconSize" type="plus"></lew-icon>
      <lew-icon class="lew-input-number-icon" :size="getIconSize" type="minus"></lew-icon>
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
  transition: var(--lew-form-transition);
  box-sizing: border-box;
  outline: 0px var(--lew-form-border-color) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
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
    padding-right: 2px;
	user-select: none;
    .lew-input-number-icon {
      padding: 0px 6px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.1s;
    }
    .lew-input-number-icon:hover {
      transform: scale(1.05);
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
  outline: var(--lew-form-ouline);
  background-color: var(--lew-form-bgcolor-focus);
  .lew-input-number-control {
    .lew-input-number-icon {
      background-color: var(--lew-bgcolor-4);
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
