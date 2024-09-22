import type { ExtractPropTypes } from 'vue'
import { validColors } from 'lew-ui/constants'

export type BadgeColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'mint'
  | 'teal'
  | 'black'
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'gray'
  | 'brown'
  | 'success'
  | 'normal'
  | 'warning'
  | 'error'
  | 'info'
  | 'primary'

export const badgeProps = {
  color: {
    type: String,
    default: 'red',
    description: '徽章颜色，可选值包括多种预定义颜色',
    validator: (value: string) => {
      if (!validColors.includes(value as BadgeColor)) {
        console.warn(
          `[LewBadge] 无效的颜色值: ${value}。请使用预定义的颜色之一。`
        )
        return false
      }
      return true
    }
  },
  value: {
    type: [String, Number],
    default: '',
    description: '徽章显示的内容，为空时显示为小圆点',
    validator: (value: string | number) => {
      if (typeof value !== 'string' && typeof value !== 'number') {
        console.warn('[LewBadge] value 属性必须是字符串或数字类型。')
        return false
      }
      return true
    }
  }
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
