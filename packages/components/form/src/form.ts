import { ExtractPropTypes } from 'vue';

export const formProps = {
    width: {
        type: String,
        default: '',
    },
    labelWidth: {
        type: String,
        default: 'auto',
    },
    labelAlign: {
        type: String,
        default: 'end',
    },
    direction: {
        type: String,
        default: 'x',
    },
};
export const formItemProps = {
    label: {
        type: String,
        default: '标题',
    },
    labelWidth: {
        type: String,
        default: '',
    },
    labelAlign: {
        type: String,
        default: '',
    },
    direction: {
        type: String,
        default: '',
    },
};

export type FormProps = ExtractPropTypes<typeof formProps>;
export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
