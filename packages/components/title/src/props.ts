import { ExtractPropTypes, PropType } from 'vue';

type BoldType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TitleColor =
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

export const titleProps = {
    bold: {
        type: Number as PropType<BoldType>,
        default: 500,
    },
    size: {
        type: [Number, String],
        default: 24,
    },
    color: {
        type: String as PropType<TitleColor>,
        default: '',
    },
};

export type TitleProps = ExtractPropTypes<typeof titleProps>;
