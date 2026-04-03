<script setup lang="ts">
import { Settings } from 'lucide-vue-next'

function open() {
  LewDialog.info({
    icon: Settings,
    title: 'Confirm Action',
    content:
      'This action will permanently delete your data. Are you sure you want to continue?',
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
          text: 'Confirm',
          type: 'fill',
          size: 'small',
          color: 'info',
          request: async () => {
            await new Promise(r => setTimeout(r, 1000))
            LewMessage.success({
              content: 'Action completed successfully',
            })
          },
        },
      },
    ],
  })
}
</script>

<template>
  <lew-button text="Confirm Action" round type="light" @click="open()" />
</template>
