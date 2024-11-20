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
        { label: '大', value: 'large' }
      ]
    }
  },
  {
    label: '方向',
    as: 'tabs',
    field: 'direction',
    componentWidth: 'auto',
    props: {
      itemWidth: '50px',
      options: [
        { label: '水平', value: 'x' },
        { label: '垂直', value: 'y' }
      ]
    }
  },
  {
    label: '标签对齐方式',
    as: 'tabs',
    field: 'labelX',
    componentWidth: 'auto',
    props: {
      itemWidth: '50px',
      options: [
        { label: '左对齐', value: 'start' },
        { label: '右对齐', value: 'end' }
      ]
    }
  },
  {
    label: '值对齐方式',
    as: 'tabs',
    field: 'valueX',
    componentWidth: 'auto',
    props: {
      itemWidth: '50px',
      options: [
        { label: '左对齐', value: 'start' },
        { label: '右对齐', value: 'end' }
      ]
    }
  }
]
