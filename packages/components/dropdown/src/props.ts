import { PropType } from 'vue';
import { LewDropdownOptions } from './type';

export const _props = {
    options: {
        type: Array as PropType<LewDropdownOptions[]>,
        default() {
            return [];
        },
        required: true,
        validator(value: PropType<LewDropdownOptions[]>) {
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
