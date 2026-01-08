import type { LewContextMenusOption } from 'lew-ui/types'

export const contextMenuEmits = {
  change: (item: LewContextMenusOption) => item,
} as const

export type LewContextMenuEmits = typeof contextMenuEmits
