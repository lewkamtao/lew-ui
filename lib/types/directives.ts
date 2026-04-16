import type { LewMenuTrigger, LewPlacement, LewTrigger } from './base'
import type { LewContextMenusOption } from './components'

export interface LewTooltipDirectiveBinding {
  trigger?: LewTrigger
  content?: any
  placement?: LewPlacement
  delay?: number | [number, number]
  triggerFrom?: string
}

export interface LewLoadingDirectiveBinding {
  tip?: string
  iconSize?: number
  visible?: boolean
}

/** @deprecated 与 LewBackTop 一并废弃，请自行实现回到顶部。 */
export interface LewBackTopDirectiveBinding {
  target?: string
}

export interface LewContextMenuDirectiveBinding {
  options?: LewContextMenusOption[]
  disabled?: boolean
  trigger?: LewMenuTrigger
}

export interface LewDirectiveBindings {
  'tooltip': LewTooltipDirectiveBinding
  'loading': LewLoadingDirectiveBinding
  'backtop': LewBackTopDirectiveBinding
  'context-menu': LewContextMenuDirectiveBinding
}
