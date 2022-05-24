<script setup lang="ts">
const props = defineProps({
    type: {
        type: String,
        default: 'default',
    },
});
</script>

<template>
    <span class="badge" :class="`badge-${props.type}`">
        <slot></slot>
    </span>
</template>

<style lang="scss" scoped>
.badge {
    border-radius: 0.25rem;
    background-color: rgb(225 239 254 / 1);
    padding: 2px 8px 3px 8px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--primary-text-color);
    margin-right: 10px;
}
</style>
