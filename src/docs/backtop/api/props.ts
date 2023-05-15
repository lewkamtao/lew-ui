export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name:'right',
            description: '控制其显示位置，距离页面右边距',
            type: 'number',
            default: '40',
        },
        {
            name:'bottom',
            description: '控制其显示位置，距离页面底部距离',
            type: 'number',
            default: '40',
        },
        {
            name:'valveHeight',
            description: '滚动高度达到该阀门数值才会出现',
            type: 'number',
            default: 50,
        },
        {
            name:'target',
            description: '触发滚动的对象, class名',
            type: 'string',
            default: '-',
        },
    ],
};
