import type { LewStatusColor } from 'lew-ui'
import type { ExtractPropTypes } from 'vue'
import { validStatusColors } from 'lew-ui/constants'

export const alertProps = {
  type: {
    type: String,
    default: 'normal',
    description: '提示类型',
    validator: (value: LewStatusColor) => {
      if (!validStatusColors.includes(value)) {
        console.warn(
          `[LewAlert] 无效的类型值: ${value}. 请使用预定义的类型之一。`,
        )
        return false
      }
      return true
    },
  },

  title: {
    type: String,
    typeGhost: 'String | Slot',
    default: '',
    description: '提示信息',
  },

  content: {
    type: String,
    typeGhost: 'String | Slot',
    default: '',
    description: '描述信息',
  },

  closeable: {
    type: Boolean,
    default: false,
    description: '关闭按钮',
  },

  footer: {
    type: String,
    typeGhost: 'slot',
    default: '',
    description: '底部插槽',
  },
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
