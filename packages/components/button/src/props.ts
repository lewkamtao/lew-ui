export const _props = {
    type: {
        type: String,
        default: () => {
            return 'primary';
        },
    },
    size: {
        type: String,
        default: () => {
            return 'medium';
        },
    },
    loading: {
        type: Boolean,
        default: false,
    },
    request: {
        type: Function,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    isIcon: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
    isText: {
        type: Boolean,
        default: false,
    },
};
