import type { LewDirectiveBindings } from './types'

declare module 'vue' {
  interface ComponentCustomProperties {}

  interface GlobalDirectives {
    vTooltip: LewDirectiveBindings['tooltip']
    vLoading: LewDirectiveBindings['loading']
    vContextMenu: LewDirectiveBindings['context-menu']
  }
}

export {}
