export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'options',
      description: '表单配置',
      type: 'Array<FormOptions>',
      default: '[]',
    },
    {
      name: 'size',
      description: '表单大小',
      type: 'small ｜ medium ｜ large',
      default: 'medium',
    },
    {
      name: 'width',
      description: '宽度',
      type: 'number | string',
      default: '',
    },
    {
      name: 'labelWidth',
      description: '表单item方向',
      type: 'number | string',
      default: '',
    },
    {
      name: 'direction',
      description: '表单item方向',
      type: 'x | y',
      default: 'x',
    },
  ],
}
