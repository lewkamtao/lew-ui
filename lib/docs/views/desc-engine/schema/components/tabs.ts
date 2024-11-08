export default [
  {
    label: '选项配置',
    as: 'input-table',
    field: 'options',
    direction: 'y'
  },
  {
    label: '宽度',
    as: 'input-number',
    componentWidth: 100,
    props: { min: 80, max: 500, align: 'center', placeholder: '宽度' },
    field: 'width'
  },
  {
    label: '选项宽度',
    as: 'input-number',
    componentWidth: 100,
    props: { min: 30, max: 500, align: 'center', placeholder: '宽度' },
    field: 'itemWidth'
  },
  {
    label: '是否圆角',
    as: 'switch',
    field: 'round'
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
