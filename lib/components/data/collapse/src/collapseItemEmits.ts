export const collapseItemEmits = {
  change: (expanded: boolean, key: string | number) => ({ expanded, key }),
} as const

export type LewCollapseItemEmits = typeof collapseItemEmits
