import { ExtractPropTypes } from 'vue';

export const formProps = {
    modelValue: {
        type: Object,
        required: true,
    },
    options: {
        type: Object,
        required: true,
    },
    size: {
        type: String,
        default: 'medium',
    },
    width: {
        type: Number,
    },
    labelWidth: {
        type: Number,
    },
    direction: {
        type: String,
        default: 'x',
    },
};

export type FormProps = ExtractPropTypes<typeof formProps>;
