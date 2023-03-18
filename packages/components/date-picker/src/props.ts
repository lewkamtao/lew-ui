export const datePickerProps = {
    modelValue: {
        type: String,
        required: false,
        default: '2022-09-02',
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'medium',
    },
    autoClose: {
        type: Boolean,
        default: true,
    },
};

export const dateRangePickerProps = {
    modelValue: {
        type: Array,
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
    autoClose: {
        type: Boolean,
        default: true,
    },
};

export const dateRangeProps = {
    modelValue: {
        type: Array,
        required: true,
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
