export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name:'options',
            description: '列表配置',
            type: 'array',
            default: '[]',
        },
        {
            name:'trigger',
            description: '触发方式',
            type: `hover | click`,
            default: 'hover',
        },
        {
            name:'placement',
            description: '下拉展示的位置',
            type: 'string',
            default: 'bottom',
        },
        {
            name:'width',
            description: '下拉气泡宽度',
            type: 'string(px)',
            default: '-',
        },
    ],
};
