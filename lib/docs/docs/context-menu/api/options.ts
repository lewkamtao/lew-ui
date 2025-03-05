export default {
  title: 'Options(ContextMenus)',
  columnsKey: 'props',
  orderNum: 2,
  data: [
    {
      name: 'label',
      type: 'String',
      default: '-'
    },
    {
      name: 'value',
      type: 'String | Number',
      default: '-'
    },
    {
      name: 'renderIcon',
      type: 'Function',
      default: '-'
    },
    {
      name: 'children',
      type: 'ContextMenus[]',
      default: '-'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      default: false
    },
    {
      name: 'isDividerLine',
      type: 'Boolean',
      default: false
    }
  ]
}
