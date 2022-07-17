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
    // 绑定值
    pageNum: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: Number,
        default: 1,
    },
    // 绑定值
    pageSize: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: Number,
        default: 20,
    },
    pageSizeOptions: {
        type: Array,
        default: [5, 10, 20, 30],
    },
    pageShowSize: {
        type: Number,
        default: 2,
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
