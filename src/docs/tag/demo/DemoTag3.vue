<script setup lang="ts">

const close = () => {
    LewMessage.success('你点击了关闭');
};
</script>

<template>
    <lew-flex x="start">
        <lew-tag type="primary" closable @close="close">primary</lew-tag>
    </lew-flex>
</template>
