<script lang="ts" setup>
const open = (type: any) => {
    LewMessage[type]({
        content: '这是一个demo信息',
        duration: 3000,
    });
};

const clear = () => {
    LewMessage.clear();
};
</script>

<template>
    <lew-flex wrap x="start" gap="20">
        <lew-button text="error" color="red" @click="open('error')" />
        <lew-button text="success" color="green" @click="open('success')" />
        <lew-button text="normal" color="normal" @click="open('normal')" />
        <lew-button text="info" type="light" color="blue" @click="open('info')" />
        <lew-button text="warning" color="warning" @click="open('warning')" />
        <lew-button text="loading" @click="open('loading')" />
        <lew-button text="clear" @click="clear()" />
    </lew-flex>
</template>
