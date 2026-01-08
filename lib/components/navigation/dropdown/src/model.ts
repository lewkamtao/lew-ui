import type { PropType } from 'vue'

export const dropdownModel = {
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
}

export type DropdownModel = typeof dropdownModel
