export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'type',
      description: '消息类型',
      type: '\'success\' | \'warning\' | \'info\' | \'error\' | \'normal\'',
      default: '\' \'',
    },
    {
      name: 'title',
      description: '标题',
      type: 'string',
      default: '\' \'',
    },
    {
      name: 'content',
      description: '内容',
      type: 'string',
      default: '\' \'',
    },
    {
      name: 'closeOnClickOverlay',
      description: '点击遮罩层关闭弹窗',
      type: 'boolean',
      default: 'true',
    },
    {
      name: 'layout',
      description: '布局',
      type: '\'normal\' | \'easy\'',
      default: 'normal',
    },
  ],
}
