import type { ExtractPropTypes, PropType } from 'vue'
export interface ActionBoxOption {
  label: string | (() => any)
  icon?: string | (() => any)
  customRender?: () => any
  onClick?: () => void
}

export const actionBoxProps = {
  options: {
    type: Array as PropType<ActionBoxOption[]>,
    default: () => []
  },
  dropdownThreshold: {
    type: [Number, String],
    default: 0
  },
  dropdownLabel: {
    type: [String, Function, Object] as PropType<string | (() => any) | any>,
    default: 'More'
  },
  dropdownIcon: {
    type: [Function, Object] as PropType<(() => any) | any>,
    default: undefined
  },
  divider: {
    type: Boolean,
    default: true
  },
  iconOnly: {
    type: Boolean,
    default: false
  }
}

export type ActionBoxProps = ExtractPropTypes<typeof actionBoxProps>
