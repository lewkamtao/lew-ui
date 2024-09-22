<script setup lang="ts">
import { object2class, any2px, formatFormByMap } from 'lew-ui/utils'
import LewGetLabelWidth from './LewGetLabelWidth.vue'
import { formProps } from './props'
import { cloneDeep, reduce, merge } from 'lodash-es'
import LewFormItem from './LewFormItem.vue'
import * as Yup from 'yup'

const props = defineProps(formProps)
const emit = defineEmits(['change', 'mounted'])
const formMap = ref<Record<string, any>>({})
const formLabelRef = ref()
const autoLabelWidth = ref(0)

let componentOptions: any[] = cloneDeep(props.options) || []

// 处理 options 里的 rule 字段
// 如果 options 中的 required 字段为 true，则
componentOptions.forEach((item: any) => {
  let { rule } = item
  if (item.required) {
    if (!rule) {
      item.rule = Yup.mixed()
        .required('此项必填')
        .test('非空', '此项必填', (value) => value !== '')
    } else if (rule?.spec?.optional === true) {
      item.rule = merge(rule, Yup.mixed().required('此项必填'))
    }
  } else {
    item.required = rule?.spec?.optional === false
  }
})

const formRulesmap: any = () => {
  return reduce(
    cloneDeep(componentOptions),
    (acc: Record<string, any> = {}, cur: any) => {
      const { field, rule } = cur
      if (field) {
        acc[field] = rule
      }
      return acc
    },
    {}
  )
}

const getFormClassNames = computed(() => {
  const { columns } = cloneDeep(props)
  return object2class('lew-form', { columns })
})

// 将 formMap.value 中 xx.xx.xx 形式的字段，转换成嵌套对象
const getForm = () => formatFormByMap(cloneDeep(formMap.value))

const setForm = (value: any = {}) => {
  // 把对象的值给 formMap
  componentOptions.forEach((item: any) => {
    const v = getNestedFieldValue(value, item.field)
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
    const schema = Yup.object().shape(formRulesmap())

    // 清除错误信息
    Object.keys(formItemRefMap.value).forEach((key) => {
      formItemRefMap.value[key].setError('')
    })

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
    <LewGetLabelWidth
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
