import type { ExtractPropTypes, PropType } from 'vue'

export interface RadioOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export type RadioSize = 'small' | 'medium' | 'large'

export const radioProps = {
  checked: {
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
  iconable: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<RadioSize>,
    default: 'medium',
  },
}

export const radioGroupProps = {
  modelValue: {
    type: String || Number,
    default: '',
  },
  block: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  direction: {
    type: String,
    default: 'x',
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
    type: String as PropType<RadioSize>,
    default: 'medium',
  },
  options: {
    type: Array as PropType<RadioOptions[]>,
    default: () => {
      return []
    },
    required: true,
    validator: (value: Array<RadioOptions>) => {
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

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
