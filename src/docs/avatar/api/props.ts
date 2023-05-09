export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name:'src',
            description: '链接',
            type: 'string',
            default: `''`,
        },
        {
            name:'alt',
            description: '原生属性',
            type: 'string',
            default: '-',
        },
        {
            name:'round',
            description: '形状，是否为圆形。',
            type: 'boolean',
            default: 'false',
        },
        {
            name:'status',
            description: '状态',
            type: 'online｜processing｜away｜offline｜busy',
            default: '-',
        },
        {
            name:'status-position',
            description: '状态标记位置',
            type: 'top-left｜top-right｜bottom-left｜bottom-right',
            default: 'bottom-right',
        },
        {
            name:'width',
            description: '宽度',
            type: 'string｜number',
            default: '-',
        },
        {
            name:'height',
            description: '高度',
            type: 'string｜number',
            default: '-',
        },
    ],
};
