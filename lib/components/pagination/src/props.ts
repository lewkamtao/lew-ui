import type { SelectOptions } from 'lew-ui'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'

export type PaginationOptions = SelectOptions

export const paginationModel = {
  total: {
    type: Number,
    default: 100,
    description: '数据总条数',
    validator: (value: number) => {
      if (value < 0) {
        console.warn('[LewPagination] total 必须是非负数')
        return false
      }
      return true
    }
  },
  currentPage: {
    type: Number,
    default: 1,
    description: '当前页码',
    validator: (value: number) => {
      if (value < 1) {
        console.warn('[LewPagination] currentPage 必须大于等于 1')
        return false
      }
      return true
    }
  },
  pageSize: {
    type: Number,
    required: true,
    default: 10,
    description: '每页显示的条目数',
    validator: (value: number) => {
      if (value < 1) {
        console.warn('[LewPagination] pageSize 必须大于等于 1')
        return false
      }
      return true
    }
  },
  pageSizeOptions: {
    type: Array as PropType<PaginationOptions[]>,
    default: () => [
      { label: '10 条/页', value: 10 },
      { label: '20 条/页', value: 20 },
      { label: '30 条/页', value: 30 },
      { label: '50 条/页', value: 50 },
      { label: '100 条/页', value: 100 }
    ],
    description: '每页显示条目数的选项列表',
    validator: (value: PaginationOptions[]) => {
      if (!Array.isArray(value) || value.length === 0) {
        console.warn('[LewPagination] pageSizeOptions 必须是非空数组')
        return false
      }
      return true
    }
  }
}

export const paginationProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '分页组件的尺寸',
    validator: (value: LewSize) => {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewPagination] size 必须是 ${validSizes.join(', ')} 之一`
        )
        return false
      }
      return true
    }
  },
  visiblePagesCount: {
    type: Number,
    default: 5,
    description: '可见页码按钮的数量',
    validator: (value: number) => {
      if (value < 1 || value > 21) {
        console.warn('[LewPagination] visiblePagesCount 必须在 1 到 21 之间')
        return false
      }
      return true
    }
  }
}
