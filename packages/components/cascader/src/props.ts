import { PropType } from 'vue';

export type CascaderOptions = {
    label: string;
    value: [string, number];
    labelPaths?: string[];
    valuePaths?: string[];
    level?: number;
    isHasChild?: boolean;
    disabled?: boolean;
    parentLabelPaths?: string[];
    parentValuePaths?: string[];
    parentChildren?: CascaderOptions[];
    children?: CascaderOptions[];
};

export const cascaderProps = {
    modelValue: {
        type: [String, Number],
    },
    multiple: {
        type: Boolean,
        default() {
            return false;
        },
    },
    showAllLevels: {
        type: Boolean,
        default: () => true,
    },
    free: {
        type: Boolean,
        default() {
            return false;
        },
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
        default: () => true,
    },
    readonly: {
        type: Boolean,
        default: () => false,
    },
    disabled: {
        type: Boolean,
        default: () => false,
    },
};
