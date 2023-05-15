export default {
    title: 'Events',
    columnsKey: 'events',
    data: [
        {
            name: 'change',
            description: '值改变触发',
            params: '() => value',
        },
        {
            name: 'focus',
            description: '获取焦点时触发',
            params: '() => value',
        },
        {
            name: 'blur',
            description: '选择框失去焦点时触发',
            params: '() => value',
        },
        {
            name: 'clear',
            description: '点击清除按钮时触发',
            params: '() => value',
        },
    ],
};
