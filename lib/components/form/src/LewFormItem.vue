<script setup lang="ts">
import { any2px, object2class } from 'lew-ui/utils'
import RequiredIcon from './RequiredIcon.vue'
import {
  LewInput,
  LewTextTrim,
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
  LewInputNumber,
  LewTooltip,
  LewSlider,
  LewSliderRange,
  LewColorPicker,
  LewRate
} from 'lew-ui'
import { debounce, cloneDeep, isString, merge } from 'lodash-es'
import * as Yup from 'yup'
import {
  formItemProps,
  requiredIconSizeMap,
  formTypeAsMap,
  tipsIconSizeMap
} from './props'
import Icon from 'lew-ui/utils/Icon.vue'

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
  'input-number': LewInputNumber,
  slider: LewSlider,
  'slider-range': LewSliderRange,
  'color-picker': LewColorPicker,
  rate: LewRate
}
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
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
    if (!ignoreValidate.value) {
      validateField()
    } else {
      ignoreValidate.value = false
    }
  },
  {
    deep: true
  }
)

const ignoreValidate = ref(false)

const setIgnoreValidate = (value: boolean) => {
  ignoreValidate.value = value
}

const validateField = debounce(() => {
  validate()
}, 120)

const errMsg = ref('')

const validate = () => {
  if (!curRequired.value && !modelValue.value) {
    errMsg.value = ''
    return
  }
  if (curRule.value) {
    curRule.value
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

const getRequiredRuleByMap = (as: string) => {
  const type = formTypeAsMap[as]
  switch (type) {
    case 'string':
      return Yup.string().required('此项必填')
    case 'array':
      return Yup.array().min(1, '至少选择一个').required('此项必填')
    case 'number':
      return Yup.number().required('此项必填')
    case 'boolean':
      return Yup.boolean().oneOf([true], '此项必填').required('此项必填')
    default:
      return Yup.mixed().required('此项必填')
  }
}

const curRule = computed(() => {
  const { rule, required, as } = props
  let _rule
  try {
    _rule = isString(rule) ? eval(rule) : rule
  } catch {
    _rule = null
  }
  if (required) {
    if (!_rule) {
      return getRequiredRuleByMap(as)
    } else if (_rule?.spec?.optional === true) {
      return merge(_rule, getRequiredRuleByMap(as))
    }
  }
  return _rule
})

const curRequired = computed(() => {
  const { rule, required } = props
  let _rule
  try {
    _rule = isString(rule) ? eval(rule) : rule
  } catch {
    _rule = null
  }
  if (!required) return _rule?.spec?.optional === false
  return required
})

const getFormItemMainStyle = computed(() => {
  if (!formItemRef.value) return {}
  const { direction, labelWidth, between } = props
  const { offsetWidth } = formItemRef.value
  return {
    width:
      direction === 'x'
        ? `calc(${offsetWidth}px - ${any2px(labelWidth)} - 10px)`
        : '100%',
    justifyContent: direction === 'x' && between ? 'flex-end' : 'flex-start'
  }
})

defineExpose({ validate, setError, curRule, setIgnoreValidate })
</script>

<template>
  <div
    class="lew-form-item"
    ref="formItemRef"
    :class="getFormItemClassNames"
    :style="{
      'grid-area': gridArea
    }"
  >
    <div
      :style="direction === 'x' ? `width:${any2px(labelWidth)}` : ''"
      class="lew-label-box-wrapper"
    >
      <div class="lew-label-box" v-if="as">
        <RequiredIcon
          :size="requiredIconSizeMap[size]"
          v-if="curRequired && label"
        />
        {{ label }}
        <Icon
          style="margin-top: 1px"
          v-if="tips"
          v-tooltip="{
            content: tips
          }"
          :size="tipsIconSizeMap[size]"
          type="normal"
          color="black"
        ></Icon>
      </div>
    </div>
    <div
      class="lew-form-item-main"
      :style="getFormItemMainStyle"
      :class="{ 'lew-form-item-error': errMsg }"
    >
      <component
        :is="asMap[as]"
        v-model="modelValue"
        v-bind="{
          size,
          readonly,
          disabled,
          ...props.props,
          width: ['input-number', 'tabs'].includes(as) ? undefined : '100%'
        }"
        @change="change"
      />
      <transition name="lew-slide-fade">
        <lew-text-trim
          v-if="errMsg"
          style="width: 100%"
          :text="errMsg"
          class="lew-error-message"
        >
        </lew-text-trim>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-form-item {
  transition: opacity 0.25s;
  .lew-label-box-wrapper {
    transition: all 0.25s;
    .lew-label-box {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
  }
}

.lew-form-item-size-small {
  .lew-label-box-wrapper {
    font-size: var(--lew-form-font-size-small);
    margin-top: 7px;
  }

  .lew-form-item-main {
    min-height: var(--lew-form-item-height-small);
  }
}

.lew-form-item-size-medium {
  .lew-label-box-wrapper {
    font-size: var(--lew-form-font-size-medium);
    margin-top: 8px;
  }

  .lew-form-item-main {
    min-height: var(--lew-form-item-height-medium);
  }
}

.lew-form-item-size-large {
  .lew-label-box-wrapper {
    font-size: var(--lew-form-font-size-large);
    margin-top: 9px;
  }

  .lew-form-item-main {
    min-height: var(--lew-form-item-height-large);
  }
}
.lew-form-item-main {
  display: flex;
  align-items: center;
}
.lew-label-tips {
  cursor: pointer;
  border-bottom: 2px dashed var(--lew-color-blue);
}
.lew-form-item-direction-x {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  .lew-label-box-wrapper {
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

  .lew-label-box-wrapper {
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
  .lew-error-message {
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
}

.lew-slide-fade-leave-active,
.lew-slide-fade-enter-active {
  transition: all 0.15s ease;
}

.lew-slide-fade-enter-from,
.lew-slide-fade-leave-to {
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
