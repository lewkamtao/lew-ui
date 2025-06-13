export default {
  title: 'Options',
  columnsKey: 'props',
  data: [
    {
      name: 'label',
      description: '选项的标签文本',
      type: 'string | (() => any)',
      default: '-'
    },
    {
      name: 'icon',
      description: '选项的图标',
      type: 'string | (() => any)',
      default: '-'
    },
    {
      name: 'customRender',
      description: '自定义渲染选项内容的函数',
      type: '() => any',
      default: '-'
    },
    {
      name: 'onClick',
      description: '点击选项时的回调函数',
      type: '() => void',
      default: '-'
    }
  ]
}
