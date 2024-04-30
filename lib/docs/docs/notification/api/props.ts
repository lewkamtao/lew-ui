export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'type',
      description: '提示类型',
      type: 'success | warning | error | info | normal',
      default: '3000'
    },
    {
      name: 'title',
      description: '标题',
      type: 'array',
      default: '[]'
    },
    {
      name: 'content',
      description: '内容',
      type: 'array',
      default: '[]'
    },
    {
      name: 'delay',
      description: '延迟时间',
      type: 'array',
      default: '[]'
    }
  ]
}
