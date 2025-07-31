import type { Property } from 'csstype'
import type { TagProps } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { isValidCssValue } from 'lew-ui/utils'

// Types
export interface MenuTreeItem {
  label: string | (() => any)
  value: string | number
  active?: boolean
  disabled?: boolean
  children?: MenuTreeItem[]
  icon?: () => any
  tagProps?: TagProps
}

// Constants
const DEFAULT_WIDTH = '240px'

export const menuTreeModel = {
  // Content props
  modelValue: {
    type: String,
    default: '',
    validator(value: string): boolean {
      if (typeof value !== 'string') {
        console.warn(`[LewMenuTree] Invalid modelValue: "${value}". Expected: string.`)
        return false
      }
      return true
    },
  },

  // State props
  expandKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },

  collapsed: {
    type: Boolean,
    default: false,
  },
}

export const menuTreeProps = {
  // Content props
  options: {
    type: Array as PropType<MenuTreeItem[]>,
    default: () => [],
    validator(value: MenuTreeItem[]): boolean {
      if (!Array.isArray(value)) {
        console.warn(`[LewMenuTree] Invalid options: "${value}". Expected: array.`)
        return false
      }

      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        if (!item || typeof item !== 'object') {
          console.warn(`[LewMenuTree] Invalid options[${i}]: "${item}". Expected: object.`)
          return false
        }

        if (typeof item.label !== 'string' && typeof item.label !== 'function') {
          console.warn(`[LewMenuTree] Invalid options[${i}].label: "${item.label}". Expected: string or function.`)
          return false
        }

        if (typeof item.value !== 'string' && typeof item.value !== 'number') {
          console.warn(`[LewMenuTree] Invalid options[${i}].value: "${item.value}". Expected: string or number.`)
          return false
        }
      }

      return true
    },
  },

  // Style props
  width: {
    type: [String, Number] as PropType<Property.Width | number>,
    default: DEFAULT_WIDTH,
    validator(value: Property.Width | number): boolean {
      const isValid = isValidCssValue({
        name: 'LewMenuTree',
        field: 'width',
        value,
      })

      if (!isValid) {
        console.warn(`[LewMenuTree] Invalid width: "${value}". Expected: valid CSS width value.`)
        return false
      }

      return true
    },
  },
}

export const menuTreeItemProps = {
  // Content props
  label: {
    type: null,
  },

  value: {
    type: [String, Number] as PropType<string | number>,
    required: true,
    validator(value: string | number): boolean {
      if (value === '' || value === null || value === undefined) {
        console.warn(`[LewMenuTreeItem] Invalid value: "${value}". Expected: non-empty string or number.`)
        return false
      }
      return true
    },
  },

  icon: {
    type: null,
  },

  tagProps: {
    type: Object as PropType<TagProps>,
    default: () => ({}),
  },

  // State props
  disabled: {
    type: Boolean,
    default: false,
  },

  // Structure props
  level: {
    type: Number,
    default: 1,
    validator(value: number): boolean {
      if (!Number.isInteger(value) || value < 1) {
        console.warn(`[LewMenuTreeItem] Invalid level: "${value}". Expected: positive integer starting from 1.`)
        return false
      }
      return true
    },
  },

  isLeaf: {
    type: Boolean,
    default: false,
  },
}

export type MenuTreeProps = ExtractPropTypes<typeof menuTreeProps>
export type MenuTreeItemProps = ExtractPropTypes<typeof menuTreeItemProps>
