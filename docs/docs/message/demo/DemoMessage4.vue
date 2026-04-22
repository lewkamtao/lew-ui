<script lang="ts" setup>
const types = ['success', 'warning', 'error', 'info', 'normal'] as const
const contents = [
  'Your profile has been updated successfully.',
  'Storage space is running low. Please clean up.',
  'Failed to sync data. Please check your connection.',
  'A new version is available. Update now!',
  'Your session will expire in 5 minutes.',
]

function showStack() {
  types.forEach((type, i) => {
    setTimeout(() => {
      LewMessage[type]({
        content: contents[i],
        duration: 8000,
      })
    }, i * 120)
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20px">
    <lew-button
      text="Stack Messages"
      round
      type="light"
      color="blue"
      @click="showStack"
    />
  </lew-flex>
</template>
