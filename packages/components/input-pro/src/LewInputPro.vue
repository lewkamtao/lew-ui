<script setup lang="ts">
import { _props, Options } from './props';

const props = defineProps(_props);
const v = ref(props.modelValue);

watch(
    () => props.modelValue,
    () => {
        v.value = props.modelValue;
    }
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

const input = (value: string) => {
    emit('update:modelValue', value);
    emit('input', value);
};

const clear = () => {
    emit('clear', v.value);
    v.value = '';
    emit('update:modelValue', v.value);
};

const selectFn = (e: Options) => {
    v.value = e.value;
    emit('update:modelValue', v.value);
    emit('input', v.value);
    emit('change', v.value);
    hide();
};

const open = () => {
    if (props.options.length == 0) return;
    lewDropdownRef.value.show();
};
const hide = () => {
    lewDropdownRef.value.hide();
};

const focus = (e: any) => {
    open();
    e?.currentTarget?.select();
    emit('focus', v);
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
                v-model="v"
                :type="type"
                :auto-width="autoWidth"
                :size="size"
                :align="align"
                :placeholder="placeholder"
                :clearable="clearable"
                @click.stop
                @input="input"
                @change="emit('change', v)"
                @blur="emit('blur', v)"
                @focus="focus"
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
