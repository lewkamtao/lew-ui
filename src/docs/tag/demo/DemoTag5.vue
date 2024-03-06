<script setup lang="ts">
    const close = () => {
        LewMessage.success('你点击了关闭');
    };
</script>
<template>
    <lew-flex x="start" wrap>
        <lew-tag type="light" color="blue" closable @close="close">
            <template #left> 🦄 </template>
            <template #right> 🎉 </template>
            primary
        </lew-tag>
        <lew-tag type="light" color="success" size="large" round>
            <template #left>🦄 </template>
            primary
        </lew-tag>
        <lew-tag type="light" color="red" size="large" round>
            <template #right> 🎉 </template>
            primary
        </lew-tag>
    </lew-flex>
</template>
