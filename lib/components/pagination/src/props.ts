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
  pageSizeOptions: {
    type: Array as PropType<number[] | SelectOptions[]>,
    default: () => [10, 20, 30, 50, 100],
    description: '每页显示条目数的选项列表',
    validator: (value: number[] | SelectOptions[]) => {
      if (!Array.isArray(value) || value.length === 0) {
        console.warn('[LewPagination] pageSizeOptions 必须是非空数组')
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
