<script setup lang="ts">
const options = [
  {
    title: '选择产品',
    description: '请选择您想购买的产品'
  },
  {
    title: '填写收货信息',
    description: '请输入您的收货地址和联系方式'
  },
  {
    title: '确认订单',
    description: '请确认您的订单信息'
  }
]

const status = ref('loading')
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
