import type { PropType } from 'vue'

export interface TableColumns {
  title: string
  field: string
  fixed: string
  x: string
  y: string
  width: number
  columnStyle: string
}

export const tableProps = {
  selectedKey: {
    type: Array as any,
    default: () => {
      return []
    },
  },
  rowKey: {
    type: String,
    require: true,
  },
  dataSource: {
    type: Array as any,
    default: () => {
      return []
    },
  },
  columns: {
    type: Array as PropType<TableColumns[]>,
    default: () => {
      return []
    },
  },
  pickColumns: {
    type: Array,
    default: () => {
      return []
    },
  },
  maxHeight: {
    type: Number,
    default: undefined,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
}
