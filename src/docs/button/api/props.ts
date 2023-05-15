export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name:'type',
            description: '类型',
            type: `primary | info | success | error | warning | normal`,
            default: `normal`,
        },
        {
            name:'size',
            description: '尺寸大小',
            type: 'small ｜ medium ｜ large',
            default: 'medium',
        },
        {
            name:'loading',
            description: '是否为加载状态',
            type: 'boolean',
            default: 'false',
        },
        {
            name:'round',
            description: '是否为圆角',
            type: 'boolean',
            default: 'false',
        },
        {
            name:'disabled',
            description: '禁用',
            type: 'boolean',
            default: 'false',
        },
        {
            name:'is-text',
            description: '文字按钮',
            type: 'boolean',
            default: 'false',
        },
        {
            name:'is-icon',
            description: '图标按钮',
            type: 'boolean',
            default: 'false',
        },
    ],
};
