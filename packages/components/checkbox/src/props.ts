import { PropType, ExtractPropTypes } from 'vue';

export type CheckboxOptions = {
    label: string;
    value: string | number;
    disabled?: boolean;
};
export type CheckboxSize = 'small' | 'medium' | 'large';

export type CheckboxGroupDirectionType = 'x' | 'y';

export const checkboxProps = {
    modelValue: {
        type: Boolean,
        default: false,
        description: '值（双向绑定）',
    },
    checked: {
        type: Boolean,
        default: false,
        description: '选中状态',
    },
    label: {
        type: String,
        default: '',
        description: '标签',
    },
    block: {
        type: Boolean,
        default: false,
        description: '是否为块状',
    },
    round: {
        type: Boolean,
        default: false,
        description: '是否圆形',
    },
    iconable: {
        type: Boolean,
        default: true,
        description: '图标开启',
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用',
    },
    size: {
        type: String as PropType<CheckboxSize>,
        default: 'medium',
        description: '尺寸大小',
    },
};

export const checkboxGroupProps = {
    options: {
        type: Array as PropType<CheckboxOptions[]>,
        default: [],
        required: true,
        description: '配置项',
    },
    modelValue: {
        type: [Array || undefined],
        default: [],
        required: true,
        description: '值（双向绑定）',
    },
    block: {
        type: Boolean,
        default: false,
        description: '是否块状',
    },
    round: {
        type: Boolean,
        default: false,
        description: '是否圆形',
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用',
    },
    direction: {
        type: String as PropType<CheckboxGroupDirectionType>,
        default: 'x',
        description: '组排列方向',
    },
    iconable: {
        type: Boolean,
        default: true,
        description: '图标开启',
    },
    size: {
        type: String as PropType<CheckboxSize>,
        default: 'medium',
        description: '尺寸大小',
    },
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;
