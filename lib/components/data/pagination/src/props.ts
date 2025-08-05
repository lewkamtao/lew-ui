import type { LewSelectOptions, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const paginationModel = {
  total: {
    type: Number,
    default: 100,
    validator: validators.nonNegativeInteger({
      componentName: 'LewPagination',
      propName: 'total',
    }),
  },
  currentPage: {
    type: Number,
    default: 1,
    validator: validators.positiveInteger({
      componentName: 'LewPagination',
      propName: 'currentPage',
    }),
  },
  pageSize: {
    type: Number,
    required: true,
    default: 10,
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
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewPagination',
      propName: 'size',
      values: validSizeList,
    }),
  },
  pageSizeOptions: {
    type: Array as PropType<number[] | LewSelectOptions[]>,
    typePopKeys: ['LewSelectOptions'],
    default: () => [10, 20, 30, 50, 100],
    validator: validators.array({
      componentName: 'LewPagination',
      propName: 'pageSizeOptions',
    }),
  },
  visiblePagesCount: {
    type: Number,
    default: 5,
    validator: validators.range({
      componentName: 'LewPagination',
      propName: 'visiblePagesCount',
      min: 1,
      max: 21,
    }),
  },
}

export type LewPaginationProps = ExtractPropTypes<typeof paginationProps>
