<script setup lang="ts">
const options = ref([
  {
    label: '初级软件工程师',
    value: '1'
  },
  {
    label: '中级软件工程师',
    value: '2'
  },
  {
    label: '高级软件工程师',
    value: '3',
    disabled: true
  },
  {
    label: '技术主管',
    disabled: true,
    value: '4'
  },
  {
    label: '产品经理',
    value: '5'
  },
  {
    label: '项目经理',
    value: '6'
  },
  {
    label: 'UI/UX设计师',
    value: '7'
  },
  {
    label: '测试工程师',
    value: '8'
  },
  {
    label: '运维工程师',
    value: '9'
  },
  {
    label: '数据分析师',
    value: '10'
  },
  {
    label: '首席技术官',
    value: '11',
    disabled: true
  }
])

const value = ref('')

const handleChange = (val: string) => {
  console.log('选中的职位:', val)
}
</script>

<template>
  <lew-flex style="width: 320px" direction="y" gap="10px">
    <lew-select
      v-model="value"
      :options="options"
      placeholder="选择职位（部分职位暂不可选）"
      @change="handleChange"
    />
    <div v-if="value">
      当前选中: {{ options.find((opt) => opt.value === value)?.label }}
    </div>
  </lew-flex>
</template>
