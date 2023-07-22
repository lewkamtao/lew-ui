export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'title',
            description: '标题',
            type: 'string',
            default: "' '",
        },
        {
            name: 'content',
            description: '内容',
            type: 'string',
            default: "' '",
        },
        {
            name: 'okText',
            description: '确定按钮文本',
            type: 'string',
            default: '确定',
        },
        {
            name: 'cancelText',
            description: '取消按钮文本',
            type: 'string',
            default: '取消',
        },
        {
            name: 'okButtonColor',
            description: '确定按钮颜色',
            type: 'string',
            default: "''",
        },
        {
            name: 'cancelButtonColor',
            description: '取消按钮颜色',
            type: 'string',
            default: "''",
        },
        {
            name: 'iconType',
            description: '提示图标类型',
            type: "'success' | 'warning' | 'info' | 'error' | 'normal'",
            default: "' '",
        },
        {
            name: 'closeOnClickOverlay',
            description: '点击遮罩层关闭弹窗',
            type: 'boolean',
            default: 'true',
        },
        {
            name: 'layout',
            description: '布局',
            type: "'normal' | 'easy'",
            default: 'normal',
        },
    ],
};
