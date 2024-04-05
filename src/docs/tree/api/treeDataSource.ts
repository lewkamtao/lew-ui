export default {
    title: 'TreeDataSource',
    columnsKey: 'props',
    data: [
        {
            name: 'label',
            description: '选项组的标签',
            type: 'string',
            default: `""`
        },
        {
            name: 'key',
            description: '值',
            type: `string`,
            default: `""`
        },
        {
            name: 'isLeaf',
            description: '是否是叶子节点，当数据源为异步请求时有意义。',
            type: `boolean`,
            default: '-'
        },
        {
            name: 'children',
            description: '子节点集合',
            type: `TreeOptions[]`,
            default: '-'
        },
        {
            name: 'disabled',
            description: '禁用',
            type: `boolean`,
            default: 'false'
        }
    ]
};
