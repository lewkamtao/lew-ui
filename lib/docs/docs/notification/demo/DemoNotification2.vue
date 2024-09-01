<script lang="ts" setup>
const openWithDelay = () => {
  LewNotification.info({
    title: 'iPhone更新可用',
    content: '新的iOS版本已准备就绪，请在1分钟内更新。',
    delay: 1500
  })
}
const openWithoutDelay = () => {
  LewNotification.warning({
    title: 'iCloud存储空间已满',
    content: '您的iCloud存储空间已满。请升级或管理您的存储空间以继续备份。',
    delay: 0
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button text="系统更新" type="light" color="blue" @click="openWithDelay" />
    <lew-button text="存储警告" type="light" color="orange" @click="openWithoutDelay" />
  </lew-flex>
</template>
