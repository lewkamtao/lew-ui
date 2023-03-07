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
        default: () => {
            return true;
        },
    },
    cancel: {
        type: Function,
        default: () => {
            return true;
        },
    },
    layout: {
        type: String,
        default: 'normal',
    },
};
