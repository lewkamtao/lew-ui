export const tableEmits = {
  sortChange: (sortValue: Record<string, any>) => sortValue,
  selectChange: (selectedKeys: any) => selectedKeys,
  dragSort: (dataSource: any[]) => dataSource,
} as const

export type LewTableEmits = typeof tableEmits
