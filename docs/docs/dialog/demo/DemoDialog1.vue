<script setup lang="ts">
function open() {
  LewDialog.error({
    title: 'Delete GitHub Repository',
    content:
      'Are you sure you want to permanently delete this repository? This action cannot be undone and will remove all code, issues, and pull requests. Please be certain before proceeding.',
    cancelText: 'Cancel',
    okText: 'Delete',
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
          LewMessage.success({
            content: 'Repository has been successfully deleted',
          })
        }, 1000)
      })
    },
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
