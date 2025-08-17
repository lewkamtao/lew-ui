export const formEmits = {
  'change': (data: any) => data,
  'mounted': () => true,
} as const

export const formItemEmits = {
  'change': (value: any) => value,
} as const

export type LewFormEmits = typeof formEmits
export type LewFormItemEmits = typeof formItemEmits
