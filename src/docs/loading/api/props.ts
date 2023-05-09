export default {
    title: 'v-loading',
    columnsKey: 'props',
    data: [
        {
            param: 'content',
            description: '内容',
            type: 'string',
            default: "-",
        },
        {
            param: 'placement',
            description: '位置',
            type: 'string',
            default: "-",
        },
        {
            param: 'trigger',
            description: '触发方式',
            type: 'hover | click',
            default: 'hover',
        },
        {
            param: 'allowHTML',
            description: '是否支持HTML',
            type: 'boolean',
            default: 'false',
        },
        {
            param: 'arrow',
            description: '是否需要箭头',
            type: 'boolean',
            default: 'true',
        },
    ],
};
