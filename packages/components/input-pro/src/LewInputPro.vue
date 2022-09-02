<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { inputProProps } from './props';

const props = defineProps(inputProProps);
const v = ref(props.modelValue);
watch(
    () => props.modelValue,
    () => {
        v.value = props.modelValue;
    },
);
const emit = defineEmits([
    'update:modelValue',
    'clear',
    'blur',
    'focus',
    'change',
    'input',
]);
let lewDropdownRef = ref();
let lewInputProRef = ref();

const input = (value: string) => {
    emit('update:modelValue', value);
    emit('input', value);
};

const clear = () => {
    emit('clear', v.value);
    v.value = '';
    emit('update:modelValue', v.value);
};

const selectFn = (e: any) => {
    v.value = e.value.value;
    emit('update:modelValue', v.value);
    emit('input', v.value);
    emit('change', v.value);
    setTimeout(() => {
        hide();
    }, 500);
};
const open = () => {
    if (props.options.length == 0) return;
    lewDropdownRef.value.show();
};
const hide = () => {
    lewDropdownRef.value.hide();
};
</script>

<template>
    <div class="lew-input-pro">
        <slot name="left" />
        <lew-dropdown
            ref="lewDropdownRef"
            style="width: 100%"
            :trigger="trigger"
            :arrow="arrow"
            :placement="placement"
            :align="align"
            :width="parseFloat(popoverWidth) - 12 + 'px'"
            :options="options"
            @change="selectFn"
        >
            <lew-input
                ref="lewInputProRef"
                v-model="v"
                :type="type"
                :autoWidth="autoWidth"
                :size="size"
                :align="align"
                :placeholder="placeholder"
                :clearable="clearable"
                @click.stop
                @input="input"
                @change="emit('change', v)"
                @blur="emit('blur', v)"
                @focus="open(), emit('focus', v)"
                @clear="clear"
            />
        </lew-dropdown>
        <slot name="right" />
    </div>
</template>

<style lang="scss" scoped>
.lew-input-pro {
    display: inline-flex;
    align-items: center;
    width: 100%;

    .lew-input {
        width: 100%;
    }
}
</style>
