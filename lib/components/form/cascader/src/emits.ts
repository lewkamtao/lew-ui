import type { LewCascaderOption } from 'lew-ui/types'

export const cascaderEmits = {
  change: (value: string | string[] | undefined, items: LewCascaderOption | LewCascaderOption[] | undefined) => ({ value, items }),
  clear: () => true,
  delete: (value: string[], deletedItem: string) => ({ value, deletedItem }),
} as const
