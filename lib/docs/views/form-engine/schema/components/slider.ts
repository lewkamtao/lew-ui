export default [
  {
    label: '配置',
    as: 'input-table',
    field: 'options',
    direction: 'y'
  },
  {
    label: '最小值',
    as: 'input-number',
    componentWidth: 100,
    field: 'min'
  },
  {
    label: '最大值',
    as: 'input-number',
    componentWidth: 100,
    field: 'max'
  },
  {
    label: '步长',
    as: 'input-number',
    componentWidth: 100,
    props: {
      align: 'center'
    },
    field: 'step'
  },
  {
    label: '样式类型',
    as: 'tabs',
    field: 'type',
    props: {
      itemWidth: '50px',
      options: [
        {
          label: '块状',
          value: 'block '
        },
        {
          label: '线形',
          value: 'line'
        }
      ]
    }
  }
]
