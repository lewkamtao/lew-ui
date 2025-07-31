import type { Property } from 'csstype'
import type { LewColor } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { validColors } from 'lew-ui/constants'

// Constants
const FONT_WEIGHTS: Property.FontWeight[] = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export const titleProps = {
  // Content props
  text: {
    type: String,
  },

  // Style props
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 24,
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value <= 0) {
        console.warn(`[LewTitle] Invalid size: "${value}". Expected: positive number or valid CSS size string.`)
        return false
      }
      return true
    },
  },
  color: {
    type: String as PropType<LewColor>,
    validator(value: LewColor): boolean {
      // Allow empty/undefined values
      if (!value)
        return true

      // Check if it's a valid predefined color
      if (validColors.includes(value))
        return true

      // Check if it's a valid hex color
      if (/^#([0-9A-F]{3}){1,2}$/i.test(value))
        return true

      console.warn(
        `[LewTitle] Invalid color: "${value}". Expected: predefined color name from [${validColors.join(', ')}] or valid hex color.`,
      )
      return false
    },
  },
  bold: {
    type: Number as PropType<Property.FontWeight>,
    default: 500,
    validator(value: Property.FontWeight): boolean {
      if (typeof value === 'number' && !FONT_WEIGHTS.includes(value)) {
        console.warn(
          `[LewTitle] Invalid bold: "${value}". Expected one of: ${FONT_WEIGHTS.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
}

export type TitleProps = ExtractPropTypes<typeof titleProps>
