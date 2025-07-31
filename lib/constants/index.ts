import type {
  LewColor,
  LewDirection,
  LewPopoverPlacement,
  LewPopoverTrigger,
  LewSize,
  LewStatusColor,
  LewThemeColor,
} from '../types'

export const validColors: LewColor[] = [
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
  'gray',
  'black',
  'error',
  'success',
  'warning',
  'info',
  'normal',
  'primary',
  'danger',
]

export const vailThemeColor: LewThemeColor[] = [
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

export const validStatusColors: LewStatusColor[] = [
  'error',
  'success',
  'warning',
  'info',
  'normal',
  'primary',
  'danger',
]

export const validSizes: LewSize[] = ['small', 'medium', 'large']

export const validDirection: LewDirection[] = ['x', 'y']

export const validPopoverTrigger: LewPopoverTrigger[] = ['hover', 'click']

export const validPopoverPlacement: LewPopoverPlacement[] = [
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
