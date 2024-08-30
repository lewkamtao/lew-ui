import type { ExtractPropTypes } from 'vue'
import type { LewColor } from 'lew-ui'

export type MenuOptions = {
  label: string // 标题
  value?: string // 值
  children?: MenuOptions[] // 子菜单
  disabled?: boolean // 是否禁用
  level?: number // 菜单层级
  icon?: string // 图标
  tagText?: string // 标签文本
  tagColor?: LewColor // 标签颜色
}

export const menuProps = {
  options: {
    type: Array,
    default: () => [],
    description: '菜单选项配置',
    validator: (value: unknown): boolean => {
      if (!Array.isArray(value)) {
        console.warn('[LewMenu] options 必须是一个数组')
        return false
      }
      return true
    }
  },
  active: {
    type: String,
    default: '',
    description: '当前激活的菜单项的值',
    validator: (value: unknown): boolean => {
      if (typeof value !== 'string') {
        console.warn('[LewMenu] active 必须是一个字符串')
        return false
      }
      return true
    }
  }
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
