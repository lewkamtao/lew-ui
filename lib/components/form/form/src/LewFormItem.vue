<script setup lang="ts">
import type { LewFormItemAs } from 'lew-ui/types'
import {
  LewButton,
  LewCascader,
  LewCheckbox,
  LewCheckboxGroup,
  LewColorPicker,
  LewDatePicker,
  LewDateRangePicker,
  LewInput,
  LewInputNumber,
  LewInputTag,
  LewRadioGroup,
  LewRate,
  LewSelect,
  LewSelectMultiple,
  LewSlider,
  LewSliderRange,
  LewSwitch,
  LewTabs,
  LewTextarea,
  LewTextTrim,
  LewTooltip,
  LewTreeSelect,
  LewUpload,
} from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { debounce } from 'lodash-es'
import { formItemEmits } from './emits'
import { formItemProps, requiredIconSizeMap, tipsIconSizeMap } from './props'
import RequiredIcon from './RequiredIcon.vue'

const props = defineProps(formItemProps)
const emit = defineEmits(formItemEmits)

const formSchema = inject<any>('formSchema', ref(null))
const formData = inject<Ref<Record<string, any>>>('formData', ref({}))
const formUpdateKey = inject<Ref<number>>('formUpdateKey', ref(0))

const asMap: Record<LewFormItemAs, Component> = {
  'input': LewInput,
  'textarea': LewTextarea,
  'input-tag': LewInputTag,
  'checkbox-group': LewCheckboxGroup,
  'radio-group': LewRadioGroup,
  'checkbox': LewCheckbox,
  'select': LewSelect,
  'select-multiple': LewSelectMultiple,
  'date-picker': LewDatePicker,
  'date-range-picker': LewDateRangePicker,
  'tabs': LewTabs,
  'cascader': LewCascader,
  'switch': LewSwitch,
  'button': LewButton,
  'upload': LewUpload,
  'input-number': LewInputNumber,
  'slider': LewSlider,
  'slider-range': LewSliderRange,
  'color-picker': LewColorPicker,
  'rate': LewRate,
  'tree-select': LewTreeSelect,
}

// 自动注册 tooltip 指令
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip'))
  app.use(LewTooltip)

const getFormItemClassNames = computed(() =>
  object2class('lew-form-item', {
    direction: props.direction,
    size: props.size,
  }),
)

const formItemRef = ref()
const modelValue: Ref<any> = defineModel({ default: undefined })
const ignoreValidate = ref(false)
const errMsg = ref('')

// 设置是否忽略校验
function setIgnoreValidate(val: boolean) {
  ignoreValidate.value = val
}

// 简化校验逻辑
function validate() {
  if (!props.required && !modelValue.value) {
    errMsg.value = ''
    return
  }

  // 检查是否有有效的 schema 和 field
  if (!formSchema.value || !props.field) {
    errMsg.value = ''
    return
  }

  // 检查 schema 是否有 validateAt 方法
  if (typeof formSchema.value.validateAt !== 'function') {
    errMsg.value = ''
    return
  }

  // 检查 field 是否存在于 schema 中
  try {
    // 尝试获取 schema 中的字段定义来检查是否存在
    const fieldExists = formSchema.value.fields && formSchema.value.fields[props.field]
    if (!fieldExists && !formSchema.value.fields) {
      // 如果没有 fields 属性，尝试直接验证，如果失败则忽略
      formSchema.value
        .validateAt(props.field, formData.value)
        .then(() => (errMsg.value = ''))
        .catch((e: any) => {
          // 如果是路径不存在的错误，忽略验证
          if (e.message && e.message.includes('does not contain the path')) {
            errMsg.value = ''
          }
          else {
            errMsg.value = e.message
          }
        })
    }
    else if (fieldExists) {
      // 字段存在，正常验证
      formSchema.value
        .validateAt(props.field, formData.value)
        .then(() => (errMsg.value = ''))
        .catch((e: any) => (errMsg.value = e.message))
    }
    else {
      // 字段不存在，清除错误信息
      errMsg.value = ''
    }
  }
  catch {
    // 如果验证过程中出现任何错误，清除错误信息
    errMsg.value = ''
  }
}

// 防抖校验 - 统一使用一个防抖函数
const debouncedValidate = debounce(() => {
  if (!ignoreValidate.value) {
    validate()
  }
  else {
    ignoreValidate.value = false
  }
}, 120)

function setError(msg: any) {
  errMsg.value = msg
}

function change(val: any) {
  debouncedValidate()
  emit('change', { value: val, field: props.field, label: props.label })
}

watch(() => modelValue.value, debouncedValidate, { deep: true })

const getFormItemMainStyle = computed(() => {
  if (!formItemRef.value)
    return {}
  const { direction, labelWidth, between } = props
  const { offsetWidth } = formItemRef.value
  return {
    width:
      direction === 'x'
        ? `calc(${offsetWidth}px - ${any2px(labelWidth)} - 10px)`
        : '100%',
    justifyContent: direction === 'x' && between ? 'flex-end' : 'flex-start',
  }
})

// 联动控制逻辑
const getVisible = computed(() => {
  if (typeof props.visible === 'function') {
    return props.visible(formData.value)
  }
  return props.visible
})

const getDisabled = computed(() => {
  if (typeof props.disabled === 'function') {
    return props.disabled(formData.value)
  }
  return props.disabled
})

const getReadonly = computed(() => {
  if (typeof props.readonly === 'function') {
    return props.readonly(formData.value)
  }
  return props.readonly
})

const getDynamicProps = computed(() => {
  if (typeof props.props === 'function') {
    return props.props(formData.value)
  }
  return props.props
})

// 监听表单数据变化，触发联动更新
watchEffect(() => {
  // 当 formUpdateKey 或 formData 变化时，重新计算联动属性
  const _updateKey = formUpdateKey.value
  const _formData = formData.value
  // 这些变量用于触发响应式更新，不需要实际使用
  void _updateKey
  void _formData
})

defineExpose({ validate, setError, setIgnoreValidate })
</script>

<template>
  <div
    v-if="getVisible"
    ref="formItemRef"
    class="lew-form-item"
    :class="getFormItemClassNames"
    :style="{
      'grid-area': gridArea,
    }"
  >
    <div
      :style="direction === 'x' ? `width:${any2px(labelWidth)}` : ''"
      class="lew-label-box-wrapper"
    >
      <div v-if="as" class="lew-label-box">
        <RequiredIcon v-if="required && label" :size="requiredIconSizeMap[size]" />
        {{ label }}
        <CommonIcon
          v-if="tips"
          v-tooltip="{
            content: tips,
          }"
          style="margin-top: 1px"
          :size="tipsIconSizeMap[size]"
          type="normal"
        />
      </div>
    </div>
    <div
      class="lew-form-item-main"
      :style="getFormItemMainStyle"
      :class="{ 'lew-form-item-error': errMsg }"
    >
      <component
        :is="as ? asMap[as] : null"
        v-model="modelValue"
        v-bind="{
          size,
          readonly: getReadonly,
          disabled: getDisabled,
          ...getDynamicProps,
          width:
            as && ['input-number', 'tabs', 'button'].includes(as)
              ? getDynamicProps.width
              : '100%',
          popoverWidth: as && ['select'].includes(as) ? '100%' : undefined,
        }"
        @change="change"
      />
      <transition name="lew-slide-fade">
        <LewTextTrim
          v-if="errMsg"
          style="width: 100%"
          :text="errMsg"
          class="lew-error-message"
        />
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
  border-bottom: 2px dashed var(--lew-color-primary);
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
