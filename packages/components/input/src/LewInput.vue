<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
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

const input = (e: Event) => {
    let value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);
};
</script>

<template>
    <input v-model="v" class="lew-input" placeholder="请输入" @input="input" />
</template>

<style lang="scss" scoped>
.lew-input {
    width: 100%;
    height: 35px;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    border-radius: var(--lew-form-border-radius);
    background-color: var(--lew-form-bgcolor);
    color: var(--lew-text-color);
    box-sizing: border-box;
    transition: all 0.15s ease;
    outline: none;
}
.lew-input::placeholder {
    color: rgb(165, 165, 165);
}
.lew-input:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-input:active {
    background-color: var(--lew-form-bgcolor-active);
}

.lew-input:focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
}
</style>
