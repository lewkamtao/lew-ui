<script setup lang="ts">
function open() {
  LewDialog.info({
    okText: 'Submit',
    cancelText: 'Cancel',
    title: 'Submit for Review',
    content: 'Are you sure you want to submit this app for review?',
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
          LewMessage.success({
            content: 'Your app has been submitted for review',
          })
        }, 1000)
      })
    },
    cancel: () => {
      // Cancel submission
    },
  })
}
</script>

<template>
  <lew-button text="Submit for Review" round type="light" @click="open()" />
</template>
