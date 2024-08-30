import type { ExtractPropTypes } from 'vue'
import type { LewColor, LewSize } from 'lew-ui'
import { validColors, validSizes } from 'lew-ui/constants'

export type ButtonSize = 'mini' | LewSize
export type ButtonType = 'fill' | 'light' | 'ghost' | 'text'
export type IconPosition = 'left' | 'right'

export const buttonProps = {
  text: {
    type: String,
    default: '',
    description: '按钮文本内容',
    validator(value: string): boolean {
      if (value.length > 20) {
        console.warn('[LewButton] 按钮文本长度不应超过20个字符')
        return false
      }
      return true
    }
  },
  type: {
    type: String,
    default: 'fill',
    description: '按钮类型',
    validator(value: ButtonType): boolean {
      const validTypes: ButtonType[] = ['fill', 'light', 'ghost', 'text']
      if (!validTypes.includes(value)) {
        console.warn(
          `[LewButton] 无效的按钮类型: ${value}。请使用 ${validTypes.join(', ')} 中的一个`
        )
        return false
      }
      return true
    }
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
    description: '按钮尺寸',
    validator(value: ButtonSize): boolean {
      const buttonSizes: ButtonSize[] = ['mini', ...validSizes]
      if (!buttonSizes.includes(value)) {
        console.warn(
          `[LewButton] 无效的按钮尺寸: ${value}。请使用 ${buttonSizes.join(', ')} 中的一个`
        )
        return false
      }
      return true
    }
  },
  color: {
    type: String,
    default: 'blue',
    description: '按钮颜色',
    validator(value: LewColor): boolean {
      if (!validColors.includes(value)) {
        console.warn(
          `[LewButton] 无效的颜色值: ${value}。请使用 ${validColors.join(', ')} 中的一个`
        )
        return false
      }
      return true
    }
  },
  icon: {
    type: String,
    default: '',
    description: '按钮图标名称'
  },
  iconPosition: {
    type: String,
    default: 'left',
    description: '图标位置',
    validator(value: IconPosition): boolean {
      const validPositions: IconPosition[] = ['left', 'right']
      if (!validPositions.includes(value)) {
        console.warn(
          `[LewButton] 无效的图标位置: ${value}。请使用 ${validPositions.join(', ')} 中的一个`
        )
        return false
      }
      return true
    }
  },
  iconSize: {
    type: [Number, String],
    description: '图标大小',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && (value < 12 || value > 48)) {
        console.warn('[LewButton] 图标尺寸应在12到48之间')
        return false
      }
      return true
    }
  },
  round: {
    type: Boolean,
    default: false,
    description: '是否为圆角按钮'
  },
  dashed: {
    type: Boolean,
    default: false,
    description: '是否为虚线按钮'
  },
  loading: {
    type: Boolean,
    default: false,
    description: '是否显示加载状态'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用按钮'
  },
  request: {
    type: Function,
    default: null,
    description: '点击按钮时触发的异步请求函数'
  }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
