export default {
  title: 'SelectOptions',
  columnsKey: 'props',
  data: [
    {
      name: 'label',
      description: '选项组的标签',
      type: 'string',
      default: '-',
    },
    {
      name: 'value',
      description: '值',
      type: 'string',
      default: '-',
    },
    {
      name: 'disabled',
      description: '禁用选项',
      type: 'boolean',
      default: false,
    },
  ],
}
