<script setup lang="ts">
const open = () => {
    LewDialog.info({
        okText: 'Confirm',
        cancelText: 'Cancel',
        title: 'Update Profile',
        content: 'Do you want to save the changes to your profile?',
        closeOnClickOverlay: true,
        ok: () => {
            LewMessage.success({
                content: 'Profile updated successfully',
            })
        },
        cancel: () => {
            // Cancel update
        },
    })
}
</script>
<template>
    <lew-button text="Update Profile" round type="light" @click="open()" />
</template>
