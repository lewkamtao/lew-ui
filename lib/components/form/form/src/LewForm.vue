<script setup lang="ts">
import type { LewFormOption } from 'lew-ui/types'
import { Parser } from 'expr-eval'
import {
  any2px,
  formatFormByMap,
  getFormItemRequired,
  object2class,
  retrieveNestedFieldValue,
} from 'lew-ui/utils'
import * as Yup from 'yup'
import { formEmits } from './emits'
import LewFormItem from './LewFormItem.vue'
import LewGetLabelWidth from './LewGetLabelWidth.vue'
import { formProps } from './props'

const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const formMap = ref<Record<string, any>>({})
const formLabelRef = ref()
const autoLabelWidth = ref(0)
const componentOptions = ref<LewFormOption[]>(props.options)
const formItemRefMap = ref<Record<string, any>>({})
const parser = new Parser()

function normalizeProp(
  value: string | boolean | ((formData: Record<string, any>) => boolean) | undefined,
) {
  return (formData: Record<string, any>) => {
    if (typeof value === 'function') {
      return value(formData)
    }
    if (typeof value === 'string') {
      try {
        return Boolean(parser.evaluate(value, formData))
      }
      catch {
        return false
      }
    }
    return Boolean(value)
  }
}

const formSchema = computed(() => {
  const schemaMap = componentOptions.value.reduce<Record<string, any>>((acc, item) => {
    if (item.field && item.rule) {
      acc[item.field]
        = typeof item.rule === 'string'
          ? new Function('Yup', `return ${item.rule}`)(Yup)
          : item.rule
    }
    return acc
  }, {})

  return Yup.object().shape(schemaMap)
})

const getFormClassNames = computed(() => object2class('lew-form', {}))

const getDynamicGridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Number(props.columns)}, minmax(0, 1fr))`,
}))

function getForm() {
  let formData: Record<string, any> = formatFormByMap(toRaw(formMap.value))
  componentOptions.value.forEach((item) => {
    if (item.outputFormat && item.field && formData[item.field]) {
      const _value = item.outputFormat({ item, value: formData[item.field] })
      if (typeof _value === 'object' && !Array.isArray(_value)) {
        delete formData[item.field]
        formData = { ...formData, ..._value }
      }
      else {
        formData[item.field] = _value
      }
    }
  })
  return formData
}

function setForm(value: any = {}) {
  componentOptions.value.forEach((item) => {
    if (!item.field)
      return
    let v = retrieveNestedFieldValue(value, item.field)
    if (item.inputFormat) {
      v = item.inputFormat({ item, value: v })
    }
    resetFieldError(item.field, true)
    formMap.value[item.field] = v
  })
}

function resetError() {
  componentOptions.value.forEach(item => item.field && resetFieldError(item.field))
}

function resetFieldError(field: string, ignore = false) {
  const ref = formItemRefMap.value[field]
  if (!ref)
    return
  ref.setIgnoreValidate(ignore)
  ref.setError('')
}

function validate() {
  return new Promise<boolean>((resolve) => {
    Object.keys(formItemRefMap.value).forEach(key => resetFieldError(key, false))

    formSchema.value
      .validate(formMap.value, { abortEarly: false })
      .then(() => resolve(true))
      .catch((error: any) => {
        for (const item of error?.inner || []) {
          const path = item.path.replace(/^\["?|"?\]$/g, '')
          formItemRefMap.value[path]?.setError(item.message)
        }
        resolve(false)
      })
  })
}

onMounted(() => {
  autoLabelWidth.value = formLabelRef.value?.getWidth()
  emit('mounted')
})

provide('formMethods', props.formMethods)
provide('formSchema', formSchema)
provide('formData', formMap)

watch(
  () => props.size,
  () => nextTick(() => (autoLabelWidth.value = formLabelRef.value?.getWidth())),
)

const GAP_MAP = {
  small: '24px',
  medium: '26px',
  large: '28px',
}

const getFormStyle = computed(() => ({
  width: any2px(props.width),
  minWidth: '320px',
  gap: GAP_MAP[props.size],
  ...getDynamicGridStyle.value,
}))

const getLabelWidth = computed(() =>
  any2px(
    props.labelWidth === 'auto'
      ? autoLabelWidth.value || props.labelWidth
      : props.labelWidth,
  ),
)

function setItemRef(field: string, el: any) {
  formItemRefMap.value[field] = el
}

defineExpose({ getForm, setForm, resetError, validate })
</script>

<template>
  <div class="lew-form" :style="getFormStyle" :class="getFormClassNames">
    <LewGetLabelWidth ref="formLabelRef" :size="size" :options="componentOptions" />
    <LewFormItem
      v-for="item in componentOptions"
      :ref="(el: any) => setItemRef(item.field, el)"
      :key="item.field"
      v-model="formMap[item.field]"
      v-bind="{
        direction,
        size,
        labelWidth: getLabelWidth,
        ...item,
        disabled: item.disabled ? normalizeProp(item.disabled) : () => Boolean(disabled),
        readonly: item.readonly ? normalizeProp(item.readonly) : () => Boolean(readonly),
        visible: item.visible === undefined ? () => true : normalizeProp(item.visible),
        required: getFormItemRequired(item),
      }"
      @change="() => emit('change', getForm())"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-form {
  width: 100%;
  display: grid;
  flex-shrink: 0;
}
</style>
