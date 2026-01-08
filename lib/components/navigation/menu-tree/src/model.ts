import type { PropType } from 'vue'

export const menuTreeModel = {
  modelValue: {
    type: String,
    default: undefined,
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

export type MenuTreeModel = typeof menuTreeModel
