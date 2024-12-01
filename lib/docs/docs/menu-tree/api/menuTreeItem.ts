export default {
  title: 'MenuTreeItem',
  columnsKey: 'props',
  data: [
    {
      name: 'key',
      description: '菜单项的唯一标识',
      type: 'string | number',
      default: '-'
    },
    {
      name: 'title',
      description: '菜单项的标题',
      type: 'string',
      default: "''"
    },
    {
      name: 'renderIcon',
      description: '渲染菜单项图标的函数',
      type: '() => VNode',
      default: '() => {}'
    },
    {
      name: 'children',
      description: '子菜单项',
      type: 'MenuTreeItem[]',
      default: '[]'
    }
  ]
}