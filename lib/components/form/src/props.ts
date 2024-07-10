import type { ExtractPropTypes, PropType } from 'vue'

export type FormSize = 'small' | 'medium' | 'large'

export const formProps = {
  options: {
    type: Array,
    required: true,
    default: [],
    description: '表单配置'
  },
  size: {
    type: String as PropType<FormSize>,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
  },
  columns: {
    type: [Number, String],
    default: 1,
    description: '每行显示的表单项数量，最大值为 4'
  },
  labelWidth: {
    type: [Number, String],
    default: '110px',
    description: '标签宽度'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用表单'
  },
  direction: {
    type: String,
    default: 'x',
    description: '排列方向，可选值为 x 或 y'
  }
}

export const formItemProps = {
  label: {
    type: String,
    default: '',
    description: '标签'
  },
  field: {
    type: String,
    default: '',
    description: '字段名'
  },
  gridArea: {
    type: String,
    default: '',
    description: '网格区域'
  },
  width: {
    type: [Number, String],
    default: '',
    description: '表单项宽度'
  },
  labelWidth: {
    type: [Number, String],
    default: '',
    description: '标签宽度'
  },
  direction: {
    type: String,
    default: 'x',
    description: '排列方向，可选值为 x 或 y'
  },
  size: {
    type: String as PropType<FormSize>,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
  },
  required: {
    type: Boolean,
    default: false,
    description: '是否必填'
  },
  rule: {
    type: Object as PropType<Record<string, any>>,
    description: '表单项验证规则'
  },
  errMessage: {
    type: String,
    default: '',
    description: '表单项验证错误提示信息'
  },
  as: {
    type: String,
    default: 'input',
    description: '表单项类型'
  },
  props: {
    type: Object as PropType<Record<string, any>>,
    default: {},
    description: '表单项组件属性'
  }
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
