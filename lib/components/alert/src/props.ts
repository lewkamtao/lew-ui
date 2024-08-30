import type { ExtractPropTypes } from 'vue'
import type { LewStatusColor } from 'lew-ui'
import { validStatusColors } from 'lew-ui/constants'

export interface AlertItem {
  type: LewStatusColor
  title: string
  content?: string
  closeable?: boolean
}

export const alertProps = {
  options: {
    type: Array as PropType<AlertItem[]>,
    default: () => [],
    description: '警告框配置列表，包含多个警告项。每项定义警告的类型、标题、内容和是否可关闭。',
    validator: (value: AlertItem[]): boolean => {
      if (!Array.isArray(value)) {
        console.warn('[LewAlert] list 必须是一个数组。')
        return false
      }
      return value.every((item) => {
        if (typeof item !== 'object' || item === null) {
          console.warn('[LewAlert] list 中的每一项必须是一个对象。')
          return false
        }
        if (!validStatusColors.includes(item.type)) {
          console.warn('[LewAlert] 警告类型必须是 "info"、"success"、"warning" 或 "error" 之一。')
          return false
        }
        if (typeof item.title !== 'string' || item.title.trim() === '') {
          console.warn('[LewAlert] 警告标题必须是一个非空字符串。')
          return false
        }
        if (item.content !== undefined && typeof item.content !== 'string') {
          console.warn('[LewAlert] 警告内容（如果提供）必须是一个字符串。')
          return false
        }
        if (item.closeable !== undefined && typeof item.closeable !== 'boolean') {
          console.warn('[LewAlert] closeable 属性（如果提供）必须是一个布尔值。')
          return false
        }
        return true
      })
    }
  }
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
