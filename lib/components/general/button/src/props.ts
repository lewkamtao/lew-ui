import type { Property } from 'csstype'
import type { LewColor, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { validColors, validSizes } from 'lew-ui/constants'

export type ButtonSize = 'mini' | LewSize
export type ButtonType = 'fill' | 'light' | 'ghost' | 'text'
export type IconPosition = 'left' | 'right'
export type ButtonWidth = Property.Width | number

export const buttonProps = {
  text: {
    type: String,
    validator(value: string): boolean {
      if (value && value.length > 50) {
        console.warn(`[LewButton] Invalid text: "${value}". Expected: text length ≤ 50 characters.`)
        return false
      }
      return true
    },
  },
  width: {
    type: [String, Number] as PropType<ButtonWidth>,
    validator(value: ButtonWidth): boolean {
      if (value !== undefined) {
        if (typeof value === 'number' && value <= 0) {
          console.warn(`[LewButton] Invalid width: "${value}". Expected: positive number.`)
          return false
        }
        if (typeof value === 'string' && !value.match(/^(auto|max-content|min-content|\d+(%|px|em|rem|vw|vh))$/)) {
          console.warn(`[LewButton] Invalid width: "${value}". Expected: valid CSS width value.`)
          return false
        }
      }
      return true
    },
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'fill',
    validator(value: ButtonType): boolean {
      const validTypes: ButtonType[] = ['fill', 'light', 'ghost', 'text']
      if (!validTypes.includes(value)) {
        console.warn(`[LewButton] Invalid type: "${value}". Expected one of: ${validTypes.join(', ')}.`)
        return false
      }
      return true
    },
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
    validator(value: ButtonSize): boolean {
      const buttonSizes: ButtonSize[] = ['mini', ...validSizes]
      if (!buttonSizes.includes(value)) {
        console.warn(`[LewButton] Invalid size: "${value}". Expected one of: ${buttonSizes.join(', ')}.`)
        return false
      }
      return true
    },
  },
  singleIcon: {
    type: Boolean,
  },
  color: {
    type: String as PropType<LewColor>,
    default: 'primary',
    validator(value: LewColor): boolean {
      if (!validColors.includes(value)) {
        console.warn(`[LewButton] Invalid color: "${value}". Expected one of: ${validColors.join(', ')}.`)
        return false
      }
      return true
    },
  },
  round: {
    type: Boolean,
  },
  dashed: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  request: {
    type: Function as PropType<() => Promise<void>>,
  },
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
