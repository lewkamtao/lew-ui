export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'title',
      description: '标题',
      type: 'string',
      default: '',
    },
    {
      name: 'content',
      description: '内容',
      type: 'string',
      default: '',
    },
    {
      name: 'width',
      description: '通知框宽度',
      type: 'number',
      default: '320',
    },
    {
      name: 'delay',
      description: '延迟时间',
      type: 'number',
      default: '3000',
    },
    {
      name: 'showProgress',
      description: '是否显示进度条',
      type: 'boolean',
      default: 'false',
    },
  ],
};
