<script setup lang="ts">

const close = () => {
    LewMessage.success('你点击了关闭');
};
</script>
<template>
    <lew-flex x="start">
        <lew-tag type="primary" @close="close" closable>
            <template #left> left </template>
            <template #right> right </template>
            primary
        </lew-tag>
    </lew-flex>
</template>
