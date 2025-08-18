export const selectMultipleEmits = {
  change: (value: any) => value,
  select: (item: any) => item,
  clear: () => true,
  delete: (data: { item: any, value: any }) => data,
  blur: () => true,
} as const
