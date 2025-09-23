export const cascaderMultipleEmits = {
  change: (value: string[]) => value,
  clear: () => true,
  select: (value: string[]) => value,
  delete: (value: string[], deletedItem: string) => ({ value, deletedItem }),
} as const
