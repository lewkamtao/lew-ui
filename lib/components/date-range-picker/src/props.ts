import type { ExtractPropTypes, PropType } from 'vue'
import type { DatePickerSize } from '../../date-picker/src/props'

export const dateRangePickerModel = {
  modelValue: {
    type: Object,
    default: {},
    description: '绑定值，可选值为{start: Date, end: Date}'
  }
}

export const dateRangePickerProps = {
  startKey: {
    type: String,
    default: 'start',
    description: '开始日期的字段名'
  },
  endKey: {
    type: String,
    default: 'end',
    description: '结束日期的字段名'
  },
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
  placeholderStart: {
    type: String,
    default: () => {
      return '开始日期'
    },
    description: '开始日期的默认提示语'
  },
  placeholderEnd: {
    type: String,
    default: () => {
      return '结束日期'
    },
    description: '结束日期的默认提示语'
  }
}

export const dateRangeProps = {
  startKey: {
    type: String,
    default: 'start',
    description: '开始日期的字段名'
  },
  endKey: {
    type: String,
    default: 'end',
    description: '结束日期的字段名'
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
    description: '日期格式'
  }
}

export type DateRangePickerProps = ExtractPropTypes<typeof dateRangePickerProps>
