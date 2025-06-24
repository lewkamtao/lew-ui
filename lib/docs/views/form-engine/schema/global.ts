export const globalSchema = [
  {
    label: '尺寸',
    as: 'tabs',
    field: 'size',
    componentWidth: 'auto',
    props: {
      itemWidth: '50px',
      options: [
        { label: '小', value: 'small' },
        { label: '中', value: 'medium' },
        { label: '大', value: 'large' },
      ],
    },
  },
  {
    label: '标签方向',
    as: 'tabs',
    field: 'direction',
    componentWidth: 'auto',
    props: {
      itemWidth: '50px',
      options: [
        { label: '水平', value: 'x' },
        { label: '垂直', value: 'y' },
      ],
    },
  },
];
