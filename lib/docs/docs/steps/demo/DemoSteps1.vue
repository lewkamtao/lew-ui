<script setup lang="ts">
const options = [
  {
    title: '注册账号',
    description:
      '填写个人信息，创建一个新的用户账号'
  },
  {
    title: '验证邮箱',
    description: '通过邮件中的链接验证您的邮箱地址'
  },
  {
    title: '设置密码',
    description: '为您的账号设置一个安全的密码'
  },
  {
    title: '完成',
    description: '账号注册完成，您现在可以登录'
  }
]

const currentStep = ref(1)
</script>

<template>
  <lew-flex direction="y">
    <lew-steps :options="options" v-model="currentStep" />
    <lew-flex>
      <lew-button :disabled="currentStep === 1" @click="currentStep -= 1" type="light"
        >上一步</lew-button
      >
      <lew-button :disabled="currentStep === options.length" @click="currentStep += 1"
        >下一步</lew-button
      >
    </lew-flex>
  </lew-flex>
</template>
