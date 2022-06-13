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
    width: 46px;
    height: 28px;
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
    width: 46px;
    height: 28px;
    background: var(--gray-color);
    border-radius: 4px;
    transition: all 0.35s cubic-bezier(0.65, 0, 0.35, 1);
    cursor: pointer;
}
.round::before {
    border-radius: 50px;
}

input::after {
    position: absolute;
    left: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    content: '';
    border-radius: 2px;
    background: #fff;
    transition: all 0.35s cubic-bezier(0.65, 0, 0.35, 1);
    cursor: pointer;
}

.round::after {
    border-radius: 50px;
}
input:checked::before {
    background: var(--primary-color);
}
input:checked::after {
    left: 20px;
}
</style>
