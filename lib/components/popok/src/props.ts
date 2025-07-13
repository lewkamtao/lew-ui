import type { LewColor } from 'lew-ui/types'
import type { PopoverPlacement, PopoverTrigger } from '../../popover/index'
export const popokButtonProps = {
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
        'info',
      ]
      if (!validTypes.includes(value as LewColor)) {
        console.warn(
          `[LewPopok] 无效的类型: ${value}。请使用 ${validTypes.join(', ')} 中的一个。`,
        )
        return false
      }
      return true
    },
  },
  okText: {
    type: String,
    defaultLocale: true,
    description: '确认按钮文本',
  },
  cancelText: {
    type: String,
    defaultLocale: true,
    description: '取消按钮文本',
  },
  ok: {
    type: Function,
    default: () => true,
    description: '点击确认按钮时的回调函数',
  },
  cancel: {
    type: Function,
    default: () => true,
    description: '点击取消按钮时的回调函数',
  },
  width: {
    type: [String, Number],
    default: '280px',
    description: '弹出框宽度',
    validator: (value: string | number) => {
      if (typeof value === 'string' && !/^\d+(%|px|em|rem|vw)$/.test(value)) {
        console.warn(
          `[LewPopok] 宽度 "${value}" 无效。请使用有效的 CSS 宽度值。`,
        )
        return false
      }
      return true
    },
  },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click',
    description: '触发方式',
    validator: (value: string) => {
      const validTriggers = ['hover', 'click']
      if (!validTriggers.includes(value)) {
        console.warn(
          `[LewPopok] 触发方式 "${value}" 无效。请使用 ${validTriggers.join(' 或 ')}。`,
        )
        return false
      }
      return true
    },
  },
  title: {
    type: String,
    default: '',
    description: '弹出框标题',
  },
  content: {
    type: String,
    default: '',
    description: '弹出框内容',
  },
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'top',
    description: '弹出框位置',
    validator: (value: string) => {
      const validPlacements = [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ]
      if (!validPlacements.includes(value)) {
        console.warn(
          `[LewPopok] 位置 "${value}" 无效。请使用 ${validPlacements.join(', ')} 中的一个。`,
        )
        return false
      }
      return true
    },
  },
}
