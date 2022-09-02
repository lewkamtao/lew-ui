export const datePickerProps = {
    modelValue: {
        type: String,
        required: false,
        default: '2022-9-2',
    },
    multiple: {
        type: Boolean,
        default: false,
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
    autoClose: {
        type: Boolean,
        default: true,
    },
};

export const dateProps = {
    modelValue: {
        type: String,
        required: true,
        default: ['2022-9-2', '2022-9-30'],
    },
    multiple: {
        type: Boolean,
        default: false,
    },
};
