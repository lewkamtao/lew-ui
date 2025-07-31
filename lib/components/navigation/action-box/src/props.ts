import type { FlexXAlignment } from 'lew-ui'
import type { ComponentSource } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
// Types
export interface ActionBoxOption {
  label: ComponentSource
  icon?: ComponentSource
  customRender?: ComponentSource
  onClick?: (event?: MouseEvent) => void
}

// Constants
const ALIGNMENT_OPTIONS: FlexXAlignment[] = ['start', 'center', 'end', 'left', 'right']

export const actionBoxProps = {
  // Content props
  options: {
    type: Array as unknown as PropType<ActionBoxOption[]>,
    default: () => [],
  },

  // Layout props
  x: {
    type: String as PropType<FlexXAlignment>,
    default: 'start',
    validator(value: FlexXAlignment): boolean {
      if (!ALIGNMENT_OPTIONS.includes(value)) {
        console.warn(
          `[LewActionBox] Invalid x: "${value}". Expected one of: ${ALIGNMENT_OPTIONS.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
  divider: {
    type: Boolean,
  },

  // Dropdown props
  dropdownThreshold: {
    type: [Number, String] as PropType<number | string>,
    validator(value: number | string): boolean {
      const numValue = Number(value)
      if (Number.isNaN(numValue) || numValue < 0) {
        console.warn(
          `[LewActionBox] Invalid dropdownThreshold: "${value}". Expected: non-negative number.`,
        )
        return false
      }
      return true
    },
  },
  dropdownLabel: {
    type: null,
    default: 'More',
  },
  dropdownIcon: {
    type: null,
  },

  // Style props
  iconOnly: {
    type: Boolean,
  },
}

export type ActionBoxProps = ExtractPropTypes<typeof actionBoxProps>
