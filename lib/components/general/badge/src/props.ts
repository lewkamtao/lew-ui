import type { ExtractPropTypes, PropType } from 'vue'
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

export type BadgeValue = string | number
export type BadgeOffset = [number, number]

export const badgeProps = {
  text: {
    type: String,
    default: '',
  },
  offset: {
    type: Array as unknown as PropType<BadgeOffset>,
    default: (): BadgeOffset => [0, 0],
    validator(value: BadgeOffset): boolean {
      if (!Array.isArray(value) || value.length !== 2) {
        console.warn('[LewBadge] offset must be an array with exactly 2 numbers')
        return false
      }
      if (!value.every(v => typeof v === 'number')) {
        console.warn('[LewBadge] offset values must be numbers')
        return false
      }
      return true
    },
  },
  processing: {
    type: Boolean,
  },
  max: {
    type: [Number, String] as PropType<number | string>,
    default: 99,
    validator(value: string | number): boolean {
      const numberValue = Number(value)
      if (Number.isNaN(numberValue)) {
        console.warn('[LewBadge] max must be a valid number or a string convertible to number')
        return false
      }
      if (numberValue < 0) {
        console.warn('[LewBadge] max must be greater than or equal to 0')
        return false
      }
      return true
    },
  },
  color: {
    type: String as PropType<BadgeColor>,
    default: 'red',
    validator(value: BadgeColor): boolean {
      if (!validColors.includes(value)) {
        console.warn(`[LewBadge] color must be one of: ${validColors.join(', ')}`)
        return false
      }
      return true
    },
  },
  value: {
    type: [String, Number] as PropType<BadgeValue>,
    validator(value: BadgeValue): boolean {
      if (value !== undefined && typeof value !== 'string' && typeof value !== 'number') {
        console.warn('[LewBadge] value must be a string or number')
        return false
      }
      return true
    },
  },
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
