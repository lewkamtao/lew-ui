export const switchEmits = {
  change: (value: boolean) => value,
} as const

export type LewSwitchEmits = typeof switchEmits
