export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'size',
            description: '标题尺寸大小',
            type: 'number',
            default: 24,
        },
        {
            name: 'bold',
            description: '粗体值',
            type: `100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900`,
            default: 500,
        },
        {
            name: 'type',
            description: '类型，漂亮的渐变色。',
            type: `primary | info | success | error | warning | normal`,
            default: '',
        },
    ],
};
