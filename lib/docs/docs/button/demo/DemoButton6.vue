<script setup lang="ts">
const mockFn = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
      LewMessage.success('发送成功')
    }, 1000)
  })
}
</script>

<template>
  <lew-flex wrap x="start" y="end" gap="20">
    <lew-button size="small" :request="mockFn" round color="red" text="Small" type="fill" />
    <lew-button
      size="medium"
      icon="check"
      loading
      :request="mockFn"
      round
      text="Medium"
      type="light"
    />
    <lew-button size="large" :request="mockFn" round text="Large" type="light" />
    <lew-button type="fill" color="green" round :request="mockFn" icon="message-circle" />
    <lew-button type="light" color="purple" round :request="mockFn" icon="message-circle" />
  </lew-flex>
</template>
