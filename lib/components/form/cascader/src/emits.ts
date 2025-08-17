export const cascaderEmits = {
  change: (value?: string | number | undefined) => value,
  clear: () => true,
} as const

export type LewCascaderEmits = typeof cascaderEmits
