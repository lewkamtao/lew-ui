<script setup lang="ts">
const options = ref([
  {
    label: 'Java开发工程师',
    value: '1'
  },
  {
    label: 'Python数据分析师',
    value: '2',
    disabled: true
  },
  {
    label: 'UI设计师',
    disabled: true,
    value: '3'
  },
  {
    label: '前端开发工程师',
    value: '4'
  },
  {
    label: '产品经理',
    value: '5'
  },
  {
    label: '运维工程师',
    value: '6'
  },
  {
    label: '测试工程师',
    value: '7'
  },
  {
    label: '人工智能工程师',
    disabled: true,
    value: '8'
  },
  {
    label: '项目经理',
    value: '9'
  },
  {
    label: '网络安全工程师',
    value: '10'
  },
  {
    label: '数据库管理员',
    value: '11'
  },
  {
    disabled: true,
    label: '技术总监',
    value: '12'
  },
  {
    label: '系统架构师',
    value: '13'
  }
])
const value = ref([])
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select-multiple v-model="value" :options="options" placeholder="点击选择职位" />
    <lew-select-multiple
      v-model="value"
      :options="options"
      trigger="hover"
      placeholder="悬停选择职位"
    />
  </lew-flex>
</template>
