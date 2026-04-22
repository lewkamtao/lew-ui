<script setup lang="ts">
import type { LewFormOption } from 'lew-ui/types'
import { Parser } from 'expr-eval'
import {
  any2px,
  formatFormByMap,
  getFormItemRequired,
  retrieveNestedFieldValue,
} from 'lew-ui/utils'
import { debounce } from 'lodash-es'
import { ref } from 'vue'
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
const formItemRefMap = ref<Record<string, any>>({})
const parser = new Parser()

const componentOptions = computed(() => props.options)

const normalizePropCache = new Map<
  string | boolean | ((formData: Record<string, any>) => boolean),
  (formData: Record<string, any>) => boolean
>()

function normalizeProp(
  value: string | boolean | ((formData: Record<string, any>) => boolean) | undefined,
) {
  if (value === undefined) {
    return () => false
  }

  if (normalizePropCache.has(value)) {
    return normalizePropCache.get(value)!
  }

  const normalized = (formData: Record<string, any>) => {
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

  normalizePropCache.set(value, normalized)
  return normalized
}

let formSchemaCacheKey = ''
let cachedFormSchema: any = null

function createFormSchema(options: LewFormOption[]) {
  const schemaMap = options.reduce<Record<string, any>>((acc, item) => {
    if (item.field && item.rule) {
      acc[item.field]
        = typeof item.rule === 'string'
          ? new Function('Yup', `return ${item.rule}`)(Yup)
          : item.rule
    }
    return acc
  }, {})

  return Yup.object().shape(schemaMap)
}

const formSchema = computed(() => {
  const options = componentOptions.value
  const keyParts: string[] = []

  for (const item of options) {
    if (item.field && item.rule) {
      keyParts.push(
        `${item.field}:${typeof item.rule === 'string' ? item.rule : 'object'}`,
      )
    }
  }

  const currentKey = keyParts.join('|')
  if (currentKey === formSchemaCacheKey && cachedFormSchema) {
    return cachedFormSchema
  }

  const schema = createFormSchema(options)
  formSchemaCacheKey = currentKey
  cachedFormSchema = schema
  return schema
})

const gridTemplateColumns = computed(() => `repeat(${props.columns}, minmax(0, 1fr))`)

function getForm() {
  const formData = formatFormByMap(toRaw(formMap.value))
  const result: Record<string, any> = { ...formData }

  for (const item of componentOptions.value) {
    if (item.outputFormat && item.field && result[item.field] !== undefined) {
      const _value = item.outputFormat({ item, value: result[item.field] })
      if (typeof _value === 'object' && _value !== null && !Array.isArray(_value)) {
        delete result[item.field]
        Object.assign(result, _value)
      }
      else {
        result[item.field] = _value
      }
    }
  }
  return result
}

function setForm(value: any = {}) {
  for (const item of componentOptions.value) {
    if (!item.field)
      continue
    let v = retrieveNestedFieldValue(value, item.field)
    if (item.inputFormat) {
      v = item.inputFormat({ item, value: v })
    }
    resetFieldError(item.field, true)
    formMap.value[item.field] = v
  }
}

function resetError() {
  for (const field of Object.keys(formItemRefMap.value)) {
    resetFieldError(field)
  }
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
    const refMap = formItemRefMap.value

    for (const field of Object.keys(refMap)) {
      resetFieldError(field, false)
    }

    formSchema.value
      .validate(formMap.value, { abortEarly: false })
      .then(() => resolve(true))
      .catch((error: any) => {
        for (const item of error?.inner || []) {
          const path = item.path.replace(/^\["?|"?\]$/g, '')
          refMap[path]?.setError(item.message)
        }
        resolve(false)
      })
  })
}

onMounted(() => {
  if (props.labelWidth === 'auto') {
    autoLabelWidth.value = formLabelRef.value?.getWidth() ?? 0
  }
  emit('mounted')
})

provide('formMethods', props.formMethods)
provide('formSchema', formSchema)
provide('formData', formMap)

watch(
  () => props.size,
  () => {
    if (props.labelWidth === 'auto') {
      nextTick(() => {
        autoLabelWidth.value = formLabelRef.value?.getWidth() ?? 0
      })
    }
  },
  { flush: 'post' },
)

const GAP_MAP: Record<string, string> = {
  small: '24px',
  medium: '26px',
  large: '28px',
}

const getFormStyle = computed(() => ({
  width: any2px(props.width),
  minWidth: '320px',
  gap: GAP_MAP[props.size] || '26px',
  gridTemplateColumns: gridTemplateColumns.value,
}))

const getLabelWidth = computed(() => {
  if (props.labelWidth === 'auto') {
    return any2px(autoLabelWidth.value || 'auto')
  }
  return any2px(props.labelWidth)
})

function setItemRef(field: string, el: any) {
  if (el) {
    formItemRefMap.value[field] = el
  }
  else {
    delete formItemRefMap.value[field]
  }
}

const itemPropsCache = new Map<string, any>()

// 预创建默认函数，避免每次调用 getItemProps 时重复创建
const defaultDisabledFn = () => Boolean(props.disabled)
const defaultReadonlyFn = () => Boolean(props.readonly)
const defaultVisibleFn = () => true

function getItemProps(item: LewFormOption) {
  const fieldKey = item.field || `__index_${componentOptions.value.indexOf(item)}`
  const currentLabelWidth = getLabelWidth.value
  const cacheKeyFull = `${fieldKey}_${props.direction}_${props.size}_${currentLabelWidth}`

  const cached = itemPropsCache.get(cacheKeyFull)
  if (cached) {
    return cached
  }

  const baseProps: any = {
    direction: props.direction,
    size: props.size,
    labelWidth: currentLabelWidth,
    ...item,
    required: getFormItemRequired(item),
    disabled: item.disabled ? normalizeProp(item.disabled) : defaultDisabledFn,
    readonly: item.readonly ? normalizeProp(item.readonly) : defaultReadonlyFn,
    visible: item.visible !== undefined ? normalizeProp(item.visible) : defaultVisibleFn,
  }

  itemPropsCache.set(cacheKeyFull, baseProps)

  // LRU 策略：缓存超过 100 条时删除最早的
  if (itemPropsCache.size > 100) {
    const firstKey = itemPropsCache.keys().next().value
    if (firstKey) {
      itemPropsCache.delete(firstKey)
    }
  }

  return baseProps
}

const handleChange = debounce(() => {
  emit('change', getForm())
}, 100)

// 合并 watch：当影响 itemProps 缓存的依赖变化时清理缓存
watch(
  [() => props.direction, () => props.size, getLabelWidth, componentOptions],
  () => {
    itemPropsCache.clear()
  },
  { deep: false },
)

defineExpose({ getForm, setForm, resetError, validate })
</script>

<template>
  <div class="lew-form" :style="getFormStyle">
    <LewGetLabelWidth
      v-if="labelWidth === 'auto'"
      ref="formLabelRef"
      :size="size"
      :options="componentOptions"
    />
    <LewFormItem
      v-for="item in componentOptions"
      :ref="(el: any) => setItemRef(item.field, el)"
      :key="item.field"
      v-model="formMap[item.field]"
      v-bind="getItemProps(item)"
      @change="handleChange"
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
