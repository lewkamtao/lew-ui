export default [
  {
    label: '配置',
    as: 'input-table',
    field: 'options',
    direction: 'y',
  },
  {
    label: '最小值',
    as: 'input-number',
    componentWidth: 100,
    field: 'min',
  },
  {
    label: '最大值',
    as: 'input-number',
    componentWidth: 100,
    field: 'max',
  },
  {
    label: '步长',
    as: 'input-number',
    componentWidth: 100,
    props: {
      align: 'center',
    },
    field: 'step',
  },
]
