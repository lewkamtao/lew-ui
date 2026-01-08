export const checkboxEmits = {
  change: (value: boolean) => typeof value === 'boolean',
} as const

export const checkboxGroupEmits = {
  change: (value: string[], item: any) => ({ value, item }),
} as const
