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

export interface LewContextMenuDirectiveBinding {
  options?: LewContextMenusOption[]
  disabled?: boolean
  trigger?: LewMenuTrigger
}

export interface LewDirectiveBindings {
  'tooltip': LewTooltipDirectiveBinding
  'loading': LewLoadingDirectiveBinding
  'context-menu': LewContextMenuDirectiveBinding
}
