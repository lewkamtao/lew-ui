import type { LewMenuOption } from 'lew-ui'

export const menuEmits = {
  change: (item: LewMenuOption) => item,
} as const

export type LewMenuEmits = typeof menuEmits
