<script setup lang="ts">
import { any2px, object2class } from 'lew-ui/utils'
import RequiredIcon from './RequiredIcon.vue'
import {
  LewInput,
  LewTextarea,
  LewInputTag,
  LewCheckboxGroup,
  LewRadioGroup,
  LewCheckbox,
  LewSelect,
  LewSelectMultiple,
  LewDatePicker,
  LewDateRangePicker,
  LewTabs,
  LewCascader,
  LewSwitch,
  LewButton,
  LewUpload,
  LewInputNumber
} from 'lew-ui'
import { debounce, cloneDeep } from 'lodash-es'

import { formItemProps, requiredIconSizeMap } from './props'

const asMap: Record<string, any> = {
  input: LewInput,
  textarea: LewTextarea,
  'input-tag': LewInputTag,
  'checkbox-group': LewCheckboxGroup,
  'radio-group': LewRadioGroup,
  checkbox: LewCheckbox,
  select: LewSelect,
  'select-multiple': LewSelectMultiple,
  'date-picker': LewDatePicker,
  'date-range-picker': LewDateRangePicker,
  tabs: LewTabs,
  cascader: LewCascader,
  switch: LewSwitch,
  button: LewButton,
  upload: LewUpload,
  'input-number': LewInputNumber
}

const getFormItemClassNames = computed(() => {
  const { direction, size } = cloneDeep(props)
  return object2class('lew-form-item', { direction, size })
})

const formItemRef = ref()

const props = defineProps(formItemProps)

const modelValue: Ref<any> = defineModel({
  default: undefined
})

watch(
  () => modelValue.value,
  () => {
    validateField()
  },
  {
    deep: true
  }
)

const validateField = debounce(() => {
  validate()
}, 50)

const errMsg = ref('')

const validate = () => {
  if (!props.required && !modelValue.value) {
    errMsg.value = ''
    return
  }
  if (props.rule) {
    props.rule
      .validate(modelValue.value)
      .then(() => {
        errMsg.value = ''
      })
      .catch((error: any) => {
        errMsg.value = error.message
      })
  }
}

const setError = (message: any) => {
  errMsg.value = message
}

const emit = defineEmits(['change'])

const change = () => {
  const { field, label } = props
  emit('change', cloneDeep({ value: modelValue.value, field, label }))
}

defineExpose({ validate, setError })
</script>

<template>
  <div
    class="lew-form-item"
    ref="formItemRef"
    :class="getFormItemClassNames"
    :style="{
      'grid-area': gridArea || ''
    }"
  >
    <div
      :style="direction === 'x' ? `width:${any2px(labelWidth)}` : ''"
      class="label-box-wrapper"
    >
      <div
        class="label-box"
        v-tooltip="{
          content: tips
        }"
        v-if="as"
        :class="{ 'label-tips': tips }"
      >
        <RequiredIcon
          :size="requiredIconSizeMap[size]"
          v-if="required && label"
        />
        {{ label }}
      </div>
    </div>
    <div
      class="lew-form-item-main"
      :style="{
        width:
          direction === 'x'
            ? `calc(${formItemRef?.offsetWidth}px - ${any2px(labelWidth)} - 10px)`
            : '100%',
        justifyContent: direction === 'x' && between ? 'flex-end' : 'flex-start'
      }"
      :class="{ 'lew-form-item-error': errMsg }"
    >
      <component
        :is="asMap[as]"
        v-model="modelValue"
        v-bind="{ size, readonly, disabled, ...props.props }"
        @change="change"
      />
      <transition name="slide-fade">
        <lew-text-trim
          style="width: 100%"
          :text="errMsg"
          v-if="errMsg"
          class="error-message"
        >
        </lew-text-trim>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-form-item {
  transition: opacity 0.25s;
  .label-box-wrapper {
    transition: all 0.25s;
    .label-box {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
  }
}

.lew-form-item-size-small {
  .label-box-wrapper {
    font-size: var(--lew-form-font-size-small);
    margin-top: 6px;
  }

  .lew-form-item-main {
    min-height: calc(var(--lew-form-item-height-small) + 2px);
  }
}

.lew-form-item-size-medium {
  .label-box-wrapper {
    font-size: var(--lew-form-font-size-medium);
    margin-top: 8px;
  }

  .lew-form-item-main {
    min-height: calc(var(--lew-form-item-height-medium) + 2px);
  }
}

.lew-form-item-size-large {
  .label-box-wrapper {
    font-size: var(--lew-form-font-size-large);
    margin-top: 10px;
  }

  .lew-form-item-main {
    min-height: calc(var(--lew-form-item-height-large) + 2px);
  }
}
.lew-form-item-main {
  display: flex;
  align-items: center;
}
.label-tips {
  cursor: pointer;
  border-bottom: 2px dashed var(--lew-color-blue);
}
.lew-form-item-direction-x {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  .label-box-wrapper {
    display: inline-flex;
    justify-content: flex-end;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .lew-form-item-main {
    flex: 1;
  }
}

.lew-form-item-direction-y {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;

  .label-box-wrapper {
    display: inline-flex;
    justify-content: flex-start;
    box-sizing: border-box;
    margin-top: 0px;
    white-space: nowrap;
  }
}
.lew-form-item {
  .lew-form-item-main {
    position: relative;
  }
  .error-message {
    position: absolute;
    left: 0px;
    bottom: 0px;
    font-size: 12px;
    transition: all 0.1s;
    transform: translateY(calc(100% + 2px));
    color: var(--lew-color-error-dark);
  }
}

.lew-form-item-error {
  --lew-form-border-color-focus: var(--lew-color-error-dark);
  --lew-radio-border-color-hover: var(--lew-color-error);
  --lew-checkbox-border-color-hover: var(--lew-color-error);
  --lew-checkbox-color: var(--lew-color-error);
  --lew-checkbox-color: var(--lew-color-error-dark);
  --lew-checkbox-color-light: var(--lew-color-error-light);
  --lew-radio-color: var(--lew-color-error);
  --lew-radio-color: var(--lew-color-error-dark);
  --lew-radio-color-light: var(--lew-color-error-light);
  --lew-form-outline: 0px var(--lew-color-error-light) solid;
}

.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 0.15s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100%) !important;
  opacity: 0;
}

.lew-form-item-readonly {
  pointer-events: none;
}
.lew-form-item-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
  user-select: none;
}
</style>
