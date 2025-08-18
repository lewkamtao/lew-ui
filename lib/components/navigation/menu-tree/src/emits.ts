import type { LewMenuTreeOption } from 'lew-ui'

export const menuTreeEmits = {
  change: (item: LewMenuTreeOption) => item,
  select: (value: string, item: LewMenuTreeOption) => ({ value, item }),
  expand: (expandKeys: string[]) => expandKeys,
  collapse: (expandKeys: string[]) => expandKeys,
} as const
