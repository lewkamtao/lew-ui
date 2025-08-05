import type { LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export type FormDirection = 'x' | 'y'

export const formProps = {
  options: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
    default: () => [],
    validator(value: Array<Record<string, any>>): boolean {
      if (!Array.isArray(value)) {
        console.warn('[LewForm] options 必须是一个数组')
        return false
      }
      return true
    },
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
    type: [Number, String],
    default: '',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewForm] width 不能为负数')
        return false
      }
      if (value && typeof value === 'string' && !/^\d+(%|px)?$/.test(value)) {
        console.warn('[LewForm] width 字符串必须是有效的 CSS 宽度值')
        return false
      }
      return true
    },
  },
  columns: {
    type: [Number, String],
    default: 1,
    validator(value: number | string): boolean {
      const numValue = Number(value)
      if (Number.isNaN(numValue) || numValue < 1 || !Number.isInteger(numValue)) {
        console.warn('[LewForm] columns 必须是大于等于1的整数')
        return false
      }
      return true
    },
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewForm] labelWidth 不能为负数')
        return false
      }
      if (
        typeof value === 'string'
        && value !== 'auto'
        && !/^\d+px$/.test(value)
      ) {
        console.warn('[LewForm] labelWidth 字符串必须是 "auto" 或有效的像素值')
        return false
      }
      return true
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String as PropType<FormDirection>,
    default: 'x',
    validator(value: FormDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(
          `[LewForm] 无效的 direction 值: ${value}。请使用 'x' 或 'y'`,
        )
        return false
      }
      return true
    },
  },
  id: {
    type: String,
    default: '',
    hidden: true,
  },
  formMethods: {
    type: Object as PropType<Record<string, (...args: any[]) => any>>,
    default: () => ({}),
  },
}

export const formItemProps = {
  label: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
  required: {
    type: [Boolean, Function],
    default: false,
  },
  as: {
    type: String,
    default: 'input',
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    validator(value: LewSize): boolean {
      if (!['small', 'medium', 'large'].includes(value)) {
        console.warn(
          `[LewFormItem] 无效的 size 值: ${value}。请使用 'small', 'medium' 或 'large'`,
        )
        return false
      }
      return true
    },
  },
  width: {
    type: [Number, String],
    default: '',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewFormItem] width 不能为负数')
        return false
      }
      if (value && typeof value === 'string' && !/^\d+(%|px)?$/.test(value)) {
        console.warn('[LewFormItem] width 字符串必须是有效的 CSS 宽度值')
        return false
      }
      return true
    },
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto',
    validator(value: number | string): boolean {
      if (typeof value === 'number' && value < 0) {
        console.warn('[LewFormItem] labelWidth 不能为负数')
        return false
      }
      if (
        typeof value === 'string'
        && value !== 'auto'
        && !/^\d+px$/.test(value)
      ) {
        console.warn(
          '[LewFormItem] labelWidth 字符串必须是 "auto" 或有效的像素值',
        )
        return false
      }
      return true
    },
  },
  direction: {
    type: String as PropType<FormDirection>,
    default: 'x',
    validator(value: FormDirection): boolean {
      if (!['x', 'y'].includes(value)) {
        console.warn(
          `[LewFormItem] 无效的 direction 值: ${value}。请使用 'x' 或 'y'`,
        )
        return false
      }
      return true
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  tips: {
    type: String,
    default: '',
  },
  errMessage: {
    type: String,
    default: '',
  },
  rule: {
    type: [Object, String] as PropType<any | string>,
  },
  props: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  between: {
    type: Boolean,
    default: false,
  },
  gridArea: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
    hidden: true,
  },
  outputFormat: {
    type: Function as PropType<(params: { value: unknown }) => unknown>,
    default: ({ value }: { value: unknown }) => value,
  },
  inputFormat: {
    type: Function as PropType<(params: { value: unknown }) => unknown>,
    default: ({ value }: { value: unknown }) => value,
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

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

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
}
