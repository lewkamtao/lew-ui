<script setup lang="ts">
function open() {
  LewDialog.info({
    title: 'Submit for Review',
    content: 'Are you sure you want to submit this app for review?',
    closeOnClickOverlay: true,
    closeByEsc: true,
    footerButtons: [
      {
        props: {
          text: 'Cancel',
          color: 'gray',
          type: 'light',
          size: 'small',
        },
      },
      {
        props: {
          text: 'Submit',
          type: 'fill',
          size: 'small',
          color: 'info',
          request: async () => {
            await new Promise(r => setTimeout(r, 1000))
            LewMessage.success({
              content: 'Your app has been submitted for review',
            })
          },
        },
      },
    ],
  })
}
</script>

<template>
  <lew-button text="Submit for Review" round type="light" @click="open()" />
</template>
