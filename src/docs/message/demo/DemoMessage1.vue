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
        <lew-button text="error" type="error" @click="open('error')" />
        <lew-button text="success" type="success" @click="open('success')" />
        <lew-button text="normal" type="normal" @click="open('normal')" />
        <lew-button text="info" type="info" @click="open('info')" />
        <lew-button text="warning" type="warning" @click="open('warning')" />
        <lew-button text="loading" @click="open('loading')" />
        <lew-button text="clear" @click="clear()" />
    </lew-flex>
</template>
