import { PropType } from 'vue';

type Options = {
    label: string;
    value: string;
};

export const paginationProps = {
    total: {
        type: Number,
        default: 100,
    },
    pageNum: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 20,
    },
    pageSizeOptions: {
        type: Array,
        default: [5, 10, 20, 30],
    },
    pageShowSize: {
        type: Number,
        default: 3,
    },
    background: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
};
