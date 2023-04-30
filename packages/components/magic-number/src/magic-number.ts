import { ExtractPropTypes } from 'vue';

export const magicNumberProps = {
    value: {
        type: Number,
        default: 999.99,
    },
    size: {
        type: Number,
        default: 16,
    },
    sep: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
};
export type MagicNumberProps = ExtractPropTypes<typeof magicNumberProps>;
