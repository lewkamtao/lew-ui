export const datePickerProps = {
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        required: true,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    autoClose: {
        type: Boolean,
        default: false,
    },
};

export const dateProps = {
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        required: true,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
};
