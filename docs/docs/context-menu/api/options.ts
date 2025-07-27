export default {
  title: 'Options(ContextMenus)',
  columnsKey: 'props',
  orderNum: 2,
  data: [
    {
      name: 'label',
      type: 'String',
      default: '-',
    },
    {
      name: 'value',
      type: 'String | Number',
      default: '-',
    },
    {
      name: 'icon',
      type: 'Function',
      default: '-',
    },
    {
      name: 'onClick',
      type: 'Function',
      default: '-',
    },
    {
      name: 'children',
      type: 'ContextMenus[]',
      default: '-',
    },
    {
      name: 'disabled',
      type: 'Boolean',
      default: 'false',
    },
    {
      name: 'isDividerLine',
      type: 'Boolean',
      default: 'false',
    },
    {
      name: 'checkable',
      type: 'Boolean',
      default: 'false',
    },
    {
      name: 'checked',
      type: 'Boolean',
      default: 'false',
    },
  ],
}
