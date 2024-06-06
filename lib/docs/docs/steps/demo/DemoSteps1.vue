<script setup lang="ts">
const options = [
  {
    title: '基本信息',
    description:
      '包括姓名、性别、年龄、身份证号码、电话号码、Email地址及家庭住址等在内的个人基本信息'
  },
  {
    title: '家庭信息',
    description: '父母的姓名,工作单位、职务、政治面貌、联系电话、身份证号等学生主要实际'
  },
  {
    title: '就业信息',
    description: '就业机会、招聘活动、职位要求、行业动态、求职技巧等方面的信息'
  },
  {
    title: '完成',
    description: '系统会在七个工作日内完成审核'
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
