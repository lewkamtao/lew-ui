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
    description: '警告框配置列表',
    validator: (value: AlertItem[]): boolean => {
      if (!Array.isArray(value)) {
        console.warn('[LewAlert] options 必须是一个数组')
        return false
      }
      return value.every((item, index) => {
        if (typeof item !== 'object' || item === null) {
          console.warn(`[LewAlert] options[${index}] 必须是一个对象`)
          return false
        }
        if (!validStatusColors.includes(item.type)) {
          console.warn(`[LewAlert] options[${index}].type 必须是 "${validStatusColors.join('", "')}" 之一`)
          return false
        }
        if (typeof item.title !== 'string' || item.title.trim() === '') {
          console.warn(`[LewAlert] options[${index}].title 必须是一个非空字符串`)
          return false
        }
        if (item.content !== undefined && typeof item.content !== 'string') {
          console.warn(`[LewAlert] options[${index}].content 必须是一个字符串`)
          return false
        }
        if (item.closeable !== undefined && typeof item.closeable !== 'boolean') {
          console.warn(`[LewAlert] options[${index}].closeable 必须是一个布尔值`)
          return false
        }
        return true
      })
    }
  }
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
