import type { ExtractPropTypes, PropType } from 'vue'

export interface DropdownOptions {
  label: number | string
  value: number | string
}

export const dropdownProps = {
  options: {
    type: Array as PropType<DropdownOptions[]>,
    default() {
      return []
    },
    required: true,
  },
  trigger: {
    type: String,
    default: 'hover',
  },
  placement: {
    type: String,
    default: 'bottom',
  },

  width: {
    type: String,
    default: '',
  },
  maxHeight: {
    type: String,
    default: '300px',
  },
  align: {
    type: String,
    default: 'left',
  },
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
