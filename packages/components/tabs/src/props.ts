import { PropType } from 'vue';

type Options = {
    label: string;
    value: string;
};

export const tabsProps = {
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
    },
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
    width: {
        type: String,
        default: '',
    },
    itemWidth: {
        type: String,
        default() {
            return '';
        },
    },
    round: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'block',
    },
};
