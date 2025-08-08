import type {
  LewBreadcrumbSeparator,
  LewColor,
  LewDialogType,
  LewDirection,
  LewDrawerPosition,
  LewEmptyType,
  LewFormItemAs,
  LewImageObjectFit,
  LewImageObjectPosition,
  LewInputPrefixesType,
  LewInputSuffixType,
  LewInputType,
  LewPlacement,
  LewSelectMultipleValueLayout,
  LewSize,
  LewStatusColor,
  LewStepsStatus,
  LewTabsType,
  LewTagType,
  LewTextareaResize,
  LewThemeColor,
  LewTrigger,
  LewXAlignment,
  LewYAlignment,
} from '../types'

export const validColorList: LewColor[] = [
  'blue',
  'gray',
  'red',
  'green',
  'yellow',
  'indigo',
  'purple',
  'pink',
  'orange',
  'cyan',
  'teal',
  'mint',
  'brown',
  'black',
  'error',
  'success',
  'warning',
  'info',
  'normal',
  'primary',
  'danger',
]

export const validThemeColorList: LewThemeColor[] = [
  'black',
  'blue',
  'brown',
  'cyan',
  'gray',
  'green',
  'indigo',
  'mint',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
]

export const validStatusColorList: LewStatusColor[] = [
  'error',
  'success',
  'warning',
  'info',
  'normal',
  'primary',
  'danger',
]

export const validSizeList: LewSize[] = ['small', 'medium', 'large']
export const validDirectionList: LewDirection[] = ['x', 'y']
export const validTriggerList: LewTrigger[] = ['hover', 'click']
export const validResizeList: LewTextareaResize[] = ['none', 'both', 'horizontal', 'vertical']

export const validPlacementList: LewPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
]

export const validXAlignmentList: LewXAlignment[] = ['start', 'center', 'end', 'left', 'right']
export const validYAlignmentList: LewYAlignment[] = ['start', 'center', 'end', 'top', 'bottom']

export const validObjectFitList: LewImageObjectFit[] = ['fill', 'contain', 'cover', 'none', 'scale-down']
export const validObjectPositionList: LewImageObjectPosition[] = ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right']

export const validTagTypeList: LewTagType[] = ['fill', 'light', 'ghost']

export const validBreadcrumbSeparatorList: LewBreadcrumbSeparator[] = ['shoulder', 'sprit']

export const validSelectMultipleValueLayout: LewSelectMultipleValueLayout[] = ['tag', 'text']

export const validStepsStatusList: LewStepsStatus[] = ['pending', 'loading', 'done', 'error', 'warning']

export const validFormItemAsList: LewFormItemAs[] = ['input', 'textarea', 'input-tag', 'checkbox-group', 'radio-group', 'checkbox', 'select', 'select-multiple', 'date-picker', 'date-range-picker', 'tabs', 'cascader', 'switch', 'button', 'upload', 'input-number', 'slider', 'slider-range', 'color-picker', 'rate', 'tree-select']

export const validInputTypeList: LewInputType[] = ['text', 'password']
export const validInputPrefixesTypeList: LewInputPrefixesType[] = ['icon', 'select', 'text']
export const validInputSuffixTypeList: LewInputSuffixType[] = ['icon', 'select', 'text']
export const validTabsTypeList: LewTabsType[] = ['block', 'line']

export const validDrawerPositionList: LewDrawerPosition[] = ['left', 'right', 'top', 'bottom']

export const validDialogTypeList: LewDialogType[] = ['warning', 'error', 'info', 'normal', 'success']

export const validEmptyTypeList: LewEmptyType[] = ['404', 'address', 'article', 'goods', 'likes', 'car', 'comment', 'network', 'order', 'search']
