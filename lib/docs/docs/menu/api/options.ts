type MenuOptions = {
  label: string // 标题
  value?: string // 值
  children?: MenuOptions[] // 子类
  disabled?: boolean // 是否禁用
  level?: number // 层级
  icon?: string // 图标
  tagText?: string // 标签文本
  tagColor?: string // 标签颜色
}

export default {
  title: 'Options',
  columnsKey: 'props',
  data: [
    {
      name: 'label',
      description: '标题',
      type: 'string',
      default: "''"
    },
    {
      name: 'value',
      description: '值',
      type: 'string',
      default: "''"
    },
    {
      name: 'children',
      description: '禁用',
      type: 'MenuOptions[]',
      default: '[]'
    },
    {
      name: 'disabled',
      description: '禁用',
      type: 'boolean',
      default: 'false'
    },
    {
      name: 'icon',
      description: '图标类型',
      type: 'string',
      default: "''"
    },
    {
      name: 'tagText',
      description: '标签文本',
      type: 'string',
      default: "''"
    },
    {
      name: 'tagColor',
      description: '标签颜色',
      type: 'string',
      default: "''"
    }
  ]
}
