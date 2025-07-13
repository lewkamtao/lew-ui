// 'clear', 'blur', 'input', 'focus', 'change', 'ok'
export default {
    title: 'Events',
    columnsKey: 'events',
    orderNum: 2,
    data: [
        {
            name: 'change',
            description: '值变化',
            params: '() => void',
        },
        {
            name: 'blur',
            description: '失焦',
            params: '() => void',
        },
        {
            name: 'focus',
            description: '聚焦',
            params: '() => void',
        },
        {
            name: 'input',
            description: '输入内容',
            params: '() => void',
        },
        {
            name: 'ok',
            description: '按下回车键触发事件',
            params: '() => void',
        },
        {
            name: 'clear',
            description: '清空文本域',
            params: '() => void',
        },
    ],
}
