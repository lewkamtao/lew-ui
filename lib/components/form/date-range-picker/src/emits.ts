export const dateRangePickerEmits = {
  change: (data?: { e: any, show: () => void, hide: () => void } | undefined) => data,
  clear: () => true,
} as const

export const dateRangeEmits = {
  change: (value?: any | undefined) => value,
} as const

export type LewDateRangePickerEmits = typeof dateRangePickerEmits
export type LewDateRangeEmits = typeof dateRangeEmits
