import type { Property } from 'csstype'
import type { LewTagProps } from 'lew-ui'
import type { LewComponentSource, LewDirection, LewSize } from './base'

export type LewButtonType = 'fill' | 'light' | 'ghost' | 'text'

export type LewButtonSize = 'mini' | 'small' | 'medium' | 'large'

export type LewTagType = 'fill' | 'light' | 'ghost'

export type LewAvatarPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type LewAvatarStatus = 'online' | 'processing' | 'away' | 'offline' | 'busy'

export type LewAvatarShape = 'circle' | 'square' | 'sharp'

export type LewImageObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export type LewImageObjectPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'

export type LewInputType = 'text' | 'password'

export type LewInputPrefixesType = 'icon' | 'select' | 'text'

export type LewInputSuffixType = 'icon' | 'select' | 'text'

export type LewTextareaResize = 'none' | 'both' | 'horizontal' | 'vertical'

export type LewTabsType = 'block' | 'line'

export type LewBreadcrumbSeparator = 'shoulder' | 'sprit'

export type LewUploadStatus = 'success' | 'fail' | 'uploading' | 'complete' | 'wrong_type' | 'wrong_size' | 'pending'

export type LewFormItemAs = 'input' | 'textarea' | 'input-tag' | 'checkbox-group' | 'radio-group' | 'checkbox' | 'select' | 'select-multiple' | 'date-picker' | 'date-range-picker' | 'tabs' | 'cascader' | 'switch' | 'button' | 'upload' | 'input-number' | 'slider' | 'slider-range' | 'color-picker' | 'rate' | 'tree-select'

export type LewSelectMultipleValueLayout = 'tag' | 'text'

export type LewStepsStatus = 'pending' | 'loading' | 'done' | 'error' | 'warning'

export type LewTagClose = () => Promise<boolean>

export type LewEmptyType = '404' | 'address' | 'article' | 'goods' | 'likes' | 'car' | 'comment' | 'network' | 'order' | 'search'

export type LewPopokType = 'error' | 'warning' | 'success' | 'info' | 'normal'

export type LewDrawerPosition = 'left' | 'right' | 'top' | 'bottom'

export interface LewActionBoxOption {
  label: LewComponentSource
  icon?: LewComponentSource
  customRender?: LewComponentSource
  onClick?: (event?: MouseEvent) => void
}

export interface LewBreadcrumbOption {
  label: string
  value?: string
  active?: boolean
}

export interface LewStepsOption {
  title: LewComponentSource
  description?: LewComponentSource
}

export interface LewTabsOption {
  label: string
  value: string
  disabled?: boolean
}

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

export interface LewInputTableColumn {
  title: string
  width?: number
  field: string
  as: string
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

export interface LewDescOption {
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

export interface LewFormOption {
  label?: string
  field: string
  required?: boolean
  as?: LewFormItemAs | ''
  size?: LewSize
  width?: Property.Width
  labelWidth?: Property.Width
  direction?: LewDirection
  disabled?: boolean
  readonly?: boolean
  tips?: string
  errMessage?: string
  rule?: any | string
  props?: Record<string, any>
  between?: boolean
  gridArea?: string
  id?: string
  outputFormat?: (params: { value: unknown, item?: LewFormOption }) => unknown
  inputFormat?: (params: { value: unknown, item?: LewFormOption }) => unknown
}

export interface LewSelectOption {
  label: string
  value: string
  disabled?: boolean
  isGroup?: boolean
  groupValue?: string
  groupLabel?: string
}

export interface LewTreeSelectOption {
  label: string
  value: string
  level: number
  labelPaths?: string[]
  keysPaths?: string[]
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentLabelPaths?: string[]
  parentKeysPaths?: string[]
  parentChildren?: LewTreeSelectOption[]
  children?: LewTreeSelectOption[]
}

export interface LewSelectMultipleOption {
  label: string
  value: string
  disabled?: boolean
  isGroup?: boolean
  groupValue?: string
  groupLabel?: string
}

export interface LewCheckboxOption {
  label: string
  value: string
  disabled?: boolean
}

export interface LewRadioOption {
  label: string
  value: string
  disabled?: boolean
}

export interface LewSliderOption {
  label: string
  value: number
}

export interface LewSliderRangeOption {
  label: string
  value: number
}

export interface LewDatePickerPresetsOption {
  label: string
  value: string
}

export interface LewCascaderOption {
  label: string
  value: string
  level?: number
  labelPaths?: string[]
  valuePaths?: string[]
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentLabelPaths?: string[]
  parentValuePaths?: string[]
  children?: LewCascaderOption[]
}

export interface LewTreeDataSource {
  label: string
  key: string
  level: number
  isLeaf?: boolean
  loading?: boolean
  disabled?: boolean
  parentKey?: string
  treeIndex?: number
  labelPaths?: string[]
  valueKeys?: string[]
  parentKeyPaths?: string[]
  parentLabelPaths?: string[]
  allNodeValues: string[]
  leafNodeValues: string[]
  children?: LewTreeDataSource[]
}

export interface LewUploadFileItem {
  key: string
  name?: string
  url?: string
  status?: LewUploadStatus
  percent?: number
  file?: File
  size?: number
  type?: string
  lastModifiedDate?: string
  lastModified?: number
}

export interface LewSelectSearchMethodParams {
  options?: LewSelectOption[]
  keyword?: string
}

export interface LewTreeSelectSearchMethodParams {
  item?: LewTreeDataSource
  keyword?: string
}

export interface LewSelectSearchMultipleMethodParams {
  options?: LewSelectMultipleOption[]
  keyword?: string
}
