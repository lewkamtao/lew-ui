import { PropType } from 'vue';
type Options = {
    label: string;
    value: string;
};
const _props = {
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: [String, Array],
        required: true,
    },
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
        required: true,
        validator(value: PropType<Options[]>) {
            return value.length > 0;
        },
    },
    trigger: {
        type: String,
        default: 'click',
        validator(value: string) {
            return ['click', 'hover'].includes(value);
        },
    },
    multiple: {
        type: Boolean,
        default: false,
    },
};

export default _props;
