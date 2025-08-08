import type { Property } from 'csstype'
import type { LewContextMenusOption, LewSize } from 'lew-ui'
import type { LewInputPrefixesType, LewInputSuffixType, LewInputType, LewXAlignment } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validInputPrefixesTypeList, validInputSuffixTypeList, validInputTypeList, validSizeList, validXAlignmentList } from 'lew-ui/validators'

export const inputModel = {
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  prefixValue: {
    type: [String, Number],
    default: undefined,
  },
  suffixValue: {
    type: [String, Number],
    default: undefined,
  },
}

export const inputProps = {
  type: {
    type: String as PropType<LewInputType>,
    default: 'text',
    typeValues: validInputTypeList,
    validator: validators.string({
      componentName: 'LewInput',
      propName: 'type',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewInput',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '300px',
    validator: validators.widthHeight({
      componentName: 'LewInput',
      propName: 'width',
    }),
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewInput',
      propName: 'placeholder',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'disabled',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'readonly',
    }),
  },
  clearable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'clearable',
    }),
  },
  showPassword: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'showPassword',
    }),
  },
  maxLength: {
    type: [Number, String],
    default: undefined,
    validator: validators.positiveInteger({
      componentName: 'LewInput',
      propName: 'maxLength',
    }),
  },
  showCount: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'showCount',
    }),
  },
  align: {
    type: String as PropType<LewXAlignment>,
    default: 'left',
    typeValues: validXAlignmentList,
    validator: validators.enum({
      componentName: 'LewInput',
      propName: 'align',
      values: validXAlignmentList,
    }),
  },
  minWidth: {
    type: [Number, String],
    default: '60px',
    validator: validators.widthHeight({
      componentName: 'LewInput',
      propName: 'minWidth',
    }),
  },
  autoWidth: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'autoWidth',
    }),
  },
  selectByFocus: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'selectByFocus',
    }),
  },
  copyable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'copyable',
    }),
  },
  prefixes: {
    type: String as PropType<LewInputPrefixesType>,
    default: '',
    typeValues: validInputPrefixesTypeList,
    validator: validators.enum({
      componentName: 'LewInput',
      propName: 'prefixes',
      values: validInputPrefixesTypeList,
    }),
  },
  prefixesOptions: {
    type: Array as PropType<LewContextMenusOption[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewInput',
      propName: 'prefixesOptions',
    }),
  },
  prefixesTooltip: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewInput',
      propName: 'prefixesTooltip',
    }),
  },
  suffix: {
    type: String as PropType<LewInputSuffixType>,
    default: '',
    typeValues: validInputSuffixTypeList,
    validator: validators.enum({
      componentName: 'LewInput',
      propName: 'suffix',
      values: validInputSuffixTypeList,
    }),
  },
  suffixOptions: {
    type: Array as PropType<LewContextMenusOption[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewInput',
      propName: 'suffixOptions',
    }),
  },
  suffixTooltip: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewInput',
      propName: 'suffixTooltip',
    }),
  },
  okByEnter: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewInput',
      propName: 'okByEnter',
    }),
  },
}

export type InputProps = ExtractPublicPropTypes<typeof inputProps>
