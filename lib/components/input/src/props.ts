import { ExtractPropTypes, PropType } from 'vue'
import { SelectOptions } from 'lew-ui'

export type InputPrefixesType = 'icon' | 'select' | 'text'
export type InputSuffixType = 'icon' | 'select' | 'text'

export const inputModel = {
  modelValue: {
    type: [String, Number, undefined],
    default: '',
    description: '值（双向绑定）'
  },
  prefixesValue: {
    type: [String, Number],
    default: '',
    description: '前缀值'
  },
  suffixValue: {
    type: [String, Number],
    default: '',
    description: '后缀值'
  }
}

export const inputProps = {
  // 类型
  type: {
    type: String,
    default: 'text',
    description: '类型，可选值为 text、password'
  },
  size: {
    type: String,
    default: 'medium',
    description: '尺寸，可选值为 small、medium、large'
  },
  focusSelect: {
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
  // 是否可复制
  copyable: {
    type: Boolean,
    default: false,
    description: '是否允许复制（只在readonly为true，且suffix为false时生效）'
  },
  // 对齐方式
  showPassword: {
    type: Boolean,
    default: false,
    description: '是否显示密码切换按钮'
  },
  autoWidth: {
    type: Boolean,
    default: false,
    description: '是否自动宽度'
  },
  maxLength: {
    type: [Number, String],
    default: null,
    description: '最大输入长度'
  },
  showCount: {
    type: Boolean,
    default: false,
    description: '是否显示输入字数统计，只在 type = text 时有效'
  },
  renderCount: {
    type: Function,
    default: (value: string) => {
      return value?.length || 0
    },
    description: '自定义输入字数统计方法'
  },
  prefixes: {
    type: String as PropType<InputPrefixesType>,
    default: '',
    description: '前缀'
  },

  prefixesOptions: {
    type: Array as PropType<SelectOptions[]>,
    default: () => [],
    description: '前缀选项'
  },
  prefixesTooltip: {
    type: String,
    default: '',
    description: '前缀提示'
  },
  suffix: {
    type: String as PropType<InputSuffixType>,
    default: '',
    description: '后缀'
  },
  suffixOptions: {
    type: Array as PropType<SelectOptions[]>,
    default: () => [],
    description: '后缀选项'
  },
  suffixTooltip: {
    type: String,
    default: '',
    description: '后缀提示'
  },
  okByEnter: {
    type: Boolean,
    default: false,
    description: '是否按回车键确认'
  },
  regular: {
    type: Function as PropType<(value: string) => boolean>,
    default: () => true,
    description: '正则校验'
  }
}
export type InputProps = ExtractPropTypes<typeof inputProps>
