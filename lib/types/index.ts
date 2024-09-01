export type LewThemeColor =
  | 'black'
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

export type LewStatusColor = 'error' | 'success' | 'warning' | 'info' | 'normal' | 'primary'

// 合并主题色和状态色
export type LewColor = LewThemeColor | LewStatusColor

export type LewSize = 'small' | 'medium' | 'large'
