import type { Property } from 'csstype'
import type { LewTagProps } from 'lew-ui'
import type { LewComponentSource, LewDirection, LewSize } from './base'

export type LewBreadcrumbOptions = LewBreadcrumbOption[]
export type LewBreadcrumbSeparator = 'shoulder' | 'sprit'

export interface LewMenuOption {
  label: string
  value?: string
  icon?: LewComponentSource
  disabled?: boolean
  children?: LewMenuOption[]
  tagProps?: LewTagProps
}

export interface LewMenuTreeOption {
  label: LewComponentSource
  value: string
  icon?: LewComponentSource
  active?: boolean
  disabled?: boolean
  children?: LewMenuTreeOption[]
  tagProps?: LewTagProps
}

export interface LewBreadcrumbOption {
  label: string
  value?: string
  active?: boolean
}

export interface LewContextMenusOption {
  label?: LewComponentSource
  value?: string
  icon?: LewComponentSource
  disabled?: boolean
  checkable?: boolean
  checked?: boolean
  isDividerLine?: boolean
  level?: number
  children?: LewContextMenusOption[]
  onClick?: (item: LewContextMenusOption) => void
  [key: string]: any
}

export interface LewHoverMenusOption {
  label?: LewComponentSource
  value?: string
  type?: string
  icon?: LewComponentSource
  disabled?: boolean
  isDividerLine?: boolean
  level?: number
  children?: LewHoverMenusOption[]
  onClick?: (item: LewHoverMenusOption) => void
  [key: string]: any
}

export interface LewDescOptions {
  label: string
  field: string
  direction?: LewDirection
  size?: LewSize
  width?: string
  labelWidth?: string
  tips?: string
  type?: 'text-trim'
  gridArea?: string
  labelX?: Property.TextAlign
  valueX?: Property.TextAlign
  customRender?: (params: { field: string, label: string, dataSource: Record<string, any> }) => any
}

export interface LewStepsOptions {
  title: LewComponentSource
  description?: LewComponentSource
}

export interface LewTableColumn {
  title: string
  field: string
  fixed?: 'left' | 'right'
  width?: number
  x?: string
  y?: string
  columnStyle?: string
  sortable?: boolean
}

export interface LewCheckboxOptions {
  label: string
  value: string
  disabled?: boolean
}

export interface LewCascaderOptions {
  label: string
  value: string
  level: number
  labelPaths?: string[]
  valuePaths?: string[]
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentLabelPaths?: string[]
  parentValuePaths?: string[]
  children?: LewCascaderOptions[]
}

export interface LewDatePickerPresetsOption {
  label: string
  value: string
}

export interface LewSelectOptions {
  label: string // 12
  value: string | number
  disabled?: boolean
  isGroup?: boolean
  groupValue?: string | number
  groupLabel?: string
}

export interface LewSelectOptionsGroup {
  label: string
  children: LewSelectOptions[]
}

export interface LewSelectSearchMethodParams {
  options?: LewSelectOptions[]
  keyword?: string
}

export interface LewSelectMultipleOptions {
  label: string
  value: string | number
  disabled?: boolean
  isGroup?: boolean
  groupValue?: string | number
  groupLabel?: string
}

export interface LewSelectMultipleOptionsGroup {
  label: string
  children: LewSelectMultipleOptions[]
}

export interface LewSelectSearchMultipleMethodParams {
  options?: LewSelectMultipleOptions[]
  keyword?: string
}

export interface LewTreeDataSource {
  label: string
  key: string
  level: number
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentKey?: string | number
  treeIndex?: number
  labelPaths?: string[]
  valueKeys?: string[]
  parentKeyPaths?: string[]
  parentLabelPaths?: string[]
  allNodeValues: string[]
  leafNodeValues: string[]
  children?: LewTreeDataSource[]
}

export interface LewTreeSelectSearchMethodParams {
  item?: LewTreeDataSource
  keyword?: string
}

export interface LewTreeSelectOptions {
  label: string
  value: string | number
  level: number
  labelPaths?: string[]
  keysPaths?: string[]
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentLabelPaths?: string[]
  parentKeysPaths?: string[]
  parentChildren?: LewTreeSelectOptions[]
  children?: LewTreeSelectOptions[]
}

export type LewAvatarPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type LewAvatarStatus = 'online' | 'processing' | 'away' | 'offline' | 'busy'
export type LewAvatarShape = 'circle' | 'square' | 'sharp'
export type LewAvatarObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
export type LewAvatarObjectPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'

export type LewButtonType = 'fill' | 'light' | 'ghost' | 'text'
export type LewButtonSize = 'mini' | 'small' | 'medium' | 'large'
