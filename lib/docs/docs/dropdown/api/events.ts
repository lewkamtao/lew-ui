export default {
  title: 'Events',
  columnsKey: 'events',
  orderNum: 10,
  data: [
    {
      name: 'show',
      type: 'function',
      default: '() => {}',
    },
    {
      name: 'hide',
      type: 'function',
      default: '() => {}',
    },
    {
      name: 'change',
      type: 'function',
      default: '() => {}',
    },
  ],
};
