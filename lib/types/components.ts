import type { Property } from 'csstype'
import type { LewTagProps } from 'lew-ui'
import type { LewComponentSource, LewDirection, LewSize } from './base'

export interface LewMenuTreeItemOption {
  label: LewComponentSource
  icon?: LewComponentSource
  value: string
  active?: boolean
  disabled?: boolean
  children?: LewMenuTreeItemOption[]
  tagProps?: LewTagProps
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

export interface LewDescOptions {
  label: string
  field: string
  gridArea?: string
  direction?: LewDirection
  customRender?: (params: { field: string, label: string, dataSource: Record<string, any> }) => any
  size?: LewSize
  width?: string
  labelWidth?: string
  tips?: string
  type?: 'text-trim'
  labelX?: Property.TextAlign
  valueX?: Property.TextAlign
}
export interface LewCascaderOptions {
  label: string
  value: string
  labelPaths?: string[]
  valuePaths?: string[]
  level: number
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentLabelPaths?: string[]
  parentValuePaths?: string[]
  children?: LewCascaderOptions[]
}

export interface LewCheckboxOptions {
  label: string
  value: string
  disabled?: boolean
}

export interface LewMenuOptions {
  label: string
  value?: string
  children?: LewMenuOptions[]
  disabled?: boolean
  icon?: LewComponentSource
  tagProps?: LewTagProps
}
export interface LewStepsOptions {
  title: LewComponentSource
  description?: LewComponentSource
}
