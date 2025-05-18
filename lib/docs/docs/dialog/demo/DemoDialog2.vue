<script setup lang="ts">
const open = () => {
  LewDialog.info({
    content: 'Are you sure you want to publish this app to the App Store?',
    closeOnClickOverlay: true,
    layout: 'mini',
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
          LewMessage.success({
            content: 'App has been successfully submitted for review'
          })
        }, 1000)
      })
    },
    cancel: () => {
      // Cancel publishing
    }
  })
}
</script>
<template>
  <lew-button text="Submit for Review" round type="light" @click="open()" />
</template>
