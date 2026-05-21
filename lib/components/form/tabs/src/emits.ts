import type { LewTabsOption } from 'lew-ui/types'

export const tabsEmits = {
  change: (value?: string, item?: LewTabsOption) => {
    return { value, item }
  },
} as const
