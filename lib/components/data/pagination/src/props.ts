import type { LewSize, SelectOptions } from 'lew-ui'
import validators from 'lew-ui/validators'

export type PaginationOptions = SelectOptions

export const paginationModel = {
  total: {
    type: Number,
    default: 100,
    description: '数据总条数',
    validator: validators.nonNegativeInteger({
      componentName: 'LewPagination',
      propName: 'total',
    }),
  },
  currentPage: {
    type: Number,
    default: 1,
    description: '当前页码',
    validator: validators.positiveInteger({
      componentName: 'LewPagination',
      propName: 'currentPage',
    }),
  },
  pageSize: {
    type: Number,
    required: true,
    default: 10,
    description: '每页显示的条目数',
    validator: validators.positiveInteger({
      componentName: 'LewPagination',
      propName: 'pageSize',
    }),
  },
}

export const paginationProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '分页组件的尺寸',
    validator: validators.size({
      componentName: 'LewPagination',
      propName: 'size',
    }),
  },
  pageSizeOptions: {
    type: Array as PropType<number[] | SelectOptions[]>,
    default: () => [10, 20, 30, 50, 100],
    description: '每页显示条目数的选项列表',
    validator: validators.array({
      componentName: 'LewPagination',
      propName: 'pageSizeOptions',
    }),
  },
  visiblePagesCount: {
    type: Number,
    default: 5,
    description: '可见页码按钮的数量',
    validator: validators.range({
      componentName: 'LewPagination',
      propName: 'visiblePagesCount',
      min: 1,
      max: 21,
    }),
  },
}
