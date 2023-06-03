export default {
  title: 'TableColumns',
  columnsKey: 'props',
  data: [
    {
      name: 'type',
      description: '类型',
      type: 'text | template',
      default: 'text',
    },
    {
      name: 'title',
      description: '表头标题',
      type: 'string',
      default: '-',
    },
    {
      name: 'field',
      description: '字段名',
      type: 'string',
      default: '-',
    },
    {
      name: 'width',
      description: '宽度',
      type: 'number',
      default: '-',
    },
    {
      name: 'fixed',
      description: '是否固定该列，固定方向',
      type: 'left | right',
      default: '-',
    },
    {
      name: 'x',
      description: '方向',
      type: 'start | center | end',
      default: '-',
    },
  ],
}
