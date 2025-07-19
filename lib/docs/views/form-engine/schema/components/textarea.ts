export default [
  {
    label: '占位提示',
    as: 'input',
    field: 'placeholder',
  },
  {
    label: '是否聚焦时选中内容',
    as: 'switch',
    field: 'selectByFocus',
  },
  {
    label: '是否可清空',
    as: 'switch',
    field: 'clearable',
  },
  {
    label: '限制最大长度',
    as: 'input-number',
    componentWidth: 110,
    props: { min: 0, max: '', align: 'center', placeholder: '最大长度' },
    field: 'maxLength',
  },
  {
    label: '宽度',
    as: 'input-number',
    componentWidth: 110,
    props: { min: 0, max: '', align: 'center', placeholder: '宽度' },
    field: 'width',
  },
  {
    label: '高度',
    as: 'input-number',
    componentWidth: 110,
    props: { min: 0, max: '', align: 'center', placeholder: '高度' },
    field: 'height',
  },
  {
    label: '最小宽度',
    as: 'input-number',
    componentWidth: 110,
    props: { min: 0, max: '', align: 'center', placeholder: '最小宽度' },
    field: 'minWidth',
  },
  {
    label: '最小高度',
    as: 'input-number',
    componentWidth: 110,
    props: { min: 0, max: '', align: 'center', placeholder: '最小高度' },
    field: 'minHeight',
  },
  {
    label: '最大宽度',
    as: 'input-number',
    componentWidth: 110,
    props: { min: 0, max: '', align: 'center', placeholder: '最大宽度' },
    field: 'maxWidth',
  },
  {
    label: '最大高度',
    as: 'input-number',
    componentWidth: 110,
    props: { min: 0, max: '', align: 'center', placeholder: '最大高度' },
    field: 'maxHeight',
  },
  {
    label: '调整尺寸方式',
    as: 'select',
    field: 'resize',
    tips: '参考 textarea resize 属性',
    props: {
      itemWidth: '50px',
      clearable: true,
      options: [
        {
          label: 'none',
          value: 'none',
        },
        {
          label: 'both',
          value: 'both',
        },
        {
          label: 'horizontal',
          value: 'horizontal',
        },
        {
          label: 'vertical',
          value: 'vertical',
        },
      ],
    },
  },
  {
    label: '显示输入字数统计',
    as: 'switch',
    field: 'showCount',
  },
]
