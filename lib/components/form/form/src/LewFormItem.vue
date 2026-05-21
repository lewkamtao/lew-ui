<script setup lang="ts">
import type { LewFormItemAs } from 'lew-ui/types'
import { useDebounceFn } from '@vueuse/core'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { LewCascader } from 'lew-ui/components/form/cascader'
import { LewCheckbox, LewCheckboxGroup } from 'lew-ui/components/form/checkbox'
import { LewColorPicker } from 'lew-ui/components/form/color-picker'
import { LewDatePicker } from 'lew-ui/components/form/date-picker'
import { LewDateRangePicker } from 'lew-ui/components/form/date-range-picker'
import { LewInput } from 'lew-ui/components/form/input'
import { LewInputNumber } from 'lew-ui/components/form/input-number'
import { LewInputTag } from 'lew-ui/components/form/input-tag'
import { LewRadioGroup } from 'lew-ui/components/form/radio'
import { LewRate } from 'lew-ui/components/form/rate'
import { LewSelect } from 'lew-ui/components/form/select'
import { LewSlider } from 'lew-ui/components/form/slider'
import { LewSliderRange } from 'lew-ui/components/form/slider-range'
import { LewSwitch } from 'lew-ui/components/form/switch'
import { LewTabs } from 'lew-ui/components/form/tabs'
import { LewTextarea } from 'lew-ui/components/form/textarea'
import { LewTreeSelect } from 'lew-ui/components/form/tree-select'
import { LewUpload } from 'lew-ui/components/form/upload'
import { LewButton } from 'lew-ui/components/general/button'
import { LewTooltip } from 'lew-ui/directives/tooltip'
import { any2px, object2class } from 'lew-ui/utils'
import { formItemEmits } from './emits'
import { formItemProps, requiredIconSizeMap, tipsIconSizeMap } from './props'
import RequiredIcon from './RequiredIcon.vue'

const props = defineProps(formItemProps)
const emit = defineEmits(formItemEmits)

const formSchema = inject<any>('formSchema', ref(null))
const formData = inject<Ref<Record<string, any>>>('formData', ref({}))

const asMap: Record<LewFormItemAs, Component> = {
  'input': LewInput,
  'textarea': LewTextarea,
  'input-tag': LewInputTag,
  'checkbox-group': LewCheckboxGroup,
  'radio-group': LewRadioGroup,
  'checkbox': LewCheckbox,
  'select': LewSelect,
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

const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip'))
  app.use(LewTooltip)

const getFormItemClassNames = computed(() =>
  object2class('lew-form-item', {
    direction: props.direction,
    size: props.size,
  }),
)

const formItemRef = ref<HTMLElement | null>(null)
const modelValue: Ref<any> = defineModel({ default: undefined })
const ignoreValidate = ref(false)
const errMsg = ref('')
const itemWidth = ref<number | null>(null)

// 设置是否忽略校验
function setIgnoreValidate(val: boolean) {
  ignoreValidate.value = val
}

function validate() {
  if (ignoreValidate.value) {
    return
  }

  if (!props.required && !modelValue.value) {
    errMsg.value = ''
    return
  }

  if (!formSchema.value || !props.field) {
    errMsg.value = ''
    return
  }

  if (typeof formSchema.value.validateAt !== 'function') {
    errMsg.value = ''
    return
  }

  const schema = formSchema.value
  const field = props.field
  const data = formData.value

  schema
    .validateAt(field, data)
    .then(() => {
      errMsg.value = ''
    })
    .catch((e: any) => {
      if (e.message && e.message.includes('does not contain the path')) {
        errMsg.value = ''
      }
      else {
        errMsg.value = e.message || ''
      }
    })
}

const debouncedValidate = useDebounceFn(validate, 120)

function setError(msg: any) {
  errMsg.value = msg || ''
}

function change(val: any) {
  if (!ignoreValidate.value) {
    debouncedValidate()
  }
  else {
    ignoreValidate.value = false
  }
  emit('change', { value: val, field: props.field, label: props.label })
}

watch(
  () => modelValue.value,
  () => {
    debouncedValidate()
  },
)

function updateItemWidth() {
  if (formItemRef.value && props.direction === 'x') {
    itemWidth.value = (formItemRef.value as HTMLElement).offsetWidth
  }
}

const getFormItemMainStyle = computed(() => {
  if (props.direction !== 'x') {
    return {
      width: '100%',
      justifyContent: 'flex-start',
    }
  }

  if (itemWidth.value === null) {
    nextTick(updateItemWidth)
    return {
      width: '100%',
      justifyContent: props.between ? 'flex-end' : 'flex-start',
    }
  }

  return {
    width: `calc(${itemWidth.value}px - ${any2px(props.labelWidth)} - 10px)`,
    justifyContent: props.between ? 'flex-end' : 'flex-start',
  }
})

const getDynamicProps = computed(() => {
  if (typeof props.props === 'function') {
    return props.props(formData.value)
  }
  return props.props || {}
})

const isVisible = computed(() => {
  if (typeof props.visible === 'function') {
    return props.visible(formData.value)
  }
  return props.visible !== false
})

const isDisabled = computed(() => {
  if (typeof props.disabled === 'function') {
    return props.disabled(formData.value)
  }
  return Boolean(props.disabled)
})

const isReadonly = computed(() => {
  if (typeof props.readonly === 'function') {
    return props.readonly(formData.value)
  }
  return Boolean(props.readonly)
})

watch(
  () => [props.direction, props.labelWidth, props.between],
  () => {
    if (props.direction === 'x') {
      nextTick(updateItemWidth)
    }
  },
)

watch(
  () => formData.value,
  () => {
    if (props.direction === 'x') {
      nextTick(updateItemWidth)
    }
  },
  { deep: true },
)

onMounted(() => {
  if (props.direction === 'x') {
    nextTick(updateItemWidth)
  }
})

defineExpose({ validate, setError, setIgnoreValidate })
</script>

<template>
  <div
    v-if="isVisible"
    ref="formItemRef"
    class="lew-form-item"
    :class="getFormItemClassNames"
    :style="{
      'grid-area': gridArea,
    }"
  >
    <div
      :style="direction === 'x' ? { width: any2px(labelWidth) } : {}"
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
          readonly: isReadonly,
          disabled: isDisabled,
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
        <div v-if="errMsg" class="lew-error-message">
          {{ errMsg }}
        </div>
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
    width: 100%;
    font-size: 12px;
    transition: all 0.1s;
    transform: translateY(calc(100% + 2px));
    color: var(--lew-color-error-dark);
    white-space: normal;
    word-wrap: break-word;
    word-break: break-word;
    line-height: 1.5;
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
