export const radioEmits = {
  change: () => true,
} as const

export const radioGroupEmits = {
  change: (value?: string) => value,
} as const
