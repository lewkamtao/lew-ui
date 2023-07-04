<script lang="ts" setup>
const open = (type: string) => {
    // @ts-ignore
    LewNotification[type]({
        title: '通知',
        content: '这是一条重要的通知！！！',
    });
};
</script>

<template>
    <lew-flex wrap x="start" gap="20">
        <lew-button text="error" color="red" @click="open('error')" />
        <lew-button text="success" color="green" @click="open('success')" />
        <lew-button text="normal" color="normal" @click="open('normal')" />
        <lew-button text="info" type="light" color="blue" @click="open('info')" />
        <lew-button text="warning" color="warning" @click="open('warning')" />
    </lew-flex>
</template>
