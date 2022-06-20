<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: '标题',
    },
    direction: {
        type: String,
        default: 'x',
    },
});
</script>

<template>
    <div class="lew-form-item" :class="`lew-form-item-${direction}`">
        <label class="title-label">{{ props.title }} </label>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.lew-form-item {
    width: 100%;
    margin-bottom: 20px;
    text-align: left;

    label {
        display: block;
        width: 100%;
        margin: 0px 0px 10px 0px;
        font-size: 14px;
        color: var(--text-color);
    }
}

.lew-form-item-x {
    display: flex;
    align-items: flex-start;

    label {
        white-space: nowrap;
        width: auto;
        margin-top: 8px;
        padding-right: 10px;
        display: inline-block;
    }
}

.lew-form-item-y {
}
</style>
