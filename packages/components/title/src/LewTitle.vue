<script setup lang="ts">
import { titleProps } from './title';
import { any2px } from 'lew-ui/utils';

const props = defineProps(titleProps);

const titleStyle = computed(() => {
    const { bold } = props;
    const size = any2px(props.size);
    return `font-weight:${bold};font-size:${size}`;
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
