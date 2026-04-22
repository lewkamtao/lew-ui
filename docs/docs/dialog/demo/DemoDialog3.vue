<script setup lang="ts">
function open() {
  LewDialog.info({
    title: 'Update Profile',
    content: 'Do you want to save the changes to your profile?',
    closeOnClickOverlay: true,
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
              content: 'Profile updated successfully',
            })
          },
        },
      },
    ],
  })
}
</script>

<template>
  <lew-button text="Update Profile" round type="light" @click="open()" />
</template>
