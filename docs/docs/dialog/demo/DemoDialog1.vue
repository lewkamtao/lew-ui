<script setup lang="ts">
function open() {
  LewDialog.error({
    title: 'Delete GitHub Repository',
    content:
      'Are you sure you want to permanently delete this repository? This action cannot be undone and will remove all code, issues, and pull requests. Please be certain before proceeding.',
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
          text: 'Delete',
          type: 'fill',
          size: 'small',
          color: 'error',
          request: async () => {
            await new Promise(r => setTimeout(r, 1000))
            LewMessage.success({
              content: 'Repository has been successfully deleted',
            })
          },
        },
      },
    ],
  })
}
</script>

<template>
  <lew-button
    color="error"
    type="ghost"
    text="Delete Repository"
    @click="open()"
  />
</template>
