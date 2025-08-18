export const checkboxEmits = {
  change: (value: boolean) => value,
} as const

export const checkboxGroupEmits = {
  change: (data: { value: string[], item: any }) => data,
} as const
