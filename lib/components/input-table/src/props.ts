export const inputTableModel = {
  modelValue: {
    type: Array as PropType<any[]>,
    default: '',
    description: '值（双向绑定）'
  }
}
export const inputTableProps = {
  size: {
    type: String,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
  },
  width: {
    type: [Number, String],
    default: '',
    description: '表格宽度'
  },
  columns: {
    type: Array,
    default: [
      {
        title: '标题',
        width: 120,
        field: 'label',
        as: 'input',
      },
      {
        title: '值',
        width: 120,
        field: 'value',
        as: 'input'
      }
    ],
    description: '列配置'
  }
}
