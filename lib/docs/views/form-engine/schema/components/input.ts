export default [
  {
    label: '占位提示',
    as: 'input',
    field: 'placeholder'
  },
  {
    label: '输入框类型',
    as: 'tabs',
    field: 'type',
    props: {
      itemWidth: '50px',
      options: [
        {
          label: '文本',
          value: 'text'
        },
        {
          label: '密码',
          value: 'password'
        }
      ]
    }
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
    label: '是否可清空',
    as: 'switch',
    field: 'clearable'
  },
  {
    label: '显示密码切换按钮',
    as: 'switch',
    field: 'showPassword'
  },
  {
    label: '自动宽度',
    as: 'switch',
    field: 'autoWidth'
  },
  {
    label: '限制最大长度',
    as: 'input-number',
    componentWidth: 110,
    props: { min: 0, max: 100000000, align: 'center', placeholder: '最大长度' },
    field: 'maxLength'
  },
  {
    label: '显示输入字数统计',
    as: 'switch',
    tips: '只在 type = text 时有效',
    field: 'showCount'
  }
]
