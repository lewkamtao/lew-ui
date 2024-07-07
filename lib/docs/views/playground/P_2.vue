<script setup lang="ts">
import * as Yup from 'yup'
import { schools } from '@/lib/data'

const schoolsOptions = schools.map((e, i) => {
  return { label: e, value: i + 1 }
})

const form = ref({} as any)

onMounted(() => {
  // 设置表单
  //   formRef.value.setForm({
  //     size: 'medium',
  //     input: '文本框',
  //     textarea: '多行文本',
  //     select: '1',
  //     select_multiple: [1, 2],
  //     radio_group: '2',
  //     checkbox_group: ['2'],
  //     tabs: '2',
  //     user: {
  //       address: 30,
  //       addd: true
  //     },
  //     info: {
  //       asd: {
  //         dsd: {
  //           input_tag: ['测试', '小芳']
  //         }
  //       }
  //     }
  //   })
})
const options = ref([
  {
    label: '单选框',
    as: 'radio-group',
    props: {
      options: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        },
        {
          label: '不公开',
          value: '3'
        }
      ]
    },
    id: 'radio-group_cii79t7mq',
    field: '2131331'
  },
  {
    label: '文本框',
    as: 'input',
    props: {
      showCount: true,
      maxLength: 30
    },
    id: 'input_tnunx5qdb',
    field: '2312313'
  },
  {
    label: '单选选择器',
    as: 'select',
    props: {
      clearable: true,
      options: [
        {
          label: '广东',
          value: '1'
        },
        {
          label: '深圳',
          value: '2'
        },
        {
          label: '杭州',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        },
        {
          label: '北京',
          value: '5'
        }
      ]
    },
    id: 'select_iplbxswmm',
    field: '3133133123213'
  }
])

const formRef = ref()

const submit = async () => {
  const vail = await formRef.value.validate()
  if (vail) {
    LewMessage.success('已提交')
  } else {
    LewMessage.warning('请完善表单')
  }
}
</script>

<template>
  <div class="playground">
    <lew-form
      ref="formRef"
      direction="y"
      :size="form.size"
      :options="options"
      :labelWidth="80"
      :row-gap="50"
      :column-gap="50"
      :columns="1"
      @change="
        (e: any) => {
          form = e
        }
      "
    />
  </div>
</template>

<style lang="sass" scoped></style>
