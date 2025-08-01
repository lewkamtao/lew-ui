import type { Property } from 'csstype'
import type { TagProps } from 'lew-ui'
import type { LewComponentSource } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export interface MenuTreeItem {
  label: LewComponentSource
  icon?: LewComponentSource
  value: string
  active?: boolean
  disabled?: boolean
  children?: MenuTreeItem[]
  tagProps?: TagProps
}

export const menuTreeModel = {
  modelValue: {
    type: String,
  },
  expandKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
}

export const menuTreeProps = {
  options: {
    type: Array as PropType<MenuTreeItem[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewMenuTree',
      propName: 'options',
    }),
  },
  width: {
    type: [String, Number] as PropType<Property.Width | number>,
    default: '240px',
    validator: validators.widthHeight({
      componentName: 'LewMenuTree',
      propName: 'width',
    }),
  },
}

export const menuTreeItemProps = {
  label: {
    type: null,
  },
  value: {
    type: String,
    required: true,
    validator: validators.string({
      componentName: 'LewMenuTreeItem',
      propName: 'value',
    }),
  },
  icon: {
    type: null,
  },
  tagProps: {
    type: Object as PropType<TagProps>,
    validator: validators.object({
      componentName: 'LewMenuTreeItem',
      propName: 'tagProps',
    }),
  },
  level: {
    type: Number,
    default: 1,
    validator: validators.positiveInteger({
      componentName: 'LewMenuTreeItem',
      propName: 'level',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewMenuTreeItem',
      propName: 'disabled',
    }),
  },
  isLeaf: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewMenuTreeItem',
      propName: 'isLeaf',
    }),
  },
}

export type MenuTreeProps = ExtractPropTypes<typeof menuTreeProps>
export type MenuTreeItemProps = ExtractPropTypes<typeof menuTreeItemProps>
