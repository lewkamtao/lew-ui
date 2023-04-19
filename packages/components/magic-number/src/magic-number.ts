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
};
export type MagicNumberProps = ExtractPropTypes<typeof magicNumberProps>;
