<script setup lang="ts">
import {
  any2px,
  formatFormByMap,
  object2class,
  retrieveNestedFieldValue,
} from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import * as Yup from 'yup'
import LewFormItem from './LewFormItem.vue'
import LewGetLabelWidth from './LewGetLabelWidth.vue'
import { formProps } from './props'

const props = defineProps(formProps)
const emit = defineEmits(['change', 'mounted'])
const formMap = ref<Record<string, any>>({})
const formLabelRef = ref()
const autoLabelWidth = ref(0)

const componentOptions: any[] = cloneDeep(props.options) || []
const formItemRefMap = ref<Record<string, any>>({})

const getFormClassNames = computed(() => {
  const { columns } = cloneDeep(props)
  return object2class('lew-form', { columns })
})

// 将 formMap.value 中 xx.xx.xx 形式的字段，转换成嵌套对象
function getForm() {
  const formData: Record<string, any> = formatFormByMap(
    cloneDeep(formMap.value),
  )
  // 应用 outputFormat
  componentOptions.forEach((item) => {
    if (item.outputFormat && item.field && formData[item.field]) {
      formData[item.field] = item.outputFormat({
        item,
        value: formData[item.field],
      })
    }
  })
  return formData
}

function setForm(value: any = {}) {
  // 把对象的值给 formMap
  componentOptions.forEach((item: any) => {
    let v = retrieveNestedFieldValue(value, item.field)
    if (value !== undefined && item.field) {
      // 应用 inputFormat
      if (item.inputFormat) {
        v = item.inputFormat({ item, value: v })
      }
      // 重置 ignoreValidate
      formItemRefMap.value[item.field]?.setIgnoreValidate(true)
      // 重置error
      formItemRefMap.value[item.field]?.setError('')
      // 如果有值，就把值给 formMap
      formMap.value[item.field] = v
    }
  })
}

function resetError() {
  componentOptions.forEach((item: any) => {
    // 重置error
    if (item.field) {
      // 重置 ignoreValidate
      formItemRefMap.value[item.field]?.setIgnoreValidate(false)
      // 重置error
      formItemRefMap.value[item.field]?.setError('')
    }
  })
}

function validate() {
  return new Promise<boolean>((resolve) => {
    // 定义校验规则
    const schemaMap: Record<string, any> = {}

    // 清除错误信息
    Object.keys(formItemRefMap.value).forEach((key) => {
      if (formItemRefMap.value[key].curRule) {
        schemaMap[key] = formItemRefMap.value[key].curRule
      }

      // 重置 ignoreValidate
      formItemRefMap.value[key]?.setIgnoreValidate(false)
      // 重置error
      formItemRefMap.value[key]?.setError('')
    })

    const schema = Yup.object().shape(schemaMap)

    // 校验对象
    schema
      .validate(formMap.value, { abortEarly: false })
      .then(() => {
        resolve(true)
      })
      .catch((error: any) => {
        ;(error?.inner || []).forEach((item: any) => {
          const path = item.path.replace(`["`, '').replace(`"]`, '')
          const ref = formItemRefMap.value[path]
          if (ref) {
            ref.setError(item.message)
          }
        })
        // 校验失败，将错误信息赋值给 formItemRef
        resolve(false)
      })
  })
}

onMounted(() => {
  // 计算 label 的宽度
  autoLabelWidth.value = formLabelRef.value?.getWidth()
  emit('mounted')
})

provide('formMethods', props.formMethods)

watch(
  () => props.size,
  () => {
    nextTick(() => {
      autoLabelWidth.value = formLabelRef.value?.getWidth()
    })
  },
)

const getFormStyle = computed(() => {
  const gapMap = {
    small: '24px',
    medium: '26px',
    large: '28px',
  }
  return {
    width: any2px(props.width),
    minWidth: 320,
    gap: gapMap[props.size],
  }
})

defineExpose({ getForm, setForm, resetError, validate })
</script>

<template>
  <div class="lew-form" :style="getFormStyle" :class="getFormClassNames">
    <LewGetLabelWidth
      ref="formLabelRef"
      :size="size"
      :options="componentOptions"
    />
    <LewFormItem
      v-for="item in componentOptions"
      :ref="(el) => (formItemRefMap[item.field] = el)"
      :key="item.field"
      v-model="formMap[item.field]"
      v-bind="{
        direction,
        size,
        labelWidth:
          labelWidth === 'auto' ? autoLabelWidth || labelWidth : labelWidth,
        disabled,
        readonly,
        ...item,
      }"
      @change="
        () => {
          emit('change', getForm())
        }
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-form {
  width: 100%;
  display: grid;
  flex-shrink: 0;
  padding-bottom: 30px;
}

.lew-form-columns-1 {
  grid-template-columns: minmax(0, 1fr);
}

.lew-form-columns-2 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.lew-form-columns-3 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
}

.lew-form-columns-4 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
}
</style>
