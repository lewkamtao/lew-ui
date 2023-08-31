import { ExtractPropTypes } from 'vue';

export const datePickerProps = {
    modelValue: {
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: 'medium',
    },
    clearable: {
        type: Boolean,
        default: () => false,
    },
    readonly: {
        type: Boolean,
        default: () => false,
    },
    disabled: {
        type: Boolean,
        default: () => false,
    },
};

export const dateRangePickerProps = {
    modelValue: {
        type: Object,
        default: () => {
            return {};
        },
        required: true,
    },
    startKey: {
        type: String,
        default: 'start',
    },
    endKey: {
        type: String,
        default: 'end',
    },
    size: {
        type: String,
        default: 'medium',
    },
    clearable: {
        type: Boolean,
        default: () => false,
    },
    readonly: {
        type: Boolean,
        default: () => false,
    },
    disabled: {
        type: Boolean,
        default: () => false,
    },
};

export const dateRangeProps = {
    modelValue: {
        type: Object,
        required: true,
    },
    startKey: {
        type: String,
        default: 'start',
    },
    endKey: {
        type: String,
        default: 'end',
    },
};

export const dateProps = {
    modelValue: {
        type: String,
        required: true,
    },
};

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
export type DateRangePickerProps = ExtractPropTypes<
    typeof dateRangePickerProps
>;
