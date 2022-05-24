<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: () => {
            return false;
        },
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
        type="checkbox"
        :disabled="props.disabled"
        @change="change"
    />
</template>

<style lang="scss" scoped>
input {
    position: relative;
    width: 50px;
    height: 30px;
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
    width: 50px;
    height: 30px;
    background: var(--background-3);
    border-radius: 50px;
    transition: all 0.25s;
    cursor: pointer;
}

input:hover::before {
    background: var(--hover-background);
}

input::after {
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 23px;
    height: 23px;
    content: '';
    border-radius: 50px;
    background: #fff;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
}
input:checked::before {
    background: var(--primary-color);
}
input:checked::after {
    left: 22px;
}
</style>
