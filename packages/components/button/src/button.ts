import { PropType, ExtractPropTypes } from 'vue';

export type ButtonType = 'primary' | 'normal' | 'success' | 'error' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonMode = 'text' | 'icon' | 'iconText' | 'normal';

export const buttonProps = {
    type: {
        type: String as PropType<ButtonType>,
        default: () => {
            return 'normal';
        },
    },
    mode: {
        type: String as PropType<ButtonMode>,
        default: () => {
            return 'normal';
        },
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
