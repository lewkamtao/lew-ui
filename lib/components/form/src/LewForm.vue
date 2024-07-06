<script setup lang="ts">
import { object2class, any2px, formatFormByMap } from 'lew-ui/utils'
import { formProps } from './props'
import { cloneDeep, reduce } from 'lodash-es'
import LewFormItem from './LewFormItem.vue'
import * as Yup from 'yup'

const props = defineProps(formProps)
const emit = defineEmits(['change', 'mounted'])
const formMap = ref<Record<string, any>>({})

let componentOptions: any[] = cloneDeep(props.options) || []

// 处理 options 里的 rule 字段
const formRulesmap = reduce(
  cloneDeep(componentOptions),
  (acc: Record<string, any>, cur: any) => {
    if (cur.rule) {
      acc[cur.field] = cur.rule
    }
    return acc
  },
  {}
)

const getFormClassNames = computed(() => {
  const { col } = cloneDeep(props)
  return object2class('lew-form', { col })
})

const getFormStyle = computed(() => {
  const { rowGap, columnGap } = cloneDeep(props)
  return {
    'grid-column-gap': any2px(columnGap),
    'grid-row-gap': any2px(rowGap)
  }
})

// 将 formMap.value 中 xx.xx.xx 形式的字段，转换成嵌套对象
const getForm = () => formatFormByMap(cloneDeep(formMap.value))

const setForm = (value: any = {}) => {
  // 把对象的值给 formMap
  componentOptions.forEach((item: any) => {
    const v = getNestedFieldValue(value, item.field)
    if (value !== undefined) {
      formMap.value[item.field] = v
    }
  })
  // 触发 change 事件
  emit('change', getForm())
}

const getNestedFieldValue = (obj: any, field: string) => {
  if (!field) {
    return undefined
  }
  const keys = field.split('.') // 将字符串的嵌套字段按照 '.' 分割成数组
  let value = obj
  for (const key of keys) {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) {
      value = value[key]
    } else {
      return undefined // 如果找不到字段，返回 undefined
    }
  }
  return value // 返回目标字段的值
}

const formItemRefMap = ref<Record<string, any>>({})

const validate = () => {
  return new Promise<boolean>((resolve) => {
    // 定义校验规则
    const schema = Yup.object().shape(formRulesmap)
    // 清除错误信息
    Object.keys(formItemRefMap.value).forEach((key) => {
      formItemRefMap.value[key].setErrors('')
    })
    // 校验对象
    schema
      .validate(formMap.value, { abortEarly: false })
      .then(() => {
        resolve(true)
      })
      .catch((error: any) => {
        error?.inner.forEach((item: any) => {
          const path = item.path.replace(`["`, '').replace(`"]`, '')
          const ref = formItemRefMap.value[path]
          if (ref) {
            ref.setErrors(item.message)
          }
        })
        // 校验失败，将错误信息赋值给 formItemRef
        resolve(false)
      })
  })
}

onMounted(() => {
  emit('mounted')
})

defineExpose({ getForm, setForm, validate })
</script>

<template>
  <div class="lew-form" :class="getFormClassNames" :style="getFormStyle">
    <lew-form-item
      :ref="(el) => (formItemRefMap[item.field] = el)"
      v-for="item in componentOptions"
      v-model="formMap[item.field]"
      :key="item.field"
      v-bind="{ direction, size, labelWidth, disabled, ...item }"
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
}

.lew-form-col-1 {
  grid-template-columns: minmax(0, 1fr);
}

.lew-form-col-2 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.lew-form-col-3 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
}

.lew-form-col-4 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
}
</style>
