import type { ExtractPropTypes } from 'vue'
import type { LewColor } from 'lew-ui'

export const dialogProps = {
  type: {
    type: String,
    default: 'error',
    description: '对话框类型',
    validator: (value: string) => {
      const validTypes: LewColor[] = [
        'primary',
        'success',
        'warning',
        'error',
        'info'
      ]
      if (!validTypes.includes(value as LewColor)) {
        console.warn(
          `[LewDialog] 无效的类型: ${value}。请使用 ${validTypes.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },
  okText: {
    type: String,
    defaultLocale: true,
    description: '确认按钮文本'
  },
  cancelText: {
    type: String,
    defaultLocale: true,
    description: '取消按钮文本'
  },
  ok: {
    type: Function,
    default: () => true,
    description: '点击确认按钮时的回调函数'
  },
  cancel: {
    type: Function,
    default: () => true,
    description: '点击取消按钮时的回调函数'
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    description: '是否在点击遮罩层时关闭对话框'
  },
  closeByEsc: {
    type: Boolean,
    default: false,
    description: '是否允许通过按下 ESC 键关闭对话框'
  },
  transformOrigin: {
    type: String,
    default: '0 0',
    description: '对话框变换原点（内部使用，无需手动设置）'
  }
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
