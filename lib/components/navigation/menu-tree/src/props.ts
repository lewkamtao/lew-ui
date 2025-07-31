import type { Property } from 'csstype'
import type { TagProps } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'

// Type definitions
export interface MenuTreeItem {
  label: string | (() => any)
  value: string | number
  active?: boolean
  disabled?: boolean
  children?: MenuTreeItem[]
  icon?: () => any
  tagProps?: TagProps
}

// Model definitions
export const menuTreeModel = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  expandKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
}

// Props definitions
export const menuTreeProps = {
  options: {
    type: Array as PropType<MenuTreeItem[]>,
    default: () => [],
    validator(value: MenuTreeItem[]): boolean {
      if (!Array.isArray(value)) {
        console.warn(`[LewMenuTree] Invalid options: "${typeof value}". Expected: array.`)
        return false
      }

      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        if (!item || typeof item !== 'object') {
          console.warn(`[LewMenuTree] Invalid options[${i}]: "${item}". Expected: object with label and value properties.`)
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
  width: {
    type: [String, Number] as PropType<Property.Width | number>,
    default: '240px',
    validator(value: Property.Width | number): boolean {
      if (!value) {
        console.warn(`[LewMenuTree] Invalid width: "${value}". Expected: valid CSS width value.`)
        return false
      }

      if (typeof value === 'number' && value < 0) {
        console.warn(`[LewMenuTree] Invalid width: "${value}". Expected: non-negative number.`)
        return false
      }

      if (typeof value === 'string') {
        const autoRegex = /^auto$/i
        const calcRegex = /^calc\((.+)\)$/
        const percentRegex = /^-?\d+(\.\d+)?%$/
        const pixelRegex = /^-?\d+(\.\d+)?(px)?$/
        const numericRegex = /^-?\d+(\.\d+)?$/

        if (
          autoRegex.test(value)
          || calcRegex.test(value)
          || percentRegex.test(value)
          || pixelRegex.test(value)
          || numericRegex.test(value)
        ) {
          return true
        }

        console.warn(`[LewMenuTree] Invalid width: "${value}". Expected: valid CSS width value (e.g., "240px", "50%", "auto", "calc(100% - 20px)").`)
        return false
      }

      return true
    },
  },
}

export const menuTreeItemProps = {
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
  label: {
    type: [String, Function] as PropType<string | (() => any)>,
  },
  icon: {
    type: Function as PropType<() => any>,
  },
  tagProps: {
    type: Object as PropType<TagProps>,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
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

// Extract prop types
export type MenuTreeProps = ExtractPropTypes<typeof menuTreeProps>
export type MenuTreeItemProps = ExtractPropTypes<typeof menuTreeItemProps>
