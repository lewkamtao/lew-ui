import { PropType } from 'vue';
import { TableColumns } from './types';

export const tableProps = {
    columns: {
        type: Array as PropType<TableColumns[]>,
        default: () => {
            return [];
        },
    },
    pickColumns: {
        type: Array,
        default: () => {
            return [];
        },
    },
    maxHeight: {
        type: String,
        default: () => {
            return '';
        },
    },
    dataSource: {
        type: Array as any,
        default: () => {
            return [];
        },
    },
};
