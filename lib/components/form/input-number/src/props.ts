import type { Property } from 'csstype'
import type { LewSize, LewXAlignment } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList, validXAlignmentList } from 'lew-ui/validators'

export const inputNumberModel = {
  modelValue: {
    type: Number,
    default: undefined,
    description: '输入框的数值',
  },
}

export const inputNumberProps = {
  min: {
    type: Number,
    validator: validators.number({
      componentName: 'LewInputNumber',
      propName: 'min',
    }),
  },
  max: {
    type: Number,
    validator: validators.number({
      componentName: 'LewInputNumber',
      propName: 'max',
    }),
  },
  step: {
    type: Number,
    default: 1,
    validator: validators.number({
      componentName: 'LewInputNumber',
      propName: 'step',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInputNumber',
      propName: 'disabled',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewInputNumber',
      propName: 'size',
      values: validSizeList,
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewInputNumber',
      propName: 'placeholder',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInputNumber',
      propName: 'readonly',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '150px',
    validator: validators.widthHeight({
      componentName: 'LewInputNumber',
      propName: 'width',
    }),
  },
  align: {
    type: String as PropType<LewXAlignment>,
    typeValues: validXAlignmentList,
    default: 'left',
    validator: validators.enum({
      componentName: 'LewInputNumber',
      propName: 'align',
      values: validXAlignmentList,
    }),
  },
  selectByFocus: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewInputNumber',
      propName: 'selectByFocus',
    }),
  },
}

export type InputNumberProps = ExtractPublicPropTypes<typeof inputNumberProps>
