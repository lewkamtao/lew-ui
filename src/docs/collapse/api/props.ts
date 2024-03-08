export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'value',
            description: '值',
            type: 'number',
            default: 999.99
        },
        {
            name: 'size',
            description: '数字大小',
            type: `number`,
            default: 16
        },
        {
            name: 'sep',
            description: '千分位转换',
            type: `boolean`,
            default: false
        }
    ]
};
