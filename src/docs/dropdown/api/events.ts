export default {
    title: 'Events',
    columnsKey: 'events',
    data: [
        {
            name:'show',
            description: '展示下拉',
            type: 'function',
            default: '() => {}',
        },
        {
            name:'hide',
            description: '收起下拉',
            type: `function`,
            default: '() => {}',
        },
    ],
};
