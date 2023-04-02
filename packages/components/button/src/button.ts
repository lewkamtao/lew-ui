import { PropType, ExtractPropTypes } from 'vue';

export type ButtonType = 'primary' | 'normal' | 'success' | 'error' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

export const buttonProps = {
    type: {
        type: String as PropType<ButtonType>,
        default: () => {
            return 'normal';
        },
    },
    text: {
        type: String,
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
