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
        default: 'blue',
        description: '颜色',
    },
    text: {
        type: String,
        default: '', 
        description: '文本', 
    }, 
    type: {
        type: String as PropType<ButtonType>,
        default: 'fill',
        description: '文本',
    },
    icon: {
        type: String,
        default: '',
        description: '图标',
    },
    size: {
        type: String as PropType<ButtonSize>,
        default: 'medium',
        description: '大小',
    },
    loading: {
        type: Boolean,
        default: false,
        description: '加载状态',
    },
    request: {
        type: Function,
        default: null,
        description: '请求方法',
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用',
    },
    round: {
        type: Boolean,
        default: false,
        description: '圆的',
    },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
