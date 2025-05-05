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
    type: Number,
    default: 0
  },
  dropdownLabel: {
    type: [String, Function] as PropType<string | (() => any)>,
    default: 'More'
  },
  dropdownIcon: {
    type: Function as PropType<() => any>,
    default: undefined
  },
  divider: {
    type: Boolean,
    default: true
  }
}

export type ActionBoxProps = ExtractPropTypes<typeof actionBoxProps>
