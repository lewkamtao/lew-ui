import { ExtractPropTypes } from 'vue';

export const datePickerProps = {
    modelValue: {
        type: String,
        required: false,
    },
    multiple: {
        type: Boolean,
        default: false,
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
    multiple: {
        type: Boolean,
        default: false,
    },
};

export const dateProps = {
    modelValue: {
        type: String,
        required: true,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
};

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
export type DateRangePickerProps = ExtractPropTypes<
    typeof dateRangePickerProps
>;
