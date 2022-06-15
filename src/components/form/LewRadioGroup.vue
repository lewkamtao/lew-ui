<template>
    <div class="lew-radio-group" :class="`lew-radio-group-${direction}`">
        <lew-radio
            v-for="option in options"
            :key="option.id"
            :label="option.name"
            :checked="value == option.id"
            @update:checked="check(option.id)"
        />
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import LewRadio from './LewRadio.vue';
type Options = {
    name: string;
    id: string | number;
};
defineProps({
    value: {
        type: Number,
        default: () => {
            return 0;
        },
        required: true,
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

const emit = defineEmits(['update:value']);

const check = (optionId: number | string) => {
    emit('update:value', Number(optionId));
};
</script>

<style lang="scss" scoped>
.lew-radio-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 0px;
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
