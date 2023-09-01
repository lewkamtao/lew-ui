import { ExtractPropTypes, PropType } from 'vue';
export type datePickerSize = 'small' | 'medium' | 'large';

export const datePickerProps = {
    modelValue: {
        type: String,
        default: '',
        description: '绑定值',
    },
    size: {
        type: String as PropType<datePickerSize>,
        default: 'medium',
        description: '尺寸，可选值为 small、medium、large',
    },
    clearable: {
        type: Boolean,
        default: "",
        description: '是否显示清除按钮',
    },
    readonly: {
        type: Boolean,
        default: false,
        description: '是否只读',
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用',
    },
};

export const dateRangePickerProps = {
    modelValue: {
        type: Object,
        default: {},
        description: '绑定值，可选值为{start: Date, end: Date}',
    },
    startKey: {
        type: String,
        default: 'start',
        description: '开始日期的字段名',
    },
    endKey: {
        type: String,
        default: 'end',
        description: '结束日期的字段名',
    },
    size: {
        type: String,
        default: 'medium',
        description: '尺寸，可选值为 small、medium、large',
    },
    clearable: {
        type: Boolean,
        default: false,
        description: '是否显示清除按钮',
    },
    readonly: {
        type: Boolean,
        default: false,
        description: '是否只读',
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用',
    },
};

export const dateRangeProps = {
    modelValue: {
        type: Object,
        required: true,
        description: '绑定值，可选值为{start: Date, end: Date}',
    },
    startKey: {
        type: String,
        default: 'start',
        description: '开始日期的字段名',
    },
    endKey: {
        type: String,
        default: 'end',
        description: '结束日期的字段名',
    },
};

export const dateProps = {
    modelValue: {
        type: String,
        required: true,
        description: '绑定值',
    },
};

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
export type DateRangePickerProps = ExtractPropTypes<
    typeof dateRangePickerProps
>;
