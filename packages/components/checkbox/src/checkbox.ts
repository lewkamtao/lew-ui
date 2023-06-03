import type { ExtractPropTypes, PropType } from 'vue'

export interface CheckboxOptions {
  label: string
  value: string | number
  disabled?: boolean
}
export type CheckboxSize = 'small' | 'medium' | 'large'

export const checkboxProps = {
  modelValue: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  label: {
    type: String,
    default: () => {
      return ''
    },
  },
  block: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  round: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  iconable: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<CheckboxSize>,
    default: 'medium',
  },
}

export const checkboxGroupProps = {
  modelValue: {
    type: [Array || undefined],
    default: () => {
      return []
    },
    required: true,
  },
  block: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  round: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'x',
  },
  iconable: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<CheckboxSize>,
    default: 'medium',
  },
  options: {
    type: Array as PropType<CheckboxOptions[]>,
    default: () => {
      return []
    },
    required: true,
    validator: (value: Array<CheckboxOptions>) => {
      const hasNameKey = value.every(option =>
        Object.keys(option).includes('label'),
      )
      const hasIdKey = value.every(option =>
        Object.keys(option).includes('value'),
      )
      return hasNameKey && hasIdKey
    },
  },
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
