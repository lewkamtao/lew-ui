<script setup lang="ts">
import * as Yup from 'yup'
import { schools } from '@/lib/data'

const schoolsOptions = schools.map((e, i) => {
  return { label: e, value: i + 1 }
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
          value: 'small'
        },
        {
          label: 'medium',
          value: 'medium'
        },
        {
          label: 'large',
          value: 'large'
        }
      ]
    }
  },
  {
    field: 'input',
    label: '文本框',
    as: 'input',
    required: true,
    rule: Yup.string().required(),
    props: {
      showCount: true,
      maxLength: 30
    }
  },
  {
    field: 'textarea',
    label: '多行文本框',
    as: 'textarea',
    required: true,
    rule: Yup.string().required('不能为空'),
    props: {
      clearable: true,
      showCount: true,
      maxLength: 300
    }
  },
  {
    field: 'select',
    label: '单选选择器',
    as: 'select',
    required: true,
    rule: Yup.string().required('此项必填'),
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
    }
  },
  {
    field: 'select_multiple',
    label: '多选选择器',
    as: 'select-multiple',
    required: true,
    rule: Yup.array().min(2, '至少选择2个').required('此项必填'),
    props: {
      change: (e: any) => {
        console.log(e)
      },
      clearable: true,
      options: schoolsOptions
    }
  },
  {
    field: 'radio_group',
    label: '单选框',
    as: 'radio-group',
    required: true,
    rule: Yup.string().required('此项必填'),
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
    }
  },
  {
    field: 'checkbox_group',
    label: '多选框',
    as: 'checkbox-group',
    required: true,
    rule: Yup.array().min(1, '至少选择一个').required('此项必填'),
    props: {
      round: true,
      block: true,
      options: [
        {
          label: '唱歌',
          value: '1'
        },
        {
          label: '跳舞',
          value: '2'
        },
        {
          label: 'Rap',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        }
      ]
    }
  },
  {
    field: 'tabs',
    label: '选项卡',
    as: 'tabs',
    required: true,
    rule: Yup.string().required('此项必填'),
    props: {
      options: [
        {
          label: 'Beijing',
          value: '1'
        },
        {
          label: 'Shanghai',
          value: '2'
        },
        {
          label: 'Guangzhou',
          value: '3'
        },
        {
          label: 'Shenzhen',
          value: '4'
        }
      ]
    }
  },
  {
    field: 'user.address',
    label: '地址',
    as: 'cascader',
    required: true,
    rule: Yup.string().required('地址必填'),
    props: {
      label: '是否同意',
      free: true,
      options: [
        {
          value: 1,
          label: 'Asia',
          children: [
            {
              value: 2,
              label: 'China',
              children: [
                { value: 3, label: 'Beijing' },
                { value: 4, label: 'Shanghai' },
                { value: 5, label: 'Hangzhou' }
              ]
            },
            {
              value: 6,
              label: 'Japan',
              children: [
                { value: 7, label: 'Tokyo' },
                { value: 8, label: 'Osaka' },
                { value: 9, label: 'Kyoto' }
              ]
            },
            {
              value: 10,
              label: 'Korea',
              children: [
                { value: 11, label: 'Seoul' },
                { value: 12, label: 'Busan' },
                { value: 13, label: 'Taegu' }
              ]
            }
          ]
        },
        {
          value: 14,
          label: 'Europe',
          children: [
            {
              value: 15,
              label: 'France',
              children: [
                { value: 16, label: 'Paris' },
                { value: 17, label: 'Marseille' },
                { value: 18, label: 'Lyon' }
              ]
            },
            {
              value: 19,
              label: 'UK',
              children: [
                { value: 20, label: 'London' },
                { value: 21, label: 'Birmingham' },
                { value: 22, label: 'Manchester' }
              ]
            }
          ]
        },
        {
          value: 23,
          label: 'North America',
          children: [
            {
              value: 24,
              label: 'US',
              children: [
                { value: 25, label: 'New York' },
                { value: 26, label: 'Los Angeles' },
                { value: 27, label: 'Washington' }
              ]
            },
            {
              value: 28,
              label: 'Canada',
              children: [
                { value: 29, label: 'Toronto' },
                { value: 30, label: 'Montreal' },
                { value: 31, label: 'Ottawa' }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    field: 'user.addd',
    label: '',
    as: 'checkbox',
    required: true,
    rule: Yup.boolean().oneOf([true], '请同意').required('请同意'),
    props: {
      label: '是否同意'
    }
  },
  {
    field: 'info.a.b.c.input_tag',
    label: '标签输入框',
    as: 'input-tag',
    required: true,
    rule: Yup.array().min(1, '至少选择一个').required('不能为空')
  },
  {
    as: 'button',
    props: {
      text: '提交',
      click: () => submit()
    }
  }
])

const formRef = ref()

const submit = async () => {
  LewMessage.request({ loadingMessage: '处理中···' }, async () => {
    return new Promise<any>(async (resolve) => {
      const vail = await formRef.value.validate()
      if (vail) {
        form.value = formRef.value.getForm()
        resolve({ content: '加载成功！', duration: 1000, type: 'success' })
      } else {
        resolve({ content: '请完善表单', duration: 1000, type: 'warning' })
      }
    })
  })
}

const form = ref({} as any)

const setForm = () => {
  // 设置表单
  formRef.value.setForm({
    size: 'medium',
    input: '文本框',
    textarea: '多行文本',
    select: '1',
    select_multiple: [1, 2],
    radio_group: '2',
    checkbox_group: ['2'],
    tabs: '2',
    user: {
      address: 30,
      addd: true
    },
    info: {
      a: {
        b: {
          c: {
            input_tag: ['测试', '小芳']
          }
        }
      }
    }
  })
}

const resetForm = () => {
  // 重置表单
  formRef.value.setForm({ size: 'medium' })
}

onMounted(() => {
  setForm()
})
</script>

<template>
  <lew-flex x="start" y="start" :gap="50">
    <lew-form
      ref="formRef"
      :size="form.size"
      class="form-box"
      :options="options"
      @mounted="setForm"
      @change="
        (e: any) => {
          form = e
        }
      "
    />
    <lew-flex direction="y" x="start">
      <lew-flex x="start">
        <lew-button type="light" round @click="submit">submit</lew-button>
        <lew-button type="light" round @click="setForm">setForm</lew-button>
        <lew-button type="light" round @click="resetForm"> reset </lew-button>
      </lew-flex>
      <pre>{{ form }}</pre>
    </lew-flex>
  </lew-flex>
</template>
<style scoped lang="scss">
.form-box {
  width: 450px;
  flex-shrink: 0;
}
pre {
  background-color: var(--lew-bgcolor-2);
  padding: 30px;
}
@media (max-width: 767px) {
  .form-box {
    width: 100%;
  }
}
</style>
