import type { Property } from 'csstype'
import type { LewSize } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const inputTagModel = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
}

export const inputTagProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewInputTag',
      propName: 'size',
      values: validSizeList,
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInputTag',
      propName: 'disabled',
    }),
  },
  clearable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInputTag',
      propName: 'clearable',
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewInputTag',
      propName: 'placeholder',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInputTag',
      propName: 'readonly',
    }),
  },
  maxLength: {
    type: Number,
    default: 0,
    validator: validators.number({
      componentName: 'LewInputTag',
      propName: 'maxLength',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
    validator: validators.widthHeight({
      componentName: 'LewInputTag',
      propName: 'width',
    }),
  },
}

export type InputTagProps = ExtractPublicPropTypes<typeof inputTagProps>
