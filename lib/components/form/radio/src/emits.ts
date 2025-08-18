export const radioEmits = {
  change: () => true,
} as const

export const radioGroupEmits = {
  change: (data: { value: string | number, item: any }) => data,
} as const
