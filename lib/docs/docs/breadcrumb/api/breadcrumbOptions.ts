export default {
  title: 'BreadcrumbOptions',
  columnsKey: 'props',
  data: [
    {
      name: 'label',
      description: '文本内容',
      type: 'String',
      default: "''"
    },
    {
      name: 'to',
      description: '绑定跳转链接',
      type: `String`,
      default: "''"
    },
    {
      name: 'active',
      description: '是否是选中状态',
      type: 'Boolean',
      default: 'false'
    }
  ]
}
