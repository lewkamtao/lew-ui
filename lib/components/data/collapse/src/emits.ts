import type { LewCollapseModelValue } from 'lew-ui'

export const collapseEmits = {
  change: (value: LewCollapseModelValue) => value || typeof value === 'undefined',
} as const
