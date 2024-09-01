import type { PropType } from 'vue'

export interface TableColumn {
  title: string
  field: string
  fixed?: 'left' | 'right'
  x?: string
  y?: string
  width?: number
  columnStyle?: string
}

export const tableModel = {
  selectedKeys: {
    type: [Array, String] as PropType<string[] | string>,
    default: () => [],
    description: '选中的行键值',
    validator: (value: string[] | string) => {
      if (!Array.isArray(value) && typeof value !== 'string') {
        console.warn('[LewTable] selectedKey 必须是一个数组或字符串')
        return false
      }
      return true
    }
  }
}

export const tableProps = {
  rowKey: {
    type: String,
    default: 'id',
    description: '用于标识每一行数据的唯一键',
    validator: (value: string) => {
      if (!value) {
        console.warn('[LewTable] rowKey 不能为空')
        return false
      }
      return true
    }
  },
  dataSource: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
    description: '表格的数据源',
    validator: (value: any[]) => {
      if (!Array.isArray(value)) {
        console.warn('[LewTable] dataSource 必须是一个数组')
        return false
      }
      return true
    }
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
    description: '表格列的配置描述',
    validator: (value: TableColumn[]) => {
      if (!Array.isArray(value)) {
        console.warn('[LewTable] columns 必须是一个数组')
        return false
      }
      return true
    }
  },
  maxHeight: {
    type: [Number, String],
    default: '',
    description: '表格的最大高度，超出后会出现滚动条',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewTable] maxHeight 必须大于 0')
        return false
      }
      return true
    }
  },
  checkable: {
    type: Boolean,
    default: false,
    description: '是否显示复选框列'
  },
  multiple: {
    type: Boolean,
    default: false,
    description: '是否允许多选'
  }
}
