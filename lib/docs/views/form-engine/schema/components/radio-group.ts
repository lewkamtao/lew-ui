export default [
  {
    label: '选项配置',
    as: 'input-table',
    field: 'options',
    direction: 'y',
  },
  {
    label: '排版方向',
    as: 'tabs',
    field: 'direction',
    props: {
      itemWidth: '50px',
      options: [
        {
          label: '水平',
          value: 'x',
        },
        {
          label: '垂直',
          value: 'y',
        },
      ],
    },
  },
  {
    label: '是否为块状',
    as: 'switch',
    field: 'block',
  },
  {
    label: '是否为圆形',
    as: 'switch',
    field: 'round',
  },
  {
    label: '图标开启',
    as: 'switch',
    tips: '图标开启，仅在块状时生效',
    field: 'iconable',
  },
];
