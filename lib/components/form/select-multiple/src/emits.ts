import type { LewSelectMultipleOption } from 'lew-ui'

export const selectMultipleEmits = {
  change: (value: string[]) => value,
  select: (item: string[]) => item,
  delete: (item: LewSelectMultipleOption, value: string[]) => {
    return { item, value }
  },
  clear: () => true,
  blur: () => true,
} as const
