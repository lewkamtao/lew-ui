export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'content',
      description: '内容',
      type: 'null',
      typeDesc: 'vnode|string',
      default: '-',
    },
    {
      name: 'placement',
      description: '位置',
      type: 'string',
      default: '-',
    },
    {
      name: 'trigger',
      description: '触发方式',
      type: 'hover | click',
      default: 'hover',
    },
    {
      name: 'delay',
      description: '延迟显示',
      type: 'Array<number>',
      default: '[80,80]',
    },
  ],
}
