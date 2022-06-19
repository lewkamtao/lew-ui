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

const input = (e: Event) => {
    let value = (<HTMLInputElement>e.target).value;
    emit('update:modelValue', value);
};
</script>

<template>
    <input
        v-model="v"
        class="lew-input"
        :disabled="props.disabled"
        @input="input"
        placeholder="请输入"
    />
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
    border: var(--form-border);
    border-radius: var(--form-border-radius);
    background-color: var(--form-bgcolor);
    color: var(--form-text-color);
    box-sizing: border-box;
    transition: outline 0.25s, background-color 0.25s;
    outline: 2px solid rgba($color: #000000, $alpha: 0);
    font-family: 'Noto Sans SC';
}
.lew-input::placeholder {
    color: rgb(165, 165, 165);
}
.lew-input:hover {
    background-color: var(--form-bgcolor-hover);
}

.lew-input:active {
    background-color: var(--form-bgcolor-active);
}

.lew-input:focus {
    border: 1px rgba($color: #000000, $alpha: 0) solid;
    background-color: var(--form-bgcolor-focus);
    outline: var(--form-outline-focus);
}
</style>
