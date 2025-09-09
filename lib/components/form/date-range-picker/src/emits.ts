export const dateRangePickerEmits = {
  change: (value?: { start?: string, end?: string }) => value,
  clear: () => true,
} as const

export const dateRangeEmits = {
  change: (value?: { [key: string]: string }) => value,
} as const
