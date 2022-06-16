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
        class="lew-title"
        :class="`${bold ? 'lew-title-bold' : ''}`"
        :style="`font-size:${size}`"
    >
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
    color: var(--title-color);
}

.lew-title-bold {
    font-weight: var(--title-bold);
}
</style>
