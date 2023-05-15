export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'model-value (v-model)',
            description: '绑定值',
            type: 'string',
            default: '-',
        },
        {
            name: 'options',
            description: '绑定值',
            type: 'Array<RadioOptions>',
            default: '-',
        },
        {
            name: 'size',
            description: '尺寸',
            type: 'small | medium | large',
            default: 'medium',
        },
        {
            name: 'block',
            description: '块模式',
            type: 'boolean',
            default: 'false',
        },
        {
            name: 'disabled',
            description: '禁用',
            type: 'boolean',
            default: 'false',
        },
        {
            name: 'direction',
            description: '方向',
            type: 'string',
            default: 'x',
        },
        {
            name: 'iconable',
            description: '是否开启图标，仅在block开启之后生效。',
            type: 'boolean',
            default: 'false',
        },
    ],
};
