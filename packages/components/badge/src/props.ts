import { ExtractPropTypes, PropType } from 'vue';

type badgeColor =
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

export const badgeProps = {
    value: {
        type: String,
        default: '',
    },
    color: {
        type: String as PropType<badgeColor>,
        default: 'red',
    },
};

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;
