export default {
  title: 'Events',
  columnsKey: 'events',
  data: [
    {
      name: 'change',
      description: '值变化',
      params: '() => void'
    },
    {
      name: 'close',
      description: '关闭某个tag',
      params: '() => void'
    }
  ]
}
