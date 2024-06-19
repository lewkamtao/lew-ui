import type { ExtractPropTypes } from 'vue'

export const formModel = {
  options: {
    type: Array,
    required: true,
    default: [],
    description: '可控表单配置'
  }
}
export const formProps = {
  options: {
    type: Object,
    required: true,
    description: '表单配置'
  },
  size: {
    type: String,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
  },
  width: {
    type: [Number, String],
    description: '表单宽度'
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
  }
}

export type FormProps = ExtractPropTypes<typeof formProps>
