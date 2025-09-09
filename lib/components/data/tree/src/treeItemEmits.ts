export const treeItemEmits = {
  change: () => true,
  expand: () => true,
} as const

export type LewTreeItemEmits = typeof treeItemEmits
