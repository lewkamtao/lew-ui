export const cascaderMultipleEmits = {
  change: (value: string[] | undefined) => value,
  clear: () => true,
  delete: (value: string[], deletedItem: string) => ({ value, deletedItem }),
} as const
