<script setup lang="ts">
import {
  object2class,
  any2px,
  formatFormByMap,
  retrieveNestedFieldValue
} from 'lew-ui/utils'
import LewGetLabelWidth from './LewGetLabelWidth.vue'
import { formProps } from './props'
import { cloneDeep } from 'lodash-es'
import LewFormItem from './LewFormItem.vue'
import * as Yup from 'yup'

const props = defineProps(formProps)
const emit = defineEmits(['change', 'mounted'])
const formMap = ref<Record<string, any>>({})
const formLabelRef = ref()
const autoLabelWidth = ref(0)

let componentOptions: any[] = cloneDeep(props.options) || []

const getFormClassNames = computed(() => {
  const { columns } = cloneDeep(props)
  return object2class('lew-form', { columns })
})

// 将 formMap.value 中 xx.xx.xx 形式的字段，转换成嵌套对象
const getForm = () => formatFormByMap(cloneDeep(formMap.value))

const setForm = (value: any = {}) => {
  // 把对象的值给 formMap
  componentOptions.forEach((item: any) => {
    const v = retrieveNestedFieldValue(value, item.field)
    if (value !== undefined && item.field) {
      // 重置error
      formItemRefMap.value[item.field]?.setError('')
      // 如果有值，就把值给 formMap
      formMap.value[item.field] = v
    }
  })
}

const resetError = () => {
  componentOptions.forEach((item: any) => {
    // 重置error
    if (item.field) {
      formItemRefMap.value[item.field]?.setError('')
    }
  })
}

const formItemRefMap = ref<Record<string, any>>({})

const validate = () => {
  return new Promise<boolean>((resolve) => {
    // 定义校验规则
    const schemaMap: Record<string, any> = {}

    // 清除错误信息
    Object.keys(formItemRefMap.value).forEach((key) => {
      if (formItemRefMap.value[key].curRule) {
        schemaMap[key] = formItemRefMap.value[key].curRule
      }
      formItemRefMap.value[key].setError('')
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
  }
)

defineExpose({ getForm, setForm, resetError, validate })
</script>

<template>
  <div
    class="lew-form"
    :style="{ width: any2px(width), minWidth: 320 }"
    :class="getFormClassNames"
  >
    <lew-get-label-width
      ref="formLabelRef"
      :size="size"
      :options="componentOptions"
    />
    <lew-form-item
      :ref="(el) => (formItemRefMap[item.field] = el)"
      v-for="item in componentOptions"
      v-model="formMap[item.field]"
      :key="item.field"
      v-bind="{
        direction,
        size,
        labelWidth:
          labelWidth === 'auto' ? autoLabelWidth || labelWidth : labelWidth,
        disabled,
        readonly,
        ...item
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
  gap: 30px;
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
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
      0,
      1fr
    );
}
</style>
