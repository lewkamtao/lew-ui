export const _props = {
    direction: {
        type: String,
        default: 'x',
    },
    x: {
        type: String,
        default: 'center', // start center end
    },
    y: {
        type: String,
        default: 'center', // start center end
    },
    wrap: {
        type: Boolean,
        default: false, // around / between
    },
    mode: {
        type: String,
        default: '', // around / between
    },
    gap: {
        type: [String, Number],
        default: () => {
            return 10;
        },
    },
    width: { type: [String, Number] },
};
