export default [
  {
    label: '开始日期提示',
    as: 'input',
    field: 'placeholderStart',
    props: {
      placeholder: '开始日期',
    },
  },
  {
    label: '结束日期提示',
    as: 'input',
    field: 'placeholderEnd',
    props: {
      placeholder: '结束日期',
    },
  },
  {
    label: '日期格式',
    as: 'input',
    field: 'valueFormat',
    props: {
      placeholder: 'YYYY-MM-DD',
    },
  },
  {
    label: '是否可清空',
    as: 'switch',
    field: 'clearable',
  },
]
