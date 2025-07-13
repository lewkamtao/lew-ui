<script lang="ts" setup>
const open = () => {
    LewNotification.info({
        title: 'New IKEA Collection Available',
        content:
            'Our new summer collection is now in stores. Visit us to discover the latest home inspiration.',
        duration: 3500,
        width: 400,
        showProgress: true,
    })
}
</script>

<template>
    <lew-button text="Open" type="light" color="blue" @click="open" />
</template>
