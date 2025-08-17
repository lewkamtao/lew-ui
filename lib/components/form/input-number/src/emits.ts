export const inputNumberEmits = {
  'blur': (value: number | undefined) => value,
  'focus': () => true,
  'change': (value: number | undefined) => value,
  'input': (value: number | undefined, event: any) => ({ value, event }),
} as const

export type LewInputNumberEmits = typeof inputNumberEmits
