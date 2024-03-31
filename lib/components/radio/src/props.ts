import { PropType, ExtractPropTypes } from 'vue';

export type RadioOptions = {
    label: string;
    value: string | number;
    disabled?: boolean;
};

export type RadioSize = 'small' | 'medium' | 'large';

export const radioProps = {
    checked: {
        type: Boolean,
        default: false,
        description: '是否选中'
    },
    label: {
        type: String,
        default: '',
        description: 'button 文本'
    },
    block: {
        type: Boolean,
        default: '',
        description: '是否块级元素'
    },
    iconable: {
        type: Boolean,
        default: true,
        description: '是否显示图标'
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用'
    },
    size: {
        type: String as PropType<RadioSize>,
        default: 'medium',
        description: '尺寸，可选值为 small、medium、large'
    }
};

export const radioGroupModel = {
    modelValue: {
        type: [String, Number],
        default: '',
        description: '绑定值'
    }
};

export const radioGroupProps = {
    block: {
        type: Boolean,
        default: false,
        description: '是否块级元素'
    },
    direction: {
        type: String,
        default: 'x',
        description: '排列方向，可选值为 x 或 y'
    },
    iconable: {
        type: Boolean,
        default: true,
        description: '是否显示图标'
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用'
    },
    size: {
        type: String as PropType<RadioSize>,
        default: 'medium',
        description: '尺寸，可选值为 small、medium、large'
    },
    options: {
        type: Array as PropType<RadioOptions[]>,
        default: [],
        description: '选项'
    }
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
