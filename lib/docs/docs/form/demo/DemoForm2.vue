<script setup lang="ts">
import * as Yup from 'yup'

const form = ref({} as any)

const formRef = ref()

function submit() {
  formRef.value.validate().then((res: any) => {
    console.log(res)
  })
}

onMounted(() => {
  // 设置表单
  formRef.value.setForm({
    size: 'medium',
  })
})
const options = ref([
  {
    label: '表单大小',
    as: 'tabs',
    field: 'size',
    props: {
      itemWidth: 'auto',
      width: '100%',
      options: [
        {
          label: 'small',
          value: 'small',
        },
        {
          label: 'medium',
          value: 'medium',
        },
        {
          label: 'large',
          value: 'large',
        },
      ],
    },
  },
  {
    field: 'name',
    label: '姓名',
    as: 'input',
    rule: Yup.string()
      .matches(/^[a-z]+$/i, '必须为纯英文字母')
      .min(4, '长度必须至少为4')
      .max(16, '长度不能超过16')
      .required('不能为空'),

    props: {
      clearable: true,
    },
  },
  {
    field: 'remark',
    label: '备注',
    as: 'input',
    rule: Yup.string()
      .matches(/^[a-z]+$/i, '必须为纯英文字母')
      .min(4, '长度必须至少为4')
      .max(16, '长度不能超过16')
      .required('不能为空'),

    props: {
      clearable: true,
    },
  },
  {
    field: 'intro',
    label: '介绍',
    as: 'textarea',
    rule: Yup.string()
      .matches(/^[\u4E00-\u9FA5]+$/, '必须为纯中文')
      .min(30, '长度必须至少为30')
      .max(300, '长度不能超过8')
      .required('不能为空'),
    props: {
      clearable: true,
    },
  },
  {
    field: 'birth',
    label: '生日',
    as: 'date-picker',
    rule: Yup.string().required('不能为空'),

    props: {
      clearable: true,
    },
  },
  {
    field: 'date.birth',
    label: '有效期',
    as: 'date-range-picker',
    rule: Yup.object().required('不能为空'),

    props: {
      clearable: true,
    },
  },
  {
    field: 'user.city',
    label: '城市',
    as: 'select',

    rule: Yup.string().required('此项必填'),
    props: {
      change: (e: any) => {
        console.log(e)
      },
      clearable: true,
      options: [
        {
          label: '广东',
          value: '1',
        },
        {
          label: '深圳',
          value: '2',
        },
        {
          label: '杭州',
          value: '3',
        },
        {
          label: '上海',
          value: '4',
        },
        {
          label: '北京',
          value: '5',
        },
      ],
    },
  },
  {
    field: 'user.agree',
    label: '',
    as: 'checkbox',
    rule: Yup.boolean().oneOf([true], '请同意').required('请同意'),
    props: {
      label: '是否同意',
    },
  },
  {
    as: 'button',
    props: {
      text: '提交',
      request: submit,
    },
  },
])
</script>

<template>
  <lew-flex width="500" x="start" y="start" :gap="50">
    <lew-form
      ref="formRef"
      direction="y"
      class="form-box"
      :size="form.size"
      :options="options"
      @change="
        (e: any) => {
          form = e
        }
      "
    />
    <pre>{{ form }}</pre>
  </lew-flex>
</template>

<style scoped lang="scss">
.form-box {
  width: 380px;
}
pre {
  width: 350px;
  background-color: var(--lew-bgcolor-2);
  padding: 30px;
  flex-shrink: 0;
}
@media (max-width: 767px) {
  .form-box {
    width: 100%;
  }
}
</style>
