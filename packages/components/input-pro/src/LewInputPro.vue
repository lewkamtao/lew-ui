<script setup lang="ts">
import { ref, watch } from 'vue';
import { _props, Options } from './props';
const props = defineProps(_props);

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

let timer: ReturnType<typeof setTimeout>;

const show = () => {
    clearTimeout(timer);
    if (props.options.length == 0) return;
    lewDropdownRef.value.show();
};
const hide = () => {
    timer = setTimeout(() => {
        lewDropdownRef.value.hide();
    }, 250);
};
</script>

<template>
    <div class="lew-input-pro">
        <slot name="left" />
        <lew-dropdown
            ref="lewDropdownRef"
            style="width: 100%"
            trigger="focusin"
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
                :size="size"
                :align="align"
                :placeholder="placeholder"
                :clearable="clearable"
                :auto-width="autoWidth"
                @click.stop
                @input="input"
                @change="emit('change', v)"
                @blur="emit('blur', v), hide()"
                @focus="emit('focus', v), show()"
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
