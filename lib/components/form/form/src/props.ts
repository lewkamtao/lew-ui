import type { Property } from 'csstype'
import type { LewDirection, LewFormItemAs, LewFormOption, LewSize } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validDirectionList, validFormItemAsList, validSizeList } from 'lew-ui/validators'

export const formProps = {
  options: {
    type: Array as PropType<LewFormOption[]>,
    required: true,
    default: () => [],
    typePopKeys: ['LewFormOption'],
    validator: validators.array({
      componentName: 'LewForm',
      propName: 'options',
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewForm',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '',
    validator: validators.widthHeight({
      componentName: 'LewForm',
      propName: 'width',
    }),
  },
  columns: {
    type: Number,
    default: 1,
    validator: validators.number({
      componentName: 'LewForm',
      propName: 'columns',
    }),
  },
  labelWidth: {
    type: String as PropType<Property.Width>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewForm',
      propName: 'labelWidth',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewForm',
      propName: 'disabled',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewForm',
      propName: 'readonly',
    }),
  },
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    typeValues: validDirectionList,
    validator: validators.enum({
      componentName: 'LewForm',
      propName: 'direction',
      values: validDirectionList,
    }),
  },
  id: {
    type: String,
    default: '',
    hidden: true,
    validator: validators.string({
      componentName: 'LewForm',
      propName: 'id',
    }),
  },
  formMethods: {
    type: Object as PropType<Record<string, (...args: any[]) => any>>,
    default: () => ({}),
    validator: validators.object({
      componentName: 'LewForm',
      propName: 'formMethods',
    }),
  },
}

export const formItemProps = {
  label: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewFormItem',
      propName: 'label',
    }),
  },
  field: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewFormItem',
      propName: 'field',
    }),
  },
  required: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewFormItem',
      propName: 'required',
    }),
  },
  as: {
    type: String as PropType<LewFormItemAs | ''>,
    default: 'input',
    typeValues: validFormItemAsList,
    validator: validators.enum({
      componentName: 'LewFormItem',
      propName: 'as',
      values: validFormItemAsList,
    }),
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewFormItem',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '',
    validator: validators.widthHeight({
      componentName: 'LewFormItem',
      propName: 'width',
    }),
  },
  labelWidth: {
    type: String as PropType<Property.Width>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewFormItem',
      propName: 'labelWidth',
    }),
  },
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    typeValues: validDirectionList,
    validator: validators.enum({
      componentName: 'LewFormItem',
      propName: 'direction',
      values: validDirectionList,
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewFormItem',
      propName: 'disabled',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewFormItem',
      propName: 'readonly',
    }),
  },
  tips: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewFormItem',
      propName: 'tips',
    }),
  },
  errMessage: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewFormItem',
      propName: 'errMessage',
    }),
  },
  rule: {
    type: [Object, String] as PropType<any | string>,
    validator: validators.object({
      componentName: 'LewFormItem',
      propName: 'rule',
    }),
  },
  props: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
    validator: validators.object({
      componentName: 'LewFormItem',
      propName: 'props',
    }),
  },
  between: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewFormItem',
      propName: 'between',
    }),
  },
  gridArea: {
    type: String,
    default: '',
    validator: validators.gridArea({
      componentName: 'LewFormItem',
      propName: 'gridArea',
    }),
  },
  id: {
    type: String,
    default: '',
    hidden: true,
    validator: validators.string({
      componentName: 'LewFormItem',
      propName: 'id',
    }),
  },
  outputFormat: {
    type: Function as PropType<(params: { value: unknown }) => unknown>,
    default: ({ value }: { value: unknown }) => value,
    validator: validators.function({
      componentName: 'LewFormItem',
      propName: 'outputFormat',
    }),
  },
  inputFormat: {
    type: Function as PropType<(params: { value: unknown }) => unknown>,
    default: ({ value }: { value: unknown }) => value,
    validator: validators.function({
      componentName: 'LewFormItem',
      propName: 'inputFormat',
    }),
  },
}

export const requiredIconSizeMap: Record<LewSize, number> = {
  small: 6,
  medium: 7,
  large: 8,
}

export const tipsIconSizeMap: Record<LewSize, number> = {
  small: 13,
  medium: 14,
  large: 16,
}

export type FormProps = ExtractPublicPropTypes<typeof formProps>
export type FormItemProps = ExtractPublicPropTypes<typeof formItemProps>

export const formTypeAsMap: Record<string, any> = {
  'input': 'string',
  'textarea': 'string',
  'input-tag': 'array',
  'checkbox-group': 'array',
  'radio-group': 'string',
  'checkbox': 'boolean',
  'select': 'string',
  'select-multiple': 'array',
  'date-picker': 'date',
  'date-range-picker': 'array',
  'tabs': 'string',
  'cascader': 'string',
  'switch': 'boolean',
  'button': 'void',
  'upload': 'array',
  'input-number': 'number',
  'slider': 'number',
  'slider-range': 'array',
  'color-picker': 'string',
  'rate': 'number',
  'tree-select': 'string',
}
