export const _props = {
    visible: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: '',
    },
    ok: {
        type: Function,
    },
    cancel: {
        type: Function,
    },
    layout: {
        type: String,
        default: 'normal',
    },
};
