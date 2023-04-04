import { PropType } from 'vue';
import { TableColumns } from './types';

export const tableProps = {
    dataSource: {
        type: Array as any,
        default: () => {
            return [];
        },
    },
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
        type: Number,
        default: undefined,
    },
};
