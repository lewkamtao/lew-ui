import { PropType } from 'vue';
import { TableColumns } from './types';

export const tableProps = {
    columns: {
        type: Array as PropType<TableColumns[]>,
        default: () => {
            return [];
        },
    },
    width: {
        type: String,
        default: () => {
            return '';
        },
    },
    height: {
        type: String,
        default: () => {
            return '';
        },
    },

    data: {
        type: Array as any,
        default: () => {
            return [];
        },
    },
};
