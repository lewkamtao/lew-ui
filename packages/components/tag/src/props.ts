import { ExtractPropTypes, PropType } from 'vue';

type TagSize = 'small' | 'medium' | 'large';
type TagType = 'fill' | 'light' | 'ghost';
type TagColor =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'mint'
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink'
    | 'gray'
    | 'brown';

export const tagProps = {
    type: {
        type: String as PropType<TagType>,
        default: 'fill',
    },
    color: {
        type: String as PropType<TagColor>,
        default: 'blue',
    },
    size: {
        type: String as PropType<TagSize>,
        default: 'medium',
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

export type TagProps = ExtractPropTypes<typeof tagProps>;
