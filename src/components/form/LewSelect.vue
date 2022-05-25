<script setup lang="ts">
import { ref, PropType, watch } from 'vue';

type Options = {
    label: string;
    value: string;
};

const props = defineProps({
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String || Number,
        default: '',
    },
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
    label: { type: String || Number, default: '' },
    value: { type: String || Number, default: '' },
});

const v = ref(props.modelValue);
watch(
    () => props.modelValue,
    () => {
        v.value = props.modelValue;
    },
);
const emit = defineEmits(['update:modelValue']);

const change = (e: any) => {
    let { value } = e.target;
    emit('update:modelValue', value);
};
</script>

<template>
    <select v-model="v" @change="change">
        <option value="" hidden>未选择</option>
        <option
            v-for="(item, index) in options"
            :key="`select${index}`"
            :value="item.value"
        >
            {{ item.label }}
        </option>
    </select>
</template>

<style lang="scss" scoped>
select {
    width: 250px;
    height: 35px;
    border-radius: var(--border-radius);
    padding: 5px 10px;
    border: var(--border-width) solid var(--border-color);
    background: var(--background-3);
    color: var(--text-color);
    font-size: 14px;
    line-height: 24px;
    box-sizing: border-box;
}
</style>
