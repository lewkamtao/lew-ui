import { ExtractPropTypes, PropType } from 'vue';

type markColor =
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

export const markProps = {
    color: {
        type: String as PropType<markColor>,
        default: 'blue',
    },
    round: {
        type: Boolean,
        default: false,
    },
    to: {
        type: String,
        default: '',
    },
    bold: {
        type: Number,
        default: 400,
    },
};
export type MarkProps = ExtractPropTypes<typeof markProps>;
