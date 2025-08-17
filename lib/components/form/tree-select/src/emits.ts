export const treeSelectEmits = {
  'change': (data: any) => data,
  'blur': () => true,
  'clear': () => true,
} as const

export type LewTreeSelectEmits = typeof treeSelectEmits
