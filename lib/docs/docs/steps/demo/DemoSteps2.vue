<script setup lang="ts">
const options = [
  {
    title: '填写基本信息',
    description: '请输入您的姓名和联系方式'
  },
  {
    title: '选择服务类型',
    description: '请选择您需要的服务类型'
  },
  {
    title: '确认提交',
    description: '请确认并提交您的信息'
  }
]

const status = ref('error')
const currentStep = ref(2)
</script>

<template>
  <lew-flex direction="y">
    <lew-steps :options="options" v-model="currentStep" :status="status" />
    <lew-flex>
      <lew-button
        :disabled="currentStep === 1"
        @click="currentStep -= 1"
        type="light"
        >上一步</lew-button
      >
      <lew-button
        :disabled="currentStep === options.length"
        @click="currentStep += 1"
        >下一步</lew-button
      >
    </lew-flex>
  </lew-flex>
</template>
