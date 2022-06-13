<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: '标题',
    },
    row: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="form-item" :class="row ? 'lew-row' : ''">
        <label class="title-label">{{ props.title }} </label>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.form-item {
    width: 100%;
    margin-bottom: 20px;
    text-align: left;
    label {
        display: block;
        width: 100%;
        margin: 0px 0px 5px 10px;
        font-size: 14px;
        color: var(--text-color-2);
    }
}
.lew-row {
    display: flex;
    align-items: flex-start;
    label {
        white-space: nowrap;
        width: auto;
        padding-top: 6px;
        padding-right: 10px;
        display: inline-block;
    }
}
</style>
