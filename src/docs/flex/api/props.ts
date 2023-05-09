export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name:'direction',
            description: '排列方向',
            type: 'x | y',
            default: 'x',
        },
        {
            name:'x',
            description: '横向对齐方向',
            type: `start | center | end`,
            default: 'center',
        },
        {
            name:'y',
            description: '垂直对齐方向',
            type: `start | center | end`,
            default: 'center',
        },
        {
            name:'mode',
            description:
                '排序模式，这是个可选项，定义之后会干扰x或y的对齐方向，这取决于你的direction。',
            type: `between | around`,
            default: '-',
        },
        {
            name:'wrap',
            description: '让元素在必要的时候换行',
            type: `boolean`,
            default: 'false',
        },
        {
            name:'gap',
            description: '元素之间的空隙',
            type: `number`,
            default: '10',
        },
        {
            name:'width',
            description: '父元素宽度',
            type: `number`,
            default: '-',
        },
    ],
};
