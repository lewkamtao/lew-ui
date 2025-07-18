import type { ExtractPropTypes } from 'vue'
import { validColors } from 'lew-ui/constants'

export type BadgeColor
  = | 'red'
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
  text: {
    type: String,
    default: '',
    description: '自定义提示内容',
  },
  offset: {
    type: Array,
    default: () => [0, 0],
    description: '徽章偏移量，格式为 [x, y]',
  },
  processing: {
    type: Boolean,
    default: false,
    description: '徽章是否为处理中状态',
  },
  // 超过多少转化成加号
  max: {
    type: [Number, String],
    default: 99,
    description: '超过多少转化成加号',
    validator: (value: string | number) => {
      const numberValue = Number(value)
      if (isNaN(numberValue)) {
        console.warn(
          '[LewBadge] max 属性必须是有效的数字或可转换为数字的字符串。',
        )
        return false
      }
      return true
    },
  },
  color: {
    type: String,
    default: 'red',
    description: '徽章颜色，可选值包括多种预定义颜色',
    validator: (value: string) => {
      if (!validColors.includes(value as BadgeColor)) {
        console.warn(
          `[LewBadge] 无效的颜色值: ${value}。请使用预定义的颜色之一。`,
        )
        return false
      }
      return true
    },
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
    },
  },
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
