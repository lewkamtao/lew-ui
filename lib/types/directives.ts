import type { LewPlacement, LewTrigger } from './base'
import type { LewContextMenusOption, LewHoverMenusOption } from './components'

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

export interface LewBackTopDirectiveBinding {
  target?: string
}

export interface LewContextMenuDirectiveBinding {
  options?: LewContextMenusOption[]
  disabled?: boolean
}

export interface LewHoverMenuDirectiveBinding {
  options?: LewHoverMenusOption[]
  disabled?: boolean
}

export interface LewDirectiveBindings {
  'tooltip': LewTooltipDirectiveBinding
  'loading': LewLoadingDirectiveBinding
  'backtop': LewBackTopDirectiveBinding
  'context-menu': LewContextMenuDirectiveBinding
  'hover-menu': LewHoverMenuDirectiveBinding
}
