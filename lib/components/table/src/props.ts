import type { PropType } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'

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
    type: [Array, String, Number, undefined] as PropType<string[] | string | number | undefined>,
    default: undefined,
    description: '选中的行键值，当 multiple 为 true 时，为数组，否则为字符串',
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
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '标签的尺寸',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewTable] 无效的标签尺寸: ${value}。请使用 ${validSizes.join(', ')} 中的一个。`
        )
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
  multiple: {
    type: Boolean,
    default: false,
    description: '是否允许多选'
  },
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
  }
}
