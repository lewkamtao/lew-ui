<template>
    <lew-flex
        x="start"
        gap="15px"
        class="lew-checkbox-group"
        :class="`lew-checkbox-group-${direction}`"
    >
        <lew-checkbox
            v-for="option in options"
            :key="option.id"
            :block="block"
            :round="round"
            :label="option.name"
            :checked="getChecked(option.id)"
            @update:checked="check(option.id, $event)"
        />
    </lew-flex>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import LewCheckbox from './LewCheckbox.vue';

type Options = {
    name: string;
    id: string | number;
};
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => {
            return [];
        },
        required: true,
    },
    block: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    round: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    direction: {
        type: String,
        default: 'x',
    },
    options: {
        type: Array as PropType<Options[]>,
        default: () => {
            return [];
        },
        required: true,
        validator: (value: Array<number>) => {
            const hasNameKey = value.every((option) =>
                Object.keys(option).includes('name'),
            );
            const hasIdKey = value.every((option) =>
                Object.keys(option).includes('id'),
            );
            return hasNameKey && hasIdKey;
        },
    },
});

const emit = defineEmits(['update:modelValue']);

const check = (optionId: number | string, checked: boolean) => {
    let updatedValue = [...props.modelValue];
    optionId = Number(optionId);

    if (checked) {
        updatedValue.push(optionId);
    } else {
        updatedValue.splice(updatedValue.indexOf(optionId), 1);
    }
    emit('update:modelValue', updatedValue);
};

const getChecked = (optionId: string | number) => {
    optionId = Number(optionId);
    return props.modelValue.includes(optionId);
};
</script>
<style lang="scss" scoped>
.lew-checkbox-group {
    display: flex;
    align-items: center;
    font-size: 0px;
    flex-wrap: wrap;
}

.lew-checkbox-group.lew-checkbox-group-x {
    flex-direction: row;
}

.lew-checkbox-group.lew-checkbox-group-y {
    align-items: flex-start;
    flex-direction: column;
}
</style>
