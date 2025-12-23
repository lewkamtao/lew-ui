export const paginationModel = {
  total: {
    type: Number,
    default: 100,

  },
  currentPage: {
    type: Number,
    default: 1,

  },
  pageSize: {
    type: Number,
    required: true,
    default: 10,

  },
}

export type PaginationModel = typeof paginationModel
