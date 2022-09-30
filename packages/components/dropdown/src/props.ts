import { PropType } from 'vue';

export type Options = {
    label: number | string;
    value: number | string;
};

export const _props = {
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
        required: true,
        validator(value: PropType<Options[]>) {
            return value.length >= 0;
        },
    },
    trigger: {
        type: String,
        default: 'hover',
    },
    placement: {
        type: String,
        default: 'bottom',
    },
    arrow: {
        type: Boolean,
        default: true,
    },
    width: {
        type: String,
        default: '',
    },
    maxHeight: {
        type: String,
        default: '300px',
    },

    align: {
        type: String,
        default: 'left',
    },
};
