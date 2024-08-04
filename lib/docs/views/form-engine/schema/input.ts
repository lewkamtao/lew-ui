export const inputSchema = [
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
    label: '只读',
    as: 'switch',
    field: 'readonly'
  },
  {
    label: '复制',
    as: 'switch',
    field: 'copyable',
    tips: '只在readonly为true，且suffix为false时生效'
  },
  {
    label: '显示密码切换按钮',
    as: 'switch',
    field: 'showPassword'
  },
  {
    label: '最小宽度',
    as: 'input-number',
    field: 'minWidth',
    props: {
      min: 120,
      max: 1200,
	  precision: 0
    }
  }
]
