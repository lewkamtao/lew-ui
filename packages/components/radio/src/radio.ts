import { PropType, ExtractPropTypes } from 'vue';

export type RadioOptions = {
    label: string;
    value: string | number;
    disabled?: boolean;
};

export const radioProps = {
    checked: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    label: {
        type: String,
        default: () => {
            return '';
        },
    },
    block: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    round: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    iconable: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'medium',
    },
};

export const radioGroupProps = {
    modelValue: {
        type: String || Number,
        default: '',
    },
    block: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    round: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    direction: {
        type: String,
        default: 'x',
    },
    iconable: {
        type: Boolean,
        default: true,
    },
    size: {
        type: String,
        default: 'medium',
    },
    options: {
        type: Array as PropType<RadioOptions[]>,
        default: () => {
            return [];
        },
        required: true,
        validator: (value: Array<RadioOptions>) => {
            const hasNameKey = value.every((option) =>
                Object.keys(option).includes('label')
            );
            const hasIdKey = value.every((option) =>
                Object.keys(option).includes('value')
            );
            return hasNameKey && hasIdKey;
        },
    },
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
