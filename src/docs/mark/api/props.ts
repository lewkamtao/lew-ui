export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'color',
            description: '配色类型',
            type: `red
            | orange
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
            description: '字重',
            type: `number`,
            default: `''`,
        },
    ],
};
