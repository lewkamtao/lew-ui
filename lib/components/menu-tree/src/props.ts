import type { ExtractPropTypes, PropType } from 'vue'
import type { LewColor } from 'lew-ui'

export type MenuTreeOptions = {
  label: string // 标题
  value?: string // 值
  children?: MenuTreeOptions[] // 子类
  disabled?: boolean // 是否禁用
  level?: number // 层级
  icon?: string // 图标
  tagText?: string // 文本
  tagColor?: LewColor // 颜色
}

export const menuTreeProps = {
  options: {
    type: Array as PropType<MenuTreeOptions[]>,
    default: [],
    typeDesc: 'MenuOptions[]',
    description: '颜色'
  },
  active: {
    type: String,
    default: '',
    description: '选中的值'
  }
}

export type MenuTreeProps = ExtractPropTypes<typeof menuTreeProps>
