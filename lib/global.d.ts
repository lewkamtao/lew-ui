import type { LewDirectiveBindings } from './types'

declare module 'vue' {
  interface ComponentCustomProperties {}

  interface GlobalDirectives {
    vTooltip: LewDirectiveBindings['tooltip']
    vLoading: LewDirectiveBindings['loading']
    vBacktop: LewDirectiveBindings['backtop']
    vContextMenu: LewDirectiveBindings['context-menu']
    vHoverMenu: LewDirectiveBindings['hover-menu']
  }
}

export {}
