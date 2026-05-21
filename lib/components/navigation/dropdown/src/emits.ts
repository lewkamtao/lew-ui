import type { LewContextMenusOption } from 'lew-ui/types'

export const dropdownEmits = {
  change: (item: LewContextMenusOption) => item,
} as const

export type LewDropdownEmits = typeof dropdownEmits
