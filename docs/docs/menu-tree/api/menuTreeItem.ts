export default {
  title: 'MenuTreeItem',
  columnsKey: 'props',
  data: [
    {
      name: 'label',
      type: 'string | Function',
      default: '\'\'',
    },
    {
      name: 'value',
      type: 'string | number',
      required: true,
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
    },
    {
      name: 'isLeaf',
      type: 'boolean',
      default: 'false',
    },
    {
      name: 'icon',
      type: 'Function',
      default: '() => {}',
    },
    {
      name: 'level',
      type: 'number',
      default: '1',
    },
    {
      name: 'tagProps',
      type: 'TagProps',
      default: '() => ({})',
    },
  ],
}
