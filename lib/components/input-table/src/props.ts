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
  batchDelete: {
    type: Boolean,
    default: false,
    description: '是否显示批量删除'
  },
  rowKey: {
    type: String,
    default: 'id',
    description: '行key'
  },
  autoUniqueId: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Array,
    default: [
      {
        title: '标题',
        width: 120,
        field: 'label',
        as: 'input'
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
