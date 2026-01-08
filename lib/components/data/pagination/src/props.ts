import type { LewSelectOption, LewSize } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

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
    type: Array as PropType<number[] | LewSelectOption[]>,
    typePopKeys: ['LewSelectOption'],
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

export type LewPaginationProps = ExtractPublicPropTypes<typeof paginationProps>
