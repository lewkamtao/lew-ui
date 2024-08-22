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
    props: {
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
    label: '触发方式',
    as: 'tabs',
    field: 'trigger',
    props: {
      itemWidth: '50px',
      options: [
        {
          label: '点击',
          value: 'click'
        },
        {
          label: '悬浮',
          value: 'hover'
        }
      ]
    }
  },
  {
    label: '是否可搜索',
    as: 'switch',
    field: 'searchable'
  },
  {
    label: '搜索提示',
    as: 'input',
    field: 'searchPlaceholder'
  },
  {
    label: '搜索延时',
    as: 'input-number',
    field: 'searchDelay'
  },
  {
    label: '是否可清空',
    as: 'switch',
    field: 'clearable'
  },
  {
    label: '是否显示选中图标',
    as: 'switch',
    field: 'showCheckIcon'
  },
  {
    label: '显示输入字数统计',
    as: 'switch',
    tips: '只在 type = text 时有效',
    field: 'showCount'
  }
]
