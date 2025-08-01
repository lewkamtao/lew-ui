import type { LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const dateRangePickerModel = {
  modelValue: {
    type: Object as () => Record<string, Date | undefined>,
    default: () => ({}),
    description: '日期范围选择器的值',
  },
}

export const dateRangePickerProps = {
  startKey: {
    type: String,
    default: 'start',
    description: '开始日期的键名',
    validator(value: string) {
      if (value.trim() === '') {
        console.warn('[LewDateRangePicker] startKey 不能为空')
        return false
      }
      return true
    },
  },
  endKey: {
    type: String,
    default: 'end',
    description: '结束日期的键名',
    validator(value: string) {
      if (value.trim() === '') {
        console.warn('[LewDateRangePicker] endKey 不能为空')
        return false
      }
      return true
    },
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    description: '日期输出格式',
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '选择器尺寸',
    validator: validators.size({
      componentName: 'LewDateRangePicker',
      propName: 'size',
    }),
  },
  width: {
    type: [String, Number],
    default: '300px',
    description: '选择器宽度，支持数字（单位：像素）或带单位的字符串',
  },
  placeholderStart: {
    type: String,
    defaultLocale: true,
    description: '开始日期占位文本',
  },
  placeholderEnd: {
    type: String,
    defaultLocale: true,
    description: '结束日期占位文本',
  },
  clearable: {
    type: Boolean,
    default: true,
    description: '是否可清除',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用',
  },
}

export const dateRangeProps = {
  startKey: {
    type: String,
    default: 'start',
    description: '开始日期的键名',
    validator(value: string) {
      if (value.trim() === '') {
        console.warn('[LewDateRange] startKey 不能为空')
        return false
      }
      return true
    },
  },
  endKey: {
    type: String,
    default: 'end',
    description: '结束日期的键名',
    validator(value: string) {
      if (value.trim() === '') {
        console.warn('[LewDateRange] endKey 不能为空')
        return false
      }
      return true
    },
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    description: '日期格式化字符串',
  },
}

export type DateRangePickerProps = ExtractPropTypes<typeof dateRangePickerProps>
