export const paginationEmits = {
  change: (data: { currentPage: number, pageSize: number }) => data,
} as const
