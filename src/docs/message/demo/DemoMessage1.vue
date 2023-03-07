<script lang="ts" setup>
const open = (type: any) => {
    LewMessage[type]({
        id: 'get',
        content: '这是一个demo信息',
        duration: 3000,
    });
};
</script>

<template>
    <lew-flex wrap x="start" gap="20px">
        <lew-button type="error" @click="open('error')">error</lew-button>
        <lew-button type="success" @click="open('success')">success</lew-button>
        <lew-button type="normal" @click="open('normal')">normal</lew-button>
        <lew-button type="info" @click="open('info')">info</lew-button>
        <lew-button type="warning" @click="open('warning')"
            >warning
        </lew-button>
        <lew-button type="loading" @click="open('loading')"
            >loading
        </lew-button>
    </lew-flex>
</template>
