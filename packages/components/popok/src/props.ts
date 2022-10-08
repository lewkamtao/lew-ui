export const _props = {
    type: {
        type: String,
        default: 'warning',
    },
    width: { type: String, default: '250px' },
    trigger: {
        type: String,
        default: 'click',
    },
    title: {
        type: String,
        default: '',
    },
    ok: {
        type: Function,
    },
    cancel: {
        type: Function,
    },
    content: {
        type: String,
        default: '',
    },
    placement: {
        type: String,
        default: 'top',
    },
};
