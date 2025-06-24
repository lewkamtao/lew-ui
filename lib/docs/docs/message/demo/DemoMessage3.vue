<script lang="ts" setup>
const request = (type: string) => {
  LewMessage.request(
    { loadingMessage: 'Processing your order...' },
    async () => {
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          if (type === 'success') {
            resolve({
              content: 'Order completed successfully!',
              duration: 1000,
              type: 'success'
            })
          } else {
            resolve({
              content: 'Unable to complete your order. Please try again later.',
              duration: 1000,
              type: 'error'
            })
          }
        }, 1000)
      })
    }
  )
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button round color="green" @click="request('success')"
      >Simulate Success</lew-button
    >
    <lew-button round color="red" @click="request('fail')"
      >Simulate Failure</lew-button
    >
  </lew-flex>
</template>
