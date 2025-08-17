export const paginationEmits = {
  change: (data: { currentPage: number, pageSize: number }) => data,
} as const

export type LewPaginationEmits = typeof paginationEmits
