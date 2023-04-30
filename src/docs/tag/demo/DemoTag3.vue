<script setup lang="ts">
const close = () => {
    LewMessage.success('你点击了关闭');
};
</script>

<template>
    <lew-flex x="start" wrap>
        <lew-tag type="primary" closable @close="close">primary</lew-tag>
        <lew-tag type="primary" round closable @close="close">primary</lew-tag>
        <lew-tag
            type="primary"
            @click="close"
            size="large"
            disabled
            closable
            @close="close"
        >
            这是禁用
        </lew-tag>
        <lew-tag type="primary" size="large" round closable @close="close">
            primary
        </lew-tag>
    </lew-flex>
</template>
