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
    label: '回显方式',
    as: 'tabs',
    field: 'valueLayout',
    props: {
      itemWidth: '50px',
      options: [
        {
          label: '文本',
          value: 'text'
        },
        {
          label: '标签',
          value: 'tag'
        }
      ]
    }
  },
  {
    label: '值的分隔符',
    tips: '仅在 valueLayout 为 text 时有效',
    as: 'input',
    field: 'valueTextSplit'
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
  }
]
