import type { LewCollapseModelValue } from 'lew-ui'

export const collapseEmits = {
  change: (value: LewCollapseModelValue) => value,
} as const

export type LewCollapseEmits = typeof collapseEmits
