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
