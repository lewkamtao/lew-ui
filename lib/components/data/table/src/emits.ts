export const tableEmits = {
  sortChange: (sortValue: Record<string, any>) => sortValue || typeof sortValue === 'undefined',
  selectChange: (selectedKeys: any) => selectedKeys || typeof selectedKeys === 'undefined',
  dragSort: (dataSource: any[]) => dataSource || typeof dataSource === 'undefined',
} as const
