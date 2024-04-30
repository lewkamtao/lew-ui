<script lang="ts" setup>
const open = (type: any) => {
  LewMessage[type]({
    content: '这是一个demo信息',
    duration: 3000
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button text="error" round type="light" color="red" @click="open('error')" />
    <lew-button text="success" round type="light" color="green" @click="open('success')" />
    <lew-button text="normal" round type="light" color="normal" @click="open('normal')" />
    <lew-button text="info" round type="light" color="blue" @click="open('info')" />
    <lew-button text="warning" round type="light" color="warning" @click="open('warning')" />
  </lew-flex>
</template>
