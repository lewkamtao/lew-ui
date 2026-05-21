import type { LewCollapseModelValue } from 'lew-ui/types'

export const collapseEmits = {
  change: (value: LewCollapseModelValue) => value || typeof value === 'undefined',
} as const
