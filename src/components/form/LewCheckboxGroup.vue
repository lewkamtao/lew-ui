<template>
    <div class="lew-checkbox-group" :class="`lew-checkbox-group-${direction}`">
        <lew-checkbox v-for="option in options" :key="option.id" :label="option.name" :checked="getChecked(option.id)"
            @update:checked="check(option.id, $event)" />
    </div>
</template>  
  
<script lang="ts" setup>
import { PropType } from 'vue';
import LewCheckbox from './LewCheckbox.vue';
type Options = {
    name: string;
    id: string | number;
};
const props = defineProps({
    value: {
        type: Array,
        default: () => {
            return [];
        },
        required: true,
    },
    direction: {
        type: String,
        default: "x",
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

const emit = defineEmits(['update:value']);

const check = (optionId: number | string, checked: boolean) => {
    let updatedValue = [...props.value];
    optionId = Number(optionId);

    if (checked) {
        updatedValue.push(optionId);
    } else {
        updatedValue.splice(updatedValue.indexOf(optionId), 1);
    }
    emit('update:value', updatedValue);
};

const getChecked = (optionId: string | number) => {
    optionId = Number(optionId);
    return props.value.includes(optionId);
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