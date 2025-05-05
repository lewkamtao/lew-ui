import type { ExtractPropTypes } from 'vue'
import { isValidCssValue } from 'lew-ui/utils'

export type MenuTreeItem = {
  label: string | (() => any)
  value: string | number
  active?: boolean
  disabled?: boolean
  children?: MenuTreeItem[]
  icon?: () => any
}

export const menuTreeModel = {
  modelValue: {
    type: String,
    default: '',
    description: '双向绑定值',
    validator(value: string): boolean {
      if (typeof value !== 'string') {
        console.warn('[LewMenuTree] modelValue 必须是字符串类型。')
        return false
      }
      return true
    }
  },
  expandKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
    description: '菜单树的当前展开项，用于双向绑定。'
  },
  collapsed: {
    type: Boolean,
    default: false,
    description: '菜单树是否折叠。'
  }
}

export const menuTreeProps = {
  options: {
    type: Array as PropType<MenuTreeItem[]>,
    default: [],
    description: '菜单树的数据源，支持嵌套结构。'
  },
  width: {
    type: [String, Number],
    default: '240px',
    description: '菜单树的宽度，支持 CSS 宽度值。',
    validator(value: string | number): boolean {
      return isValidCssValue({
        name: 'LewMenuTree',
        field: 'width',
        value
      })
    }
  }
}

export const menuTreeItemProps = {
  label: {
    type: [String, Function],
    default: '',
    description:
      '菜单树项的标题文本。也可以使用具名插槽 "label" 自定义标题内容。'
  },
  value: {
    type: [String, Number],
    required: true,
    description: '菜单树项的唯一标识符。',
    validator(value: string | number): boolean {
      if (value === '') {
        console.warn('[LewMenuTreeItem] value 不能为空。')
        return false
      }
      return true
    }
  },
  icon: {
    type: Function,
    default: () => {},
    description: '菜单树项的图标。'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '菜单树项是否禁用。'
  },
  level: {
    type: Number,
    default: 1,
    description: '菜单树项的层级，从 1 开始。'
  },
  isLeaf: {
    type: Boolean,
    default: false,
    description: '是否为叶子节点。'
  }
}

export type MenuTreeProps = ExtractPropTypes<typeof menuTreeProps>
export type MenuTreeItemProps = ExtractPropTypes<typeof menuTreeItemProps>
