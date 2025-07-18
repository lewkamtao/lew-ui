export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 1,
  data: [
    {
      name: 'type',
      description: '消息类型',
      type: 'success | warning | error | info | normal',
      default: '\'normal\'',
    },
    {
      name: 'content',
      description: '消息文字',
      type: 'string',
      default: '--',
    },
    {
      name: 'duration',
      description: '时长',
      type: 'number',
      default: '3000',
    },
  ],
}
