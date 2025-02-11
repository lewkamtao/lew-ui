import type { ExtractPropTypes, PropType } from 'vue'
import type { ContextMenus } from 'lew-ui'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'
export type InputType = 'text' | 'password'
export type InputAlign = 'left' | 'center' | 'right'
export type InputPrefixesType = 'icon' | 'select' | 'text'
export type InputSuffixType = 'icon' | 'select' | 'text'

export const inputModel = {
  modelValue: {
    type: [String, Number],
    default: undefined,
    description: '输入框的值，支持 v-model 双向绑定'
  },
  prefixesValue: {
    type: [String, Number],
    default: undefined,
    description: '输入框前缀的值'
  },
  suffixValue: {
    type: [String, Number],
    default: undefined,
    description: '输入框后缀的值'
  }
}

export const inputProps = {
  type: {
    type: String,
    default: 'text',
    description: '输入框类型',
    validator: (value: InputType) => {
      if (!['text', 'password'].includes(value)) {
        console.warn(
          `[LewInput] type 属性 ${value} 无效，必须是 "text" 或 "password"`
        )
        return false
      }
      return true
    }
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '尺寸',
    validator: (value: LewSize) => {
      if (!validSizes.includes(value)) {
        console.warn('[LewInput] size 属性必须是 "small"、"medium" 或 "large"')
        return false
      }
      return true
    }
  },
  placeholder: {
    type: String,
    defaultLocale: true,
    description: '输入框占位文本'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用输入框'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否将输入框设为只读'
  },
  clearable: {
    type: Boolean,
    default: false,
    description: '是否显示清空按钮'
  },
  showPassword: {
    type: Boolean,
    default: false,
    description: '是否显示切换密码可见性的按钮'
  },
  maxLength: {
    type: [Number, String],
    default: undefined,
    description: '输入框最大字符数',
    validator: (value: number | string) => {
      const num = Number(value)
      if (isNaN(num) || num <= 0) {
        console.warn('[LewInput] maxLength 属性必须是大于 0 的数字')
        return false
      }
      return true
    }
  },
  showCount: {
    type: Boolean,
    default: false,
    description: '是否显示字符计数（仅在 type 为 text 时有效）'
  },
  align: {
    type: String,
    default: 'left',
    description: '输入框文本对齐方式',
    validator: (value: InputAlign) => {
      if (!['left', 'center', 'right'].includes(value)) {
        console.warn('[LewInput] align 属性必须是 "left"、"center" 或 "right"')
        return false
      }
      return true
    }
  },
  minWidth: {
    type: [Number, String],
    default: '60px',
    description: '输入框最小宽度，支持数字（单位：像素）或带单位的字符串',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewInput] minWidth 属性必须大于 0')
        return false
      }
      return true
    }
  },
  autoWidth: {
    type: Boolean,
    default: false,
    description: '是否根据内容自动调整宽度'
  },
  selectByFocus: {
    type: Boolean,
    default: false,
    description: '聚焦时是否自动选中输入框内容'
  },
  copyable: {
    type: Boolean,
    default: false,
    description:
      '是否允许复制内容（仅在 readonly 为 true 且 suffix 为 false 时生效）'
  },
  prefixes: {
    type: String,
    default: '',
    description: '输入框前缀类型',
    validator: (value: InputPrefixesType) => {
      if (value && !['icon', 'select', 'text'].includes(value)) {
        console.warn(
          '[LewInput] prefixes 属性必须是 "icon"、"select" 或 "text"'
        )
        return false
      }
      return true
    }
  },
  prefixesOptions: {
    type: Array as PropType<ContextMenus[]>,
    default: () => [],
    description: '输入框前缀选项列表，当 prefixes 为 select 时使用'
  },
  prefixesTooltip: {
    type: String,
    default: '',
    description: '输入框前缀的 tooltip 提示文本'
  },
  suffix: {
    type: String,
    default: '',
    description: '输入框后缀类型',
    validator: (value: InputSuffixType) => {
      if (value && !['icon', 'select', 'text'].includes(value)) {
        console.warn('[LewInput] suffix 属性必须是 "icon"、"select" 或 "text"')
        return false
      }
      return true
    }
  },
  suffixOptions: {
    type: Array as PropType<ContextMenus[]>,
    default: () => [],
    description: '输入框后缀选项列表，当 suffix 为 select 时使用'
  },
  suffixTooltip: {
    type: String,
    default: '',
    description: '输入框后缀的 tooltip 提示文本'
  },
  okByEnter: {
    type: Boolean,
    default: false,
    description: '是否允许通过回车键确认输入'
  }
}

export type InputProps = ExtractPropTypes<typeof inputProps>
