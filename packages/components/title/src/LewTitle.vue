<script setup lang="ts">
defineProps({
    bold: {
        type: Number,
        default: 500,
    },
    size: {
        type: String,
        default: '24px',
    },
});
</script>   

<template>
    <div class="lew-title" :style="`font-weight:${bold};font-size:${size}`">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.lew-title {
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--lew-text-color-3);
    margin-bottom: 10px;
}
</style>
