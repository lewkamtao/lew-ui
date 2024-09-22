import type { ExtractPropTypes } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'
export type DatePickerValueFormat = string
export type DatePickerPresetsOption = {
  label: string
  value: string
}

export const datePickerModel = {
  modelValue: {
    type: String,
    default: '',
    description: '当前选中的日期值'
  }
}

export const datePickerProps = {
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    description: '日期输出格式'
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '选择器尺寸',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn('[LewDatePicker] size 必须是 "small"、"medium" 或 "large"')
        return false
      }
      return true
    }
  },
  placeholder: {
    type: String,
    default: '请选择日期',
    description: '输入框占位文本'
  },
  clearable: {
    type: Boolean,
    default: true,
    description: '是否可清除'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  },
  presets: {
    type: Array as PropType<DatePickerPresetsOption[]>,
    default: () => [],
    description: '预设日期选项',
    validator(value: DatePickerPresetsOption[]): boolean {
      if (
        !Array.isArray(value) ||
        !value.every(
          (item) =>
            typeof item.label === 'string' && typeof item.value === 'string'
        )
      ) {
        console.warn(
          '[LewDatePicker] presets 必须是包含 label 和 value 字符串的对象数组'
        )
        return false
      }
      return true
    }
  }
}

export const dateProps = {
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    description: '日期格式化字符串'
  }
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
