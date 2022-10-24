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
    // eslint-disable-next-line vue/require-default-prop
    type: {
        type: String,
        default: '',
    },
    // eslint-disable-next-line vue/require-default-prop
    ok: {
        type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    cancel: {
        type: Function,
    },
    layout: {
        type: String,
        default: 'normal',
    },
};
