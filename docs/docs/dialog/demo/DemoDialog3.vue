<script setup lang="ts">
function open() {
  LewDialog.info({
    okText: 'Confirm',
    cancelText: 'Cancel',
    title: 'Update Profile',
    content: 'Do you want to save the changes to your profile?',
    closeOnClickOverlay: true,
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          LewMessage.success({
            content: 'Profile updated successfully',
          })
          resolve(true)
        }, 1000)
      })
    },
  })
}
</script>

<template>
  <lew-button text="Update Profile" round type="light" @click="open()" />
</template>
