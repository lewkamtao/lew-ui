import type {
  LewColor,
  LewDirection,
  LewPlacement,
  LewSize,
  LewStatusColor,
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
