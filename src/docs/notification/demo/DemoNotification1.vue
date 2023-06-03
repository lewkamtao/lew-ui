<script lang="ts" setup>
function open(type: string) {
  // @ts-expect-error
  LewNotification[type]({
    title: '通知',
    content: '这是一条重要的通知！！！',
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button text="error" type="error" @click="open('error')" />
    <lew-button text="success" type="success" @click="open('success')" />
    <lew-button text="normal" type="normal" @click="open('normal')" />
    <lew-button text="info" type="info" @click="open('info')" />
    <lew-button text="warning" type="warning" @click="open('warning')" />
  </lew-flex>
</template>
