export default [
  {
    label: '占位提示',
    as: 'input',
    field: 'placeholder'
  },
  {
    label: '对齐方式',
    as: 'tabs',
    field: 'align',
    componentWidth: 180,
    props: {
      itemWidth: '50px',
      options: [
        {
          label: '居左',
          value: 'left'
        },
        {
          label: '居中',
          value: 'center'
        },
        {
          label: '居右',
          value: 'right'
        }
      ]
    }
  },
  {
    label: '是否聚焦时选中内容',
    as: 'switch',
    field: 'selectByFocus'
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
    label: '宽度',
    as: 'input-number',
    componentWidth: 100,
    props: { min: 80, max: 500, align: 'center', placeholder: '宽度' },
    field: 'width'
  }
]
