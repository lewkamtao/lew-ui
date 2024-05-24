import type { PropType } from 'vue'

export const inputTagModel = {
  // 绑定值
  modelValue: {
    type: Array as PropType<string[]> | undefined,
    default: [],
    description: '绑定值'
  }
}
export const inputTagProps = {
  size: {
    type: String,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
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
  }, // 默认提示语
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
  }
}
