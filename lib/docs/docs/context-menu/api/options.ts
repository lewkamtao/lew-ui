export default {
  title: 'Options (LewContextMenus)',
  columnsKey: 'props',
  orderNum: 2,
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
      type: 'string | number',
      default: '-'
    },
    {
      name: 'type',
      description: '类型',
      type: 'string',
      default: 'default'
    },

    {
      name: 'icon',
      description: '图标',
      type: 'string',
      default: '-'
    },

    {
      name: 'children',
      description: '子节点集合',
      type: 'LewContextMenus[]',
      default: '-'
    },
    {
      name: 'disabled',
      description: '禁用选项',
      type: 'boolean',
      default: false
    },
    {
      name: 'isDividerLine',
      description: '是否是分割线',
      type: 'boolean',
      default: false
    },

    {
      name: '[key]',
      description: '自定义属性',
      type: '[type] => any',
      default: '-'
    }
  ]
}
