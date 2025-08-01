import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

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
    validator: validators.array({
      componentName: 'LewBadge',
      propName: 'offset',
    }),
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
        console.warn(`[LewBadge] Invalid max: "${value}". Expected: valid number or string convertible to number.`)
        return false
      }
      if (numberValue < 0) {
        console.warn(`[LewBadge] Invalid max: "${value}". Expected: number ≥ 0.`)
        return false
      }
      return true
    },
  },
  color: {
    type: String as PropType<BadgeColor>,
    default: 'red',
    validator: validators.string({
      componentName: 'LewBadge',
      propName: 'color',
    }),
  },
  value: {
    type: [String, Number] as PropType<BadgeValue>,
    validator(value: BadgeValue): boolean {
      if (value !== undefined && typeof value !== 'string' && typeof value !== 'number') {
        console.warn(`[LewBadge] Invalid value: "${value}". Expected: string or number.`)
        return false
      }
      return true
    },
  },
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
