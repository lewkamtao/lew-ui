import type { TagProps } from 'lew-ui'
import type { LewComponentSource, LewPlacement, LewStatus, LewTrigger } from './base'

export type LewPopoverTrigger = LewTrigger
export type LewPopoverPlacement = LewPlacement

export type LewStepsStatus = LewStatus

export interface LewMenuTreeItemOption {
  label: LewComponentSource
  icon?: LewComponentSource
  value: string
  active?: boolean
  disabled?: boolean
  children?: LewMenuTreeItemOption[]
  tagProps?: TagProps
}

export type LewMenuTreeItemOptions = LewMenuTreeItemOption[]

export interface LewBreadcrumbOption {
  label: string
  value?: string
  active?: boolean
}

export type LewBreadcrumbOptions = LewBreadcrumbOption[]

export type LewBreadcrumbSeparator = 'shoulder' | 'sprit'

export interface LewContextMenusOption {
  label?: LewComponentSource
  value?: string
  icon?: LewComponentSource
  children?: LewContextMenusOption[]
  disabled?: boolean
  level?: number
  isDividerLine?: boolean
  checkable?: boolean
  checked?: boolean
  onClick?: (item: LewContextMenusOption) => void
  [key: string]: any
}

export interface LewHoverMenusOption {
  label?: LewComponentSource
  value?: string
  type?: string
  icon?: LewComponentSource
  children?: LewHoverMenusOption[]
  disabled?: boolean
  level?: number
  isDividerLine?: boolean
  onClick?: (item: LewHoverMenusOption) => void
  [key: string]: any
}
