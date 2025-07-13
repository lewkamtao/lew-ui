<script lang="ts" setup>
const openWithDelay = () => {
    LewNotification.info({
        title: 'Notice',
        content: 'This notification will close in 5 seconds',
        duration: 5000,
        showProgress: true,
    })
}
const openWithoutDelay = () => {
    LewNotification.warning({
        title: 'Notice',
        content: 'This notification will not close automatically',
        duration: 0,
    })
}
</script>

<template>
    <lew-flex wrap x="start" gap="20">
        <lew-button
            text="Auto"
            type="ghost"
            color="blue"
            @click="openWithDelay"
        />
        <lew-button
            text="Manual"
            type="ghost"
            color="orange"
            @click="openWithoutDelay"
        />
    </lew-flex>
</template>
