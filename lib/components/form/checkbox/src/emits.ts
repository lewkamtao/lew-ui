export const checkboxEmits = {
  change: (value: boolean) => value,
} as const

export const checkboxGroupEmits = {
  change: (value: string[], item: any) => ({ value, item }),
} as const
