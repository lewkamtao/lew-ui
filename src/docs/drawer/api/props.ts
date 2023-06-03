export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'v-model:visible',
      description: '打开抽屉',
      type: 'boolean',
      default: 'false',
    },
    {
      name: 'width',
      description: '宽度',
      type: 'number',
      default: '30(百分比)',
    },
    {
      name: 'height',
      description: '高度',
      type: 'number',
      default: '30(百分比)',
    },
    {
      name: 'position',
      description: '位置',
      type: 'string',
      default: 'right(left,right,top,bottom)',
    },
  ],
}
