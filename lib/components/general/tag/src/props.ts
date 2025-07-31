import type { LewColor, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { validColors, validSizes } from 'lew-ui/constants'

// Types
export type TagType = 'fill' | 'light' | 'ghost'

// Constants
const TAG_TYPES: TagType[] = ['fill', 'light', 'ghost']

export const tagProps = {
  // Content props
  text: {
    type: String,
  },

  // Style props
  type: {
    type: String as PropType<TagType>,
    default: 'light',
    validator(value: TagType): boolean {
      if (!TAG_TYPES.includes(value)) {
        console.warn(
          `[LewTag] Invalid tag type: "${value}". Expected one of: ${TAG_TYPES.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
  color: {
    type: String as PropType<LewColor>,
    default: 'primary',
    validator(value: LewColor): boolean {
      if (!validColors.includes(value)) {
        console.warn(
          `[LewTag] Invalid color: "${value}". Expected one of: ${validColors.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewTag] Invalid size: "${value}". Expected one of: ${validSizes.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
  round: {
    type: Boolean,
  },
  oversize: {
    type: Boolean,
  },

  // State props
  disabled: {
    type: Boolean,
  },

  // Feature props
  closable: {
    type: Boolean,
  },
}

// Export model for documentation
export const model = {
  tag: {
    type: 'String | Object',
    description: 'Tag model value',
  },
}

export type TagProps = ExtractPropTypes<typeof tagProps>
