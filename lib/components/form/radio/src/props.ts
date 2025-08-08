import type { LewDirection, LewRadioOption, LewSize } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validDirectionList, validSizeList } from 'lew-ui/validators'

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
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewRadio',
      propName: 'size',
      values: validSizeList,
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
    typeValues: validDirectionList,
    validator: validators.enum({
      componentName: 'LewRadioGroup',
      propName: 'direction',
      values: validDirectionList,
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
    type: Array as PropType<LewRadioOption[]>,
    typePopKeys: ['LewRadioOption'],
    required: true,
    default: () => [],
    validator: validators.array({
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
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewRadioGroup',
      propName: 'size',
      values: validSizeList,
    }),
  },
}

export type RadioProps = ExtractPublicPropTypes<typeof radioProps>
export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>
