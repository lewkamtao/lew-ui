import type { LewActionBoxOption } from 'lew-ui/types'

export const actionBoxEmits = {
  click: (option: LewActionBoxOption, event: MouseEvent) => ({ option, event }),
} as const
