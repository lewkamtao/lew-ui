export const paginationEmits = {
  'change': (data: { currentPage: number, pageSize: number }) => data,
  'update:currentPage': (currentPage: number) => currentPage,
  'update:pageSize': (pageSize: number) => pageSize,
} as const

export type LewPaginationEmits = typeof paginationEmits
