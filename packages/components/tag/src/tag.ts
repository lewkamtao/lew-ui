import { ExtractPropTypes, PropType } from 'vue';

type TagSize = 'small' | 'medium' | 'large';
type TagType = 'primary' | 'info' | 'success' | 'error' | 'warning' | 'normal';

export const tagProps = {
    type: {
        type: String as PropType<TagType>,
        default: 'normal',
    },
    size: {
        type: String as PropType<TagSize>,
        default: 'medium',
    },
    maxWidth: {
        type: Number,
        default: 220,
    },
    round: {
        type: Boolean,
        default: false,
    },
    closable: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
};

export type AvatarProps = ExtractPropTypes<typeof tagProps>;
