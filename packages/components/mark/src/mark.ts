import { ExtractPropTypes, PropType } from 'vue';

export type markColor =
    | 'primary'
    | 'info'
    | 'success'
    | 'error'
    | 'warning'
    | 'normal';

export const markProps = {
    color: {
        type: String as PropType<markColor>,
        default: 'normal',
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
