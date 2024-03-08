<script lang="ts" setup>
    const open = () => {
        LewMessage.warning({
            id: 'message-1',
            content: '这是一个demo信息',
            duration: 300000
        });
    };
    const close = () => {
        LewMessage.close({ id: 'message-1' });
    };
</script>

<template>
    <lew-flex wrap x="start" gap="20">
        <lew-button round @click="open()">打开</lew-button>
        <lew-button round color="warning" @click="close()">关闭</lew-button>
    </lew-flex>
</template>
