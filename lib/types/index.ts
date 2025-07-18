/**
 * 主题色类型
 */
export type LewThemeColor
  = | 'black'
    | 'blue'
    | 'brown'
    | 'cyan'
    | 'gray'
    | 'green'
    | 'indigo'
    | 'mint'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow'

/**
 * 状态色类型
 */
export type LewStatusColor
  = | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'normal'
    | 'primary'

/**
 * 颜色类型 = 主题色 + 状态色
 */
export type LewColor = LewThemeColor | LewStatusColor

/**
 * 尺寸类型
 */
export type LewSize = 'small' | 'medium' | 'large'

/**
 * 方向类型
 */
export type LewDirection = 'x' | 'y'
