import { ExtractPropTypes } from 'vue';

export const textTrimProps = {
    text: {
        type: String,
        default: '',
    },
    allowHTML: {
        type: Boolean,
        default: false,
    },
    arrow: {
        type: Boolean,
        default: true,
    },
    placement: {
        type: String,
        default: 'top',
    },
};

export type TextTrimProps = ExtractPropTypes<typeof textTrimProps>;
