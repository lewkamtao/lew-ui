export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'content',
      description: '内容',
      type: 'string',
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
      name: 'allowHTML',
      description: '是否支持HTML',
      type: 'boolean',
      default: 'false',
    },
    {
      name: 'arrow',
      description: '是否需要箭头',
      type: 'boolean',
      default: 'true',
    },
  ],
}
