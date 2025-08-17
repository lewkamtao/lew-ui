export const datePickerEmits = {
  change: (data?: { date: string | undefined, value: string | undefined } | undefined) => data,
  clear: () => true,
} as const

export const dateEmits = {
  change: (value?: string | undefined) => value,
} as const

export type LewDatePickerEmits = typeof datePickerEmits
export type LewDateEmits = typeof dateEmits
