<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { _props } from './props';

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
let lewInputProRef = ref();

let options = ref([
    {
        label: '红楼梦',
        value: '4',
    },
    {
        label: '水浒传',
        value: '2',
    },
    {
        label: '三国演义',
        value: '3',
    },
    {
        label: '红楼梦',
        value: '4',
    },
]);

const input = (e) => {
    emit('input', e.value);
    emit('update:modelValue', e.value);
};
const selectFn = (e: any) => {
    v.value = e.value.label;
    emit('input', v.value);
    emit('update:modelValue', v.value);
    hide();
};
const open = () => {
    lewDropdownRef.value.show();
};
const hide = () => {
    lewDropdownRef.value.hide();
};

const lewInputProWidth = computed(
    () => lewInputProRef.value?.offsetWidth - 12 + 'px',
);
</script>

<template>
    <div ref="lewInputProRef" class="lew-input-pro">
        <lew-dropdown
            ref="lewDropdownRef"
            style="width: 100%"
            :arrow="false"
            trigger="click"
            :width="lewInputProWidth"
            :options="options"
            @change="selectFn"
        >
            <lew-input
                v-model="v"
                @click.stop
                @input="input"
                @change="emit('change', v)"
                @blur="emit('blur', v)"
                @focus="open(), emit('focus', v)"
            />
        </lew-dropdown>
    </div>
</template>

<style lang="scss" scoped>
.lew-input-pro {
    width: 100%;
    .lew-input {
        width: 100%;
    }
}
</style>
