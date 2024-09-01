<script setup lang="ts">
const handleRequest = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
      LewMessage.success('发送成功')
    }, 1000)
  })
}
</script>

<template>
  <lew-flex wrap x="start" y="end" gap="20">
    <lew-button :request="handleRequest" text="发送短信" type="light" />
  </lew-flex>
</template>
