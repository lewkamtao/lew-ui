export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'type',
            description: '类型',
            type: `primary | info | success | error | warning | normal`,
            default: `'normal'`,
        },
        {
            name: 'size',
            description: '尺寸',
            type: `small | medium | large`,
            default: 'medium',
        },
        {
            name: 'max-width',
            description: '最大宽度',
            type: 'number',
            default: 220,
        },
        {
            name: 'closable',
            description: '是否可关闭',
            type: 'boolean',
            default: 'false',
        },
        {
            name: 'disabled',
            description: '禁用',
            type: 'boolean',
            default: 'false',
        },
        {
            name: 'round',
            description: '是否是圆角',
            type: 'boolean',
            default: 'false',
        },
    ],
};
