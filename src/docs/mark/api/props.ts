export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'type',
            description: '配色类型',
            type: `normal | success | error | warning | info`,
            default: 'normal',
        },
        {
            name: 'round',
            description: '是否圆角',
            type: 'boolean',
            default: false,
        },
        {
            name: 'to',
            description: '跳转链接',
            type: `string`,
            default: '#',
        },
        {
            name: 'bold',
            description: '配色类型',
            type: `normal | success | error | warning | info`,
            default: `''`,
        },
    ],
};
