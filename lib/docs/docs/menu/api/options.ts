export default {
  title: 'MenuOptions',
  columnsKey: 'props',
  data: [
    {
      name: 'label',
      description: '菜单项的显示文本',
      type: 'string',
      default: "''"
    },
    {
      name: 'value',
      description: '菜单项的唯一标识',
      type: 'string',
      default: "''"
    },
    {
      name: 'children',
      description: '子菜单项',
      type: 'MenuOptions[]',
      default: '[]'
    },
    {
      name: 'disabled',
      description: '是否禁用该菜单项',
      type: 'boolean',
      default: 'false'
    },
    {
      name: 'icon',
      description: '菜单项的图标',
      type: 'string',
      default: "''"
    },
    {
      name: 'tagProps',
      description: '菜单项的标签属性',
      type: 'TagProps',
      default: '() => ({})'
    }
  ]
}
