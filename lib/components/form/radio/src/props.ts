import type { LewDirection, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export type RadioDirection = 'x' | 'y'

export interface RadioOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export const radioProps = {
  checked: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRadio',
      propName: 'checked',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRadio',
      propName: 'disabled',
    }),
  },
  iconable: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewRadio',
      propName: 'iconable',
    }),
  },
  label: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewRadio',
      propName: 'label',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRadio',
      propName: 'readonly',
    }),
  },
  round: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewRadio',
      propName: 'round',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '尺寸',
    validator: validators.size({
      componentName: 'LewRadio',
      propName: 'size',
    }),
  },
  block: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRadio',
      propName: 'block',
    }),
  },
}

export const radioGroupModel = {
  modelValue: {
    type: [String, Number],
    default: '',
    description: '单选框组绑定值',
  },
}

export const radioGroupProps = {
  block: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRadioGroup',
      propName: 'block',
    }),
  },
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    description: '复选框组的排列方向',
    validator: validators.direction({
      componentName: 'LewRadioGroup',
      propName: 'direction',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRadioGroup',
      propName: 'disabled',
    }),
  },
  iconable: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewRadioGroup',
      propName: 'iconable',
    }),
  },
  options: {
    type: Array as PropType<RadioOptions[]>,
    default: () => [],
    validator: validators.basicArray({
      componentName: 'LewRadioGroup',
      propName: 'options',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRadioGroup',
      propName: 'readonly',
    }),
  },
  round: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewRadioGroup',
      propName: 'round',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '复选框组中复选框的尺寸',
    validator: validators.size({
      componentName: 'LewRadioGroup',
      propName: 'size',
    }),
  },
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
