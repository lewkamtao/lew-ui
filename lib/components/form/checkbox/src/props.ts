import type { LewCheckboxOptions, LewDirection, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validDirectionList, validSizeList } from 'lew-ui/validators'

export const checkboxModel = {
  modelValue: {
    type: Boolean,
    default: false,
  },
}

export const checkboxGroupModel = {
  modelValue: {
    type: Array,
    default: () => [],
    required: true,
  },
}

export const checkboxProps = {
  label: {
    type: String,
    validator: validators.string({
      componentName: 'LewCheckbox',
      propName: 'label',
    }),
  },
  disabled: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckbox',
      propName: 'disabled',
    }),
  },
  readonly: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckbox',
      propName: 'readonly',
    }),
  },
  checked: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckbox',
      propName: 'checked',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewCheckbox',
      propName: 'size',
      values: validSizeList,
    }),
  },
  block: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckbox',
      propName: 'block',
    }),
  },
  round: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckbox',
      propName: 'round',
    }),
  },
  iconable: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckbox',
      propName: 'iconable',
    }),
  },
  certain: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckbox',
      propName: 'certain',
    }),
  },
}

export const checkboxGroupProps = {
  options: {
    type: Array as PropType<LewCheckboxOptions[]>,
    default: () => [],
    required: true,
    validator: validators.array({
      componentName: 'LewCheckboxGroup',
      propName: 'options',
    }),
  },
  disabled: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckboxGroup',
      propName: 'disabled',
    }),
  },
  readonly: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckboxGroup',
      propName: 'readonly',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewCheckboxGroup',
      propName: 'size',
      values: validSizeList,
    }),
  },
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    typeValues: validDirectionList,
    validator: validators.enum({
      componentName: 'LewCheckboxGroup',
      propName: 'direction',
      values: validDirectionList,
    }),
  },
  block: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckboxGroup',
      propName: 'round',
    }),
  },
  round: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckboxGroup',
      propName: 'round',
    }),
  },
  iconable: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewCheckboxGroup',
      propName: 'iconable',
    }),
  },
}

export type LewCheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type LewCheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
