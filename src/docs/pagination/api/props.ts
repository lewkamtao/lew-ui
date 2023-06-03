export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'total',
      description: '总数',
      type: 'number',
      default: '100',
    },
    {
      name: 'v-model:currentPage',
      description: '当前页码，双向绑定',
      type: 'number',
      default: '1',
    },
    {
      name: 'pageSize',
      description: '页大小',
      type: 'number',
      default: '20',
    },
    {
      name: 'visiblePagesCount',
      description: '展示页码长度',
      type: 'number',
      default: '5',
    },
    {
      name: 'pageSizeOptions',
      description: '页码配置',
      type: 'Options',
      default: '-',
    },
  ],
}
