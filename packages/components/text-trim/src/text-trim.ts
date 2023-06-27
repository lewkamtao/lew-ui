import { ExtractPropTypes } from 'vue';

export const textTrimProps = {
    text: {
        type: [String, Number, Boolean],
        default: () => '',
    },
    allowHTML: {
        type: Boolean,
        default: false,
    },

    placement: {
        type: String,
        default: 'top',
    },
    x: {
        type: String,
        default: 'start', // center end
    },
    lineClamp: {
        type: Number,
        default: undefined,
    },
};

export type TextTrimProps = ExtractPropTypes<typeof textTrimProps>;
