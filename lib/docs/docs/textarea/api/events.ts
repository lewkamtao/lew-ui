export default {
  title: 'Events',
  columnsKey: 'events',
  orderNum: 2,
  data: [
    {
      name: 'change',
      description: '值变化',
      params: '() => void'
    },
    {
      name: 'blur',
      description: '失焦',
      params: '() => void'
    },
    {
      name: 'focus',
      description: '聚焦',
      params: '() => void'
    }
  ]
}
