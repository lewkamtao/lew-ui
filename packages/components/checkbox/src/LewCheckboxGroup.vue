<script lang="ts" setup>
import { checkboxGroupProps } from './checkbox';
import LewCheckbox from './LewCheckbox.vue';

const props = defineProps(checkboxGroupProps);

const emit = defineEmits(['update:modelValue']);

const check = (_value: string, checked: boolean) => {
    let updatedValue = [...props.modelValue];

    if (checked) {
        updatedValue.push(_value);
    } else {
        updatedValue.splice(updatedValue.indexOf(_value), 1);
    }
    emit('update:modelValue', updatedValue);
};

const getChecked = (_value: string | number) => {
    return props.modelValue.includes(_value);
};
</script>
<template>
    <lew-flex
        x="start"
        gap="15px"
        class="lew-checkbox-group"
        :class="`lew-checkbox-group-${direction} lew-checkbox-group-${size}`"
    >
        <lew-checkbox
            v-for="option in options"
            :key="option.value"
            :block="block"
            :iconable="iconable"
            :round="round"
            :size="size"
            :label="option.label"
            :checked="getChecked(option.value)"
            @change="check(option.value, $event)"
        />
    </lew-flex>
</template>

<style lang="scss" scoped>
.lew-checkbox-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.lew-checkbox-group-small {
    min-height: var(--lew-form-item-height-small);
}

.lew-checkbox-group-medium {
    min-height: var(--lew-form-item-height-medium);
}

.lew-checkbox-group-large {
    min-height: var(--lew-form-item-height-large);
}

.lew-checkbox-group.lew-checkbox-group-x {
    flex-direction: row;
}

.lew-checkbox-group.lew-checkbox-group-y {
    align-items: flex-start;
    flex-direction: column;
}
</style>
