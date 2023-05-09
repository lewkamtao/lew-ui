export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            param: 'size',
            description: '标题尺寸大小',
            type: 'number',
            default: 24,
        },
        {
            param: 'bold',
            description: '粗体值',
            type: `100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900`,
            default: 500,
        },
    ],
};
