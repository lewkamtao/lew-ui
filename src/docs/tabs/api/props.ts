export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'modelValue',
            description: '值',
            type: 'string | number',
            default: `''`,
        },
        {
            name: 'options',
            description: '配置',
            type: `Array<TabsOptions>`,
            default: [],
        },
        {
            name: 'width',
            description: '宽度',
            type: `number`,
            default: '-',
        },
        {
            name: 'itemWidth',
            description: 'item 宽度',
            type: `number`,
            default: '-',
        },
        {
            name: 'round',
            description: '是否圆角',
            type: `boolean`,
            default: 'false',
        },
        {
            name: 'type',
            description: '类型',
            type: `block | line`,
            default: 'block',
        },
    ],
};
