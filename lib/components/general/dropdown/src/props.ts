import type { ContextMenus } from 'lew-ui'
import type { LewPopoverPlacement, LewPopoverTrigger } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import { validPopoverPlacement, validPopoverTrigger } from 'lew-ui/constants'

export const dropdownModel = {
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
}

export const dropdownProps = {
  trigger: {
    type: String as PropType<LewPopoverTrigger>,
    default: 'hover',
    validator(value: LewPopoverTrigger): boolean {
      if (!validPopoverTrigger.includes(value)) {
        console.warn(`[LewDropdown] Invalid trigger: "${value}". Expected: "hover" or "click".`)
        return false
      }
      return true
    },
  },
  placement: {
    type: String as PropType<LewPopoverPlacement>,
    default: 'bottom',
    validator(value: LewPopoverPlacement): boolean {
      if (!validPopoverPlacement.includes(value)) {
        console.warn(`[LewDropdown] Invalid placement: "${value}". Expected one of: ${validPopoverPlacement.join(', ')}.`)
        return false
      }
      return true
    },
  },
  options: {
    type: Array as PropType<ContextMenus[]>,
    default: () => [],
    validator(value: ContextMenus[]): boolean {
      if (!Array.isArray(value)) {
        console.warn(`[LewDropdown] Invalid options: "${value}". Expected: array.`)
        return false
      }
      return true
    },
  },
  checkable: {
    type: Boolean,
  },
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
