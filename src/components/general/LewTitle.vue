<script setup lang="ts">
defineProps({
    bold: {
        type: Boolean,
        default: true,
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
    margin-bottom: 10px;
}

.lew-title-bold {
    font-weight: 500;
}
</style>
