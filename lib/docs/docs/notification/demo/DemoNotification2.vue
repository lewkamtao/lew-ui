<script lang="ts" setup>
const openWithDelay = () => {
  LewNotification.info({
    title: 'Notice',
    content: 'This notification will close in 5 seconds',
    delay: 5000,
    showProgress: true
  })
}
const openWithoutDelay = () => {
  LewNotification.warning({
    title: 'Notice',
    content: 'This notification will not close automatically',
    delay: 0
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button text="Auto" type="light" color="blue" @click="openWithDelay" />
    <lew-button
      text="Manual"
      type="light"
      color="orange"
      @click="openWithoutDelay"
    />
  </lew-flex>
</template>
