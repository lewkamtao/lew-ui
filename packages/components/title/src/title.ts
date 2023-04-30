import { ExtractPropTypes, PropType } from 'vue';

type boldType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export const titleProps = {
    bold: {
        type: Number as PropType<boldType>,
        default: 500,
    },
    size: {
        type: Number,
        default: 24,
    },
};

export type TitleProps = ExtractPropTypes<typeof titleProps>;
