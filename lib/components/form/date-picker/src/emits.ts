export const datePickerEmits = {
  change: (value?: string) => value,
  clear: () => { },
} as const

export const dateEmits = {
  change: (value?: string) => value,
} as const
