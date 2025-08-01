import type { TagProps } from 'lew-ui'
import type { ExtractPropTypes } from 'vue'
import validators from 'lew-ui/validators'

export interface MenuOptions {
  label: string // 标题
  value?: string // 值
  children?: MenuOptions[] // 子菜单
  disabled?: boolean // 是否禁用
  icon?: () => any
  tagProps?: TagProps
}

export const menuModel = {
  modelValue: {
    type: String,
  },
}

export const menuProps = {
  options: {
    type: Array as PropType<MenuOptions[]>,
    default: [],
    typeGhost: 'MenuOptions[]',
    validator: validators.array({
      componentName: 'LewMenu',
      propName: 'options',
    }),
  },
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
