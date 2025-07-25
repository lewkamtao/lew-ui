export default {
  title: 'Options',
  columnsKey: 'options',
  orderNum: 5,
  data: [
    {
      name: 'label',
      description: '标题',
      type: 'string',
      default: '-',
    },
    {
      name: 'value',
      description: '值',
      type: 'string',
      default: '',
    },
    {
      name: 'disabled',
      description: '禁用',
      type: 'boolean',
      default: 'false',
    },
  ],
}
