<script setup lang="ts">
const options = ref([
  {
    label: '修改头像',
    value: '1'
  },
  {
    label: '个人中心',
    value: '2'
  },
  {
    label: '开通会员',
    value: '3'
  },
  {
    label: '退出登陆',
    value: '4'
  }
])

const change = (e: any) => {
  LewMessage.info(e.label)
}
</script>
<template>
  <lew-flex gap="30" x="start">
    <lew-dropdown :options="options" placement="bottom-start" @change="change">
      <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
    </lew-dropdown>

    <lew-dropdown :options="options" placement="top-start" @change="change">
      <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
    </lew-dropdown>

    <lew-dropdown :options="options" placement="left-start" @change="change">
      <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
    </lew-dropdown>

    <lew-dropdown :options="options" placement="right-start" @change="change">
      <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
    </lew-dropdown>
  </lew-flex>
</template>
