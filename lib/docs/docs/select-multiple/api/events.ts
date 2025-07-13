export default {
    title: 'Events',
    columnsKey: 'events',
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
    ],
}
