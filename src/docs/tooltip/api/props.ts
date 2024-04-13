export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'tips',
            description: '内容',
            type: 'string',
            default: '-'
        },
        {
            name: 'placement',
            description: '位置',
            type: 'string',
            default: '-'
        },
        {
            name: 'trigger',
            description: '触发方式',
            type: 'hover | click',
            default: 'hover'
        },
        {
            name: 'allowHtml',
            description: '是否支持HTML',
            type: 'boolean',
            default: 'false'
        },
        {
            name: 'delay',
            description: '延迟显示',
            type: 'Array<number>',
            default: '[80,80]'
        }
    ]
};
