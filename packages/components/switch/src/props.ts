export const switchProps = {
    modelValue: {
        type: Boolean,
        default: false,
        description: '绑定值',
    },
    round: {
        type: Boolean,
        default: true,
        description: '是否圆角',
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用',
    },
    request: {
        type: Function,
        default: '',
        description: '请求方法',
    },
    loading: {
        type: Boolean,
        default: false,
        description: '加载状态',
    },
};
