import type { LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { validSizes } from 'lew-ui/constants'

export type FormDirection = 'x' | 'y'

export const formProps = {
  options: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
    default: () => [],
    description: '定义表单结构和内容的配置选项数组',
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
    description: '表单整体尺寸，影响所有表单项大小',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewForm] 无效的 size 值: ${value}。请使用 'small', 'medium' 或 'large'`,
        )
        return false
      }
      return true
    },
  },
  width: {
    type: [Number, String],
    default: '',
    description: '表单整体宽度，支持数字（像素）或百分比字符串',
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
    description: '每行显示的表单项数量，最大值为4',
    validator(value: number | string): boolean {
      const numValue = Number(value)
      if (isNaN(numValue) || numValue < 1 || numValue > 4) {
        console.warn('[LewForm] columns 必须是 1 到 4 之间的数字')
        return false
      }
      return true
    },
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto',
    description: '表单项标签宽度，支持数字（像素）或 "auto"',
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
    description: '是否禁用整个表单',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否将整个表单设为只读',
  },
  direction: {
    type: String as PropType<FormDirection>,
    default: 'x',
    description: '表单项排列方向，"x" 为水平，"y" 为垂直',
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
    description: '表单的唯一标识符',
    hidden: true,
  },
  formMethods: {
    type: Object as PropType<Record<string, Function>>,
    default: () => ({}),
    description: '表单项的方法集合，包含用于操作表单的函数',
  },
}

export const formItemProps = {
  label: {
    type: String,
    default: '',
    description: '表单项的标签文本',
  },
  field: {
    type: String,
    default: '',
    description: '表单项对应的字段名，用于数据绑定和验证',
  },
  required: {
    type: [Boolean, Function],
    default: false,
    description: '是否为必填项',
  },
  as: {
    type: String,
    default: 'input',
    description: '指定表单项的类型，如 "input"、"select" 等',
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '单个表单项的尺寸，可覆盖表单整体设置',
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
    description: '单个表单项的宽度，支持数字（像素）或百分比字符串',
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
    description: '单个表单项标签宽度，支持数字（像素）或 "auto"',
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
    description: '单个表单项的排列方向，"x" 为水平，"y" 为垂直',
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
    description: '是否禁用该表单项',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否将该表单项设为只读',
  },
  tips: {
    type: String,
    default: '',
    description: '表单项的提示信息',
  },
  errMessage: {
    type: String,
    default: '',
    description: '自定义验证失败时的错误提示',
  },
  rule: {
    type: [Object, String] as PropType<any | string>,
    description: '表单项的验证规则',
  },
  props: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
    description: '传递给表单项组件的额外属性',
  },
  between: {
    type: Boolean,
    default: false,
    description: '水平排列时是否在表单项之间添加间隔',
  },
  gridArea: {
    type: String,
    default: '',
    description: '在网格布局中的位置',
  },
  id: {
    type: String,
    default: '',
    description: '表单项的唯一标识符',
    hidden: true,
  },
  outputFormat: {
    type: Function as PropType<(params: { value: unknown }) => unknown>,
    default: ({ value }: { value: unknown }) => value,
    description: '出参时的格式化方法',
  },
  inputFormat: {
    type: Function as PropType<(params: { value: unknown }) => unknown>,
    default: ({ value }: { value: unknown }) => value,
    description: '入参时的格式化方法',
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
