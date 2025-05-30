<script lang="ts" setup>
const openWithDelay = () => {
  LewNotification.info({
    title: 'HSBC Account Update',
    content: 'Your HSBC account has been successfully updated. Please check your email for more details.',
    delay: 1500,
    width: 500
  })
}
const openWithoutDelay = () => {
  LewNotification.warning({
    title: 'HSBC Security Alert',
    content: 'We detected unusual activity on your HSBC account. Please contact our customer service immediately.',
    delay: 0,
    width: 400
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button
      text="Account Update"
      type="light"
      color="blue"
      @click="openWithDelay"
    />
    <lew-button
      text="Security Alert"
      type="light"
      color="orange"
      @click="openWithoutDelay"
    />
  </lew-flex>
</template>
