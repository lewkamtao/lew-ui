import { PropType } from 'vue'

export type PaginationOptions = {
  label: number | string
  value: number | string
}

export const paginationModel = {
  total: {
    type: Number,
    default: 100,
    description: '总条数'
  },
  currentPage: {
    type: Number,
    default: 1,
    description: '当前页码'
  },
  pageSize: {
    type: Number,
    require: true,
    default: 10,
    description: '每页条数'
  },
  pageSizeOptions: {
    type: Array as PropType<PaginationOptions[]>,
    default: [
      {
        label: '10 / 页',
        value: 10
      },
      {
        label: '20 / 页',
        value: 20
      },
      {
        label: '30 / 页',
        value: 30
      },
      {
        label: '50 / 页',
        value: 50
      },
      {
        label: '100 / 页',
        value: 100
      }
    ],
    description: '每页条数选项'
  }
}

export const paginationProps = {
  visiblePagesCount: {
    type: Number,
    default: 5,
    description: '显示的页码数'
  }
}
