import type { ButtonProps } from '../../button/index'

export const popokProps = {
  type: {
    type: String,
    default: 'warning',
    description: '弹出框类型',
    validator: (value: string) => {
      const validTypes = ['success', 'warning', 'error', 'info']
      if (!validTypes.includes(value)) {
        console.warn(`[LewPopok] 类型 "${value}" 无效。请使用 ${validTypes.join(', ')} 中的一个。`)
        return false
      }
      return true
    }
  },
  width: {
    type: [String, Number],
    default: '280px',
    description: '弹出框宽度',
    validator: (value: string | number) => {
      if (typeof value === 'string' && !/^\d+(%|px|em|rem|vw)$/.test(value)) {
        console.warn(`[LewPopok] 宽度 "${value}" 无效。请使用有效的 CSS 宽度值。`)
        return false
      }
      return true
    }
  },
  trigger: {
    type: String,
    default: 'click',
    description: '触发方式',
    validator: (value: string) => {
      const validTriggers = ['hover', 'click']
      if (!validTriggers.includes(value)) {
        console.warn(`[LewPopok] 触发方式 "${value}" 无效。请使用 ${validTriggers.join(' 或 ')}。`)
        return false
      }
      return true
    }
  },
  title: {
    type: String,
    default: '',
    description: '弹出框标题'
  },
  okProps: {
    type: Object as PropType<ButtonProps>,
    default: () => ({
      text: '确定',
      color: 'primary'
    }),
    description: '确定按钮的属性'
  },
  cancelProps: {
    type: Object as PropType<ButtonProps>,
    default: () => ({
      type: 'text',
      text: '取消',
      color: 'normal'
    }),
    description: '取消按钮的属性'
  },
  content: {
    type: String,
    default: '',
    description: '弹出框内容'
  },
  placement: {
    type: String,
    default: 'top',
    description: '弹出框位置',
    validator: (value: string) => {
      const validPlacements = [
        'top', 'bottom', 'left', 'right',
        'top-start', 'top-end', 'bottom-start', 'bottom-end',
        'left-start', 'left-end', 'right-start', 'right-end'
      ]
      if (!validPlacements.includes(value)) {
        console.warn(`[LewPopok] 位置 "${value}" 无效。请使用 ${validPlacements.join(', ')} 中的一个。`)
        return false
      }
      return true
    }
  }
}
