import { PropType, ExtractPropTypes } from 'vue';

export type TabsOptions = {
    label: string;
    value: [String, Number];
};
export type TabsSize = 'small' | 'medium' | 'large';

export type TabsType = 'block' | 'line';
export const tabsProps = {
    modelValue: {
        type: [String, Number],
        default: '',
        description: '绑定值',
    },
    options: {
        type: Array as PropType<TabsOptions[]>,
        default: [],
        description: '配置列表',
    },
    size: {
        type: String as PropType<TabsSize>,
        default: 'medium',
        description: '尺寸，可选值为 small、medium、large',
    },
    width: {
        type: [Number, String],
        default: '',
        description: '宽度',
    },
    itemWidth: {
        type: [Number, String],
        default: '',
        description: '选项宽度',
    },
    round: {
        type: Boolean,
        default: false,
        description: '是否圆角',
    },
    type: {
        type: String as PropType<TabsType>,
        default: 'block',
        description: '类型，可选值为 block 或 line',
    },
};
export type TabsProps = ExtractPropTypes<typeof tabsProps>;
