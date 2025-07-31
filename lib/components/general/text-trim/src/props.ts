import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'

// Types
export type TextTrimPlacement = 'top' | 'bottom' | 'left' | 'right'

// Constants
const PLACEMENTS: TextTrimPlacement[] = ['top', 'bottom', 'left', 'right']
const TEXT_ALIGNMENTS: Property.TextAlign[] = ['left', 'center', 'right']

export const textTrimProps = {
  // Content props
  text: {
    type: [String, Number],
  },
  allowHTML: {
    type: Boolean,
  },

  // Style props
  lineClamp: {
    type: Number,
    validator(value: number): boolean {
      if (value <= 0) {
        console.warn('[LewTextTrim] Invalid lineClamp: value must be greater than 0.')
        return false
      }
      return true
    },
  },
  textAlign: {
    type: String as PropType<Property.TextAlign>,
    default: 'left',
    validator(value: Property.TextAlign): boolean {
      if (!TEXT_ALIGNMENTS.includes(value)) {
        console.warn(
          `[LewTextTrim] Invalid textAlign: "${value}". Expected one of: ${TEXT_ALIGNMENTS.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },

  // Interaction props
  placement: {
    type: String as PropType<TextTrimPlacement>,
    default: 'top',
    validator(value: TextTrimPlacement): boolean {
      if (!PLACEMENTS.includes(value)) {
        console.warn(
          `[LewTextTrim] Invalid placement: "${value}". Expected one of: ${PLACEMENTS.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 15],
    validator(value: [number, number]): boolean {
      if (
        !Array.isArray(value)
        || value.length !== 2
        || !value.every(item => typeof item === 'number')
      ) {
        console.warn('[LewTextTrim] Invalid offset: value must be an array of two numbers.')
        return false
      }
      return true
    },
  },
  delay: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [120, 120],
    validator(value: [number, number]): boolean {
      if (
        !Array.isArray(value)
        || value.length !== 2
        || !value.every(item => typeof item === 'number' && item >= 0)
      ) {
        console.warn('[LewTextTrim] Invalid delay: value must be an array of two non-negative numbers.')
        return false
      }
      return true
    },
  },

  // Feature props
  reserveEnd: {
    type: Number,
    validator(value: number): boolean {
      if (value < 0) {
        console.warn('[LewTextTrim] Invalid reserveEnd: value must be greater than or equal to 0.')
        return false
      }
      return true
    },
  },
}

export type TextTrimProps = ExtractPropTypes<typeof textTrimProps>
