export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'size',
            description: '标题尺寸大小',
            type: 'string(px)',
            default: '24px',
        },
        {
            name: 'bold',
            description: '粗体值',
            type: `100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900`,
            default: '500',
        },
    ],
};
