import type {
    LewColor,
    LewDirection,
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
]

export const validSizes: LewSize[] = ['small', 'medium', 'large']

export const validDirection: LewDirection[] = ['x', 'y']
