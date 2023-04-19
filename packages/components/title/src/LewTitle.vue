<script setup lang="ts">
import { titleProps } from './title';

const props = defineProps(titleProps);

const titleStyle = computed(() => {
    const { bold, size } = props;
    return `font-weight:${bold};font-size:${size}px`;
});
</script>

<template>
    <div class="lew-title" :style="titleStyle">
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
