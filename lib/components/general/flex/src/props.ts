import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'

export type FlexDirection = 'x' | 'y'
export type FlexXAlignment = 'start' | 'center' | 'end' | 'left' | 'right'
export type FlexYAlignment = 'start' | 'center' | 'end' | 'top' | 'bottom'
export type FlexMode = 'around' | 'between'
export type FlexGap = Property.Gap | number
export type FlexWidth = Property.Width | number

export const flexProps = {
  direction: {
    type: String as PropType<FlexDirection>,
    default: 'x',
    validator(value: FlexDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn('[LewFlex] direction must be either "x" or "y"')
        return false
      }
      return true
    },
  },
  x: {
    type: String as PropType<FlexXAlignment>,
    default: 'start',
    validator(value: FlexXAlignment): boolean {
      const validValues: FlexXAlignment[] = ['start', 'center', 'end', 'left', 'right']
      if (!validValues.includes(value)) {
        console.warn(`[LewFlex] x must be one of: ${validValues.join(', ')}`)
        return false
      }
      return true
    },
  },
  y: {
    type: String as PropType<FlexYAlignment>,
    default: 'center',
    validator(value: FlexYAlignment): boolean {
      const validValues: FlexYAlignment[] = ['start', 'center', 'end', 'top', 'bottom']
      if (!validValues.includes(value)) {
        console.warn(`[LewFlex] y must be one of: ${validValues.join(', ')}`)
        return false
      }
      return true
    },
  },
  mode: {
    type: String as PropType<FlexMode>,
    validator(value: FlexMode): boolean {
      if (value && !['around', 'between'].includes(value)) {
        console.warn('[LewFlex] mode must be either "around" or "between"')
        return false
      }
      return true
    },
  },
  wrap: {
    type: Boolean,
  },
  gap: {
    type: [String, Number] as PropType<FlexGap>,
    default: 10,
    validator(value: FlexGap): boolean {
      if (typeof value === 'number') {
        if (value < 0) {
          console.warn(`[LewFlex] Invalid gap: "${value}". Expected: non-negative number.`)
          return false
        }
        return true
      }
      if (typeof value === 'string') {
        // Check if it's a valid CSS gap value
        if (!value.match(/^(normal|0|(\d+(\.\d+)?(px|em|rem|%|ch|ex|vh|vw|vmin|vmax)))$/)) {
          console.warn(`[LewFlex] Invalid gap: "${value}". Expected: valid CSS gap value.`)
          return false
        }
        return true
      }
      return true
    },
  },
  width: {
    type: [String, Number] as PropType<FlexWidth>,
    validator(value: FlexWidth): boolean {
      if (value === undefined || value === '') {
        return true
      }
      if (typeof value === 'number') {
        if (value < 0) {
          console.warn('[LewFlex] width must be a non-negative number')
          return false
        }
        return true
      }
      if (typeof value === 'string') {
        // Check if it's a valid CSS width value
        if (!value.match(/^(auto|max-content|min-content|fit-content|\d+(\.\d+)?(px|em|rem|%|ch|ex|vh|vw|vmin|vmax))$/)) {
          console.warn('[LewFlex] width must be a valid CSS width value')
          return false
        }
        return true
      }
      return true
    },
  },
}

export type FlexProps = ExtractPropTypes<typeof flexProps>
