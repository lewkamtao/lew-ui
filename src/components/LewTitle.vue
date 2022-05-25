<script setup lang="ts">
defineProps({
    bold: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: '24px',
    },
});
</script>

<template>
    <div
        class="title"
        :class="`${bold ? 'lew-bold' : ''}`"
        :style="`font-size:${size}`"
    >
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.title {
    color: var(--color-title);
}
</style>
