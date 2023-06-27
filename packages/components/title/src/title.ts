import { ExtractPropTypes, PropType } from 'vue';

type boldType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TitleType =
    | 'primary'
    | 'info'
    | 'success'
    | 'error'
    | 'warning'
    | 'normal';

export const titleProps = {
    bold: {
        type: Number as PropType<boldType>,
        default: 500,
    },
    size: {
        type: [Number, String],
        default: 24,
    },
    type: {
        type: String as PropType<TitleType>,
        default: '',
    },
};

export type TitleProps = ExtractPropTypes<typeof titleProps>;
