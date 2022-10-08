<template>
    <lew-flex
        x="start"
        gap="15px"
        class="lew-radio-group"
        :class="`lew-radio-group-${direction} lew-radio-group-${size}`"
    >
        <lew-radio
            v-for="option in options"
            :key="option.value"
            :block="block"
            :iconable="iconable"
            :label="option.label"
            :size="size"
            :checked="modelValue == option.value"
            @update:checked="check(option.value)"
        />
    </lew-flex>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import LewRadio from './LewRadio.vue';

type Options = {
    label: string;
    value: string;
};

defineProps({
    modelValue: {
        type: String,
        default: () => {
            return '';
        },
        required: true,
    },
    block: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    iconable: {
        type: Boolean,
        default: true,
    },
    direction: {
        type: String,
        default: 'x',
    },
    size: {
        type: String,
        default: 'medium',
    },
    options: {
        type: Array as PropType<Options[]>,
        default: () => {
            return [];
        },
        required: true,
        validator: (value: Array<number>) => {
            const hasNameKey = value.every((option) =>
                Object.keys(option).includes('label')
            );
            const hasIdKey = value.every((option) =>
                Object.keys(option).includes('value')
            );
            return hasNameKey && hasIdKey;
        },
    },
});

const emit = defineEmits(['update:modelValue']);

const check = (_value: string) => {
    emit('update:modelValue', _value);
};
</script>

<style lang="scss" scoped>
.lew-radio-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 0px;
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
