import type { ExtractPropTypes, PropType } from 'vue'

export type DatePickerSize = 'small' | 'medium' | 'large'

export const datePickerModel = {
  modelValue: {
    type: String,
    default: '',
    description: '绑定值'
  }
}

export const datePickerProps = {
  size: {
    type: String as PropType<DatePickerSize>,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
  },
  clearable: {
    type: Boolean,
    default: true,
    description: '是否显示清除按钮'
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
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    description: '日期格式'
  },
  placeholder: {
    type: String,
    default: () => {
      return '请选择日期'
    },
    description: '默认提示语'
  },
  presets: {
    type: Array as PropType<DatePickerPresetsOptions[]>,
    default: () => {
      return []
    },
    description: '预设时间范围'
  }
}

export type DatePickerPresetsOptions = {
  label: string
  value: string
}

export const dateProps = {
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    description: '日期格式'
  }
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
