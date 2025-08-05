import type { LewContextMenusOption, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export type InputType = 'text' | 'password'
export type InputAlign = 'left' | 'center' | 'right'
export type InputPrefixesType = 'icon' | 'select' | 'text'
export type InputSuffixType = 'icon' | 'select' | 'text'

export const inputModel = {
  modelValue: {
    type: [String, Number],
    default: undefined,
    description: '输入框的值，支持 v-model 双向绑定',
  },
  prefixValue: {
    type: [String, Number],
    default: undefined,
    description: '输入框前缀的值',
  },
  suffixValue: {
    type: [String, Number],
    default: undefined,
    description: '输入框后缀的值',
  },
}

export const inputProps = {
  type: {
    type: String,
    default: 'text',
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
    type: [String, Number],
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
    type: String,
    default: 'left',
    validator: validators.string({
      componentName: 'LewInput',
      propName: 'align',
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
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewInput',
      propName: 'prefixes',
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
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewInput',
      propName: 'suffix',
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

export type InputProps = ExtractPropTypes<typeof inputProps>
