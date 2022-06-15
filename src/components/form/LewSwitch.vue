<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    round: {
        type: Boolean,
        default: true,
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

const change = () => {
    emit('update:modelValue', v.value);
};
</script>

<template>
    <input
        v-model="v"
        :class="{ round: round }"
        type="checkbox"
        :disabled="props.disabled"
        @change="change"
    />
</template>

<style lang="scss" scoped>
input {
    position: relative;
    width: 38px;
    height: 24px;
    border: none;
    outline: none;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
}

input::before {
    position: absolute;
    left: 0px;
    top: 0px;
    content: '';
    width: 38px;
    height: 24px;
    background: var(--form-bgcolor-high);
    border-radius: 4px;
    transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
    cursor: pointer;
}

input:hover::before {
    background: var(--form-bgcolor-high-hover);
}

input:active::before {
    background: var(--form-bgcolor-high-active);
}

.round::before {
    border-radius: 50px;
}

input::after {
    position: absolute;
    width: 16px;
    height: 16px;
    content: '';
    border-radius: 2px;
    background: #fff;
    transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
    transform: translate(4px, 4px);
    cursor: pointer;
}

.round::after {
    border-radius: 50px;
}

input:checked::before {
    background: var(--primary-bgcolor);
}

input:checked::after {
    transform: translate(18px, 4px);
}
</style>
