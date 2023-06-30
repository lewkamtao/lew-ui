export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'type',
            description: '类型',
            type: `fill | light | ghost | text`,
            default: `normal`,
        },
        {
            name: 'text(slot)',
            description: '按钮文本',
            type: 'string',
            default: '""',
        },
        {
            name: 'color',
            description: '按钮色彩',
            type: `red | orange
            | yellow
            | green
            | mint
            | teal
            | cyan
            | blue
            | indigo
            | purple
            | pink
            | gray
            | brown`,
            default: 'blue',
        },
        {
            name: 'size',
            description: '尺寸大小',
            type: 'small ｜ medium ｜ large',
            default: 'medium',
        },
        {
            name: 'round',
            description: '是否为圆角',
            type: 'boolean',
            default: 'false',
        },
        {
            name: 'icon',
            description: '图标按钮',
            type: 'Lew-Icon',
            default: '""',
        },
        {
            name: 'disabled',
            description: '禁用',
            type: 'boolean',
            default: 'false',
        },
        {
            name: 'loading',
            description: '是否为加载状态',
            type: 'boolean',
            default: 'false',
        },
        {
            name: 'request',
            description: '异步请求',
            type: 'Promise(()=>{})',
            default: 'false',
        },
    ],
};
