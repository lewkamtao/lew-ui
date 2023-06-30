import { PropType, ExtractPropTypes } from 'vue';

export type ButtonColor =
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
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'fill' | 'light' | 'ghost' | 'text';

export const buttonProps = {
    color: {
        type: String as PropType<ButtonColor>,
        default: () => {
            return 'blue';
        },
    },
    text: {
        type: String,
    },
    type: {
        type: String as PropType<ButtonType>,
        default: () => {
            return 'fill';
        },
    },
    icon: {
        type: String,
    },
    size: {
        type: String as PropType<ButtonSize>,
        default: () => {
            return 'medium';
        },
    },
    loading: {
        type: Boolean,
        default: false,
    },
    request: {
        type: Function,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
