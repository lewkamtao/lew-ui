export default {
  title: 'Options',
  columnsKey: 'props',
  data: [
    {
      name: 'label',
      description: '选项组的标签',
      type: 'string',
      default: '-'
    },
    {
      name: 'value',
      description: '值',
      type: 'string',
      default: '-'
    },
    {
      name: 'isLeaf',
      description: '是否是叶子节点',
      type: 'boolean',
      default: '-'
    },
    {
      name: 'children',
      description: '值',
      type: 'CascaderOptions',
      default: '-'
    },
    {
      name: 'disabled',
      description: '禁用',
      type: 'boolean',
      default: '-'
    }
  ]
}
