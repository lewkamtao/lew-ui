<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
    },
    resize: {
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

const input = (e: unknown) => {
    let value = e.target.value;
    emit('update:modelValue', value);
};
</script>

<template>
    <textarea
        v-model="v"
        class="lew-textarea btf-scrollbar"
        :class="`resize-${resize}`"
        rows="3"
        cols="3"
        :disabled="props.disabled"
        placeholder="请输入"
        @input="input"
    ></textarea>
</template>

<style lang="scss" scoped>
.lew-textarea {
    font-family: 'Noto Sans SC';
    width: 100%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 24px;
    min-height: 35px;
    border: var(--form-border);
    border-radius: var(--form-border-radius);
    background-color: var(--form-bgcolor);
    color: var(--form-text-color);
    box-sizing: border-box;
    transition: all 0.25s ease;
    outline: none;
}
.lew-textarea::placeholder {
    color: rgb(165, 165, 165);
}
.lew-textarea:hover {
    background-color: var(--form-bgcolor-hover);
}
.lew-textarea:active {
    background-color: var(--form-bgcolor-active);
}
.lew-textarea:focus {
    background-color: var(--form-bgcolor-focus);
    border: var(--form-border-focus);
}

.resize-none {
    resize: none;
}
.resize-horizontal {
    resize: horizontal;
}
.resize-vertical {
    resize: vertical;
}
.resize-both {
    resize: both;
}
.resize-inline {
    resize: inline;
}
</style>
