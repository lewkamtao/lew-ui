import type { PropType } from 'vue'

export const collapseModel = {
  modelValue: {
    type: [Array, String] as PropType<string[] | string>,
  },
}

export const collapseItemModel = {
  modelValue: {
    type: Boolean,
    default: false,
  },
}

export type CollapseModel = typeof collapseModel
export type CollapseItemModel = typeof collapseItemModel
