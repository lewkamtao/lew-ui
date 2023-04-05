<script lang="ts" setup>
import LewRadio from './LewRadio.vue';
import { useVModel } from '@vueuse/core';
import { radioGroupProps } from './radio';
import type { RadioOptions } from './radio';

const emit = defineEmits(['change', 'update:modelValue']);
const props = defineProps(radioGroupProps);
const modelValue = useVModel(props, 'modelValue', emit);

const check = (item: RadioOptions) => {
    modelValue.value = item.value;
    emit('change', {
        value: item.value,
        item: toRaw(item),
    });
};
</script>

<template>
    <lew-flex
        x="start"
        gap="15"
        class="lew-radio-group"
        :class="`lew-radio-group-${direction} lew-radio-group-${size}`"
    >
        <lew-radio
            v-for="item in options"
            :key="item.value"
            :block="block"
            :iconable="iconable"
            :label="item.label"
            :disabled="item.disabled"
            :size="size"
            :checked="modelValue === item.value"
            @update:checked="check(item)"
        />
    </lew-flex>
</template>

<style lang="scss" scoped>
.lew-radio-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.lew-radio-group-small {
    min-height: var(--lew-form-item-height-small);
}

.lew-radio-group-medium {
    min-height: var(--lew-form-item-height-medium);
}

.lew-radio-group-large {
    min-height: var(--lew-form-item-height-large);
}
.lew-radio-group.lew-radio-group-x {
    flex-direction: row;
}

.lew-radio-group.lew-radio-group-y {
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
}
</style>
