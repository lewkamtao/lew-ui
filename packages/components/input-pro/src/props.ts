import type { PropType } from 'vue'

export interface Options {
  label: string
  value: string
}

export const _props = {
  // 类型
  type: {
    type: String,
    default: '',
  },
  // 绑定值
  modelValue: {
    // 父组件 v-model 没有指定参数名，则默认是 modelValue
    type: String,
    default: '',
  },
  autoWidth: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<Options[]>,
    default() {
      return []
    },
  },
  align: {
    type: String,
    default: 'left',
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否使用清空按钮
  clearable: {
    type: Boolean,
    default: false,
  },
  // 默认提示语
  placeholder: {
    type: String,
    default: '请输入',
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false,
  },
  // 展示密码
  showPassword: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
    default: null,
  },
  showCount: {
    type: Boolean,
    default: false,
  },
  niceCount: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
  },

  popoverWidth: {
    type: String,
    default: 'auto',
  },

  trigger: {
    type: String,
    default: 'click',
  },

  placement: {
    type: String,
    default: 'bottom-start',
  },
}
