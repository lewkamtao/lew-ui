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
        description: '此项为空时，则默认显示一个点。',
    },
    color: {
        type: String as PropType<badgeColor>,
        default: 'red',
        description: '颜色',
    },
};

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;
