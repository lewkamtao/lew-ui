<template>
    <div class="lew-checkbox-group">
        <lew-checkbox
            v-for="option in options"
            :key="option"
            :label="option.name"
            :checked="value.includes(option.id)"
            @update:checked="check(option.id, $event)"
        />
    </div>
</template>

<script lang="ts" setup>
import LewCheckbox from './LewCheckbox.vue';
const props = defineProps({
    value: {
        type: Array,
        default: () => {
            return [];
        },
        required: true,
    },
    options: {
        type: Array,
        default: () => {
            return [];
        },
        required: true,
        validator: (value) => {
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

const check = (optionId, checked) => {
    let updatedValue = [...props.value];
    if (checked) {
        updatedValue.push(optionId);
    } else {
        updatedValue.splice(updatedValue.indexOf(optionId), 1);
    }
    emit('update:value', updatedValue);
};
</script>
