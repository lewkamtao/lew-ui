export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name:'value',
            description:
                '显示内容，如果无内容，则默认显示一个点，round可以控制其为圆点。',
            type: 'string | number',
            default: 'undefined',
        },
        {
            name:'type',
            description: '显示色彩类型',
            type: `primary | info | success | error | warning | normal`,
            default: 'normal',
        },
        {
            name:'round',
            description: '是否为圆形。',
            type: 'boolean',
            default: 'false',
        },
    ],
};
