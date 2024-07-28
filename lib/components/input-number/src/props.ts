import type { ExtractPropTypes } from 'vue'

export const inputNumberModel = {
  modelValue: {
    type: [Number, undefined],
    default: '',
    description: '值（双向绑定）'
  }
}

export const inputNumberProps = {
  size: {
    type: String,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
  },
  step: {
    type: Number,
    default: 0.01,
    description: '允许小数值，步长默认为 0.01，精确到小数点后 2 位'
  },
  min: {
    type: Number,
    default: 0,
    description: '最小值'
  },
  max: {
    type: Number,
    default: 100,
    description: '最大值'
  },
  selectByFocus: {
    type: Boolean,
    default: false,
    description: '是否聚焦选中文本'
  },
  align: {
    type: String,
    default: 'left',
    description: '对齐方式，可选值为 left、center、right'
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  },
  // 是否使用清空按钮
  clearable: {
    type: Boolean,
    default: false,
    description: '是否使用清空按钮'
  },
  // 默认提示语
  placeholder: {
    type: String,
    default: '请输入',
    description: '默认提示语'
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  minWidth: {
    type: [Number, String],
    default: '120px',
    description: '最小宽度'
  }
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
