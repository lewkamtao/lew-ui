<script setup lang="ts">
defineProps({
    width: {
        type: String,
        default: '',
    },
    labelWidth: {
        type: String,
        default: 'auto',
    },
    labelAlign: {
        type: String,
        default: 'end',
    },
    direction: {
        type: String,
        default: 'x',
    },
});
</script>

<template>
    <div class="lew-form" :style="`width:${width}`">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
.lew-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
