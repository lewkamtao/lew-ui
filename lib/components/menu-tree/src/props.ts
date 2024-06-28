import type { ExtractPropTypes, PropType } from 'vue'
import type { TagColor } from 'lew-ui'

export type MenuTreeOptions = {
  label: string // 标题
  value?: string // 值
  children?: MenuTreeOptions[] // 子类
  disabled?: boolean // 是否禁用
  level?: number // 层级
  icon?: string // 图标
  tagText?: string // 标签文本
  tagColor?: TagColor // 标签颜色
}

export const menuTreeProps = {
  options: {
    type: Array as PropType<MenuTreeOptions[]>,
    default: [],
    typeDesc: 'MenuOptions[]',
    description: '颜色'
  },
  actived: {
    type: String,
    default: '',
    description: '选中的值'
  }
}

export type MenuTreeProps = ExtractPropTypes<typeof menuTreeProps>
