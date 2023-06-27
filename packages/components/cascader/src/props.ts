import { PropType } from 'vue';

export type CascaderOptions = {
    label: string;
    value: string;
    isHasChild?: boolean;
    disabled?: boolean;
    children?: CascaderOptions[];
};

export const cascaderProps = {
    modelValue: {
        type: [String, Number],
    },
    options: {
        type: Array as PropType<CascaderOptions[]>,
        default() {
            return [];
        },
    },
    trigger: {
        type: String,
        default: 'click',
        validator(value: string) {
            return ['click', 'hover'].includes(value);
        },
    },
    labelSlot: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: '请选择',
    },
    size: {
        type: String,
        default: 'medium',
    },
    clearable: {
        type: Boolean,
        default: () => false,
    },
    readonly: {
        type: Boolean,
        default: () => false,
    },
    disabled: {
        type: Boolean,
        default: () => false,
    },
    itemHeight: {
        type: Number,
        default: 30,
    },
    align: {
        type: String,
        default: 'left',
    },
    showCheckIcon: {
        type: Boolean,
        default: () => true,
    },
    defaultValue: {
        type: String,
        default: '',
    },
};
