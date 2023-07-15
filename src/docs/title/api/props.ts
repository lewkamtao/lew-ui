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
            name: 'color',
            description: '色彩类型，漂亮的渐变色。',
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
            default: '',
        },
    ],
};
