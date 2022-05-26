<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
const v = ref(props.modelValue);
watch(
    () => props.modelValue,
    () => {
        v.value = props.modelValue;
    },
);
const emit = defineEmits(['update:modelValue']);

const input = (e: any) => {
    let { value } = e.target;
    emit('update:modelValue', value);
};
</script>

<template>
    <textarea
        v-model="v"
        rows="3"
        cols="3"
        :disabled="props.disabled"
        @input="input"
    ></textarea>
</template>

<style lang="scss" scoped>
textarea {
    font-family: '微软雅黑';
    width: 250px;
    padding: 5px 7px;
    font-size: 14px;
    line-height: 24px;
    border: var(--form-border);
    border-radius: var(--form-border-radius);
    background-color: var(--form-bgcolor);
    color: var(--form-text-color);
    box-sizing: border-box;
    transition: outline 0.25s, background-color 0.25s;
    outline: 2px solid rgba($color: #000000, $alpha: 0);
}
textarea:focus {
    background-color: var(--form-bgcolor-focus);
    outline: var(--form-outline-focus);
}
</style>
