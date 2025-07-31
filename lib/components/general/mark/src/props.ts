import type { Property } from 'csstype'
import type { LewColor } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { validColors } from 'lew-ui/constants'

export const markProps = {
  // Style props
  color: {
    type: String as PropType<LewColor>,
    default: 'blue',
    validator(value: LewColor): boolean {
      if (!validColors.includes(value)) {
        console.warn(
          `[LewMark] Invalid color: "${value}". Expected one of: ${validColors.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
  bold: {
    type: Number as PropType<Property.FontWeight>,
    default: 400,
    validator(value: Property.FontWeight): boolean {
      const fontWeights: Property.FontWeight[] = [100, 200, 300, 400, 500, 600, 700, 800, 900]
      if (Number.isNaN(value) || !fontWeights.includes(value)) {
        console.warn(
          `[LewMark] Invalid font weight: "${value}". Expected one of: ${fontWeights.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
  cursor: {
    type: String as PropType<Property.Cursor>,
  },
  round: {
    type: Boolean,
  },
}

export type MarkProps = ExtractPropTypes<typeof markProps>
