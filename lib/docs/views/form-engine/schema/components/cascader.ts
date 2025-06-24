export default [
  {
    label: '占位提示',
    as: 'input',
    field: 'placeholder',
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
          value: 'click',
        },
        {
          label: '悬浮',
          value: 'hover',
        },
      ],
    },
  },
  {
    label: '是否多选',
    as: 'switch',
    field: 'multiple',
  },
  {
    label: '是否展示所有层级',
    as: 'switch',
    field: 'showAllLevels',
  },
  {
    label: '自由模式',
    as: 'switch',
    field: 'free',
  },

  {
    label: '是否可清空',
    as: 'switch',
    field: 'clearable',
  },
  {
    label: '是否显示选中图标',
    as: 'switch',
    field: 'showCheckIcon',
  },
];
