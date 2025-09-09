import type { LewContextMenusOption } from 'lew-ui'

export const dropdownEmits = {
  change: (item: LewContextMenusOption) => item,
} as const
