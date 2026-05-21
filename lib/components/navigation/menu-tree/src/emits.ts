import type { LewMenuTreeOption } from 'lew-ui/types'

export const menuTreeEmits = {
  change: (item: LewMenuTreeOption) => item,
  expand: (expandKeys: string[]) => expandKeys,
  collapse: (expandKeys: string[]) => expandKeys,
} as const

export type LewMenuTreeEmits = typeof menuTreeEmits
