import type { PropType, ExtractPropTypes } from 'vue'
import type { LewContextMenus } from 'lew-ui'

export type DropdownOptions = {
  label: number | string
  value: number | string
}

export const dropdownProps = {
  options: {
    type: Array as PropType<LewContextMenus[]>,
    default: [],
    description: '下拉选项'
  },
  trigger: {
    type: String,
    default: 'hover',
    description: '触发方式，可选值为 hover、click'
  },
  placement: {
    type: String,
    default: 'bottom',
    description: '弹出位置，可选值为 top、bottom、left、right'
  }
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
