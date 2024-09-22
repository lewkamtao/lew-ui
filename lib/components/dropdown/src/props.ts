import type { ExtractPropTypes, PropType } from 'vue'
import type { ContextMenus } from 'lew-ui'

export type DropdownTrigger = 'hover' | 'click'
export type DropdownPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type DropdownOptions = ContextMenus

export const dropdownProps = {
  trigger: {
    type: String as PropType<DropdownTrigger>,
    default: 'hover',
    description: '触发方式',
    validator(value: DropdownTrigger): boolean {
      if (!['hover', 'click'].includes(value)) {
        console.warn(
          `[LewDropdown] 无效的触发方式: ${value}。请使用 'hover' 或 'click'`
        )
        return false
      }
      return true
    }
  },
  placement: {
    type: String as PropType<DropdownPlacement>,
    default: 'bottom',
    description: '弹出位置',
    validator(value: DropdownPlacement): boolean {
      const validPlacements = [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ]
      if (!validPlacements.includes(value)) {
        console.warn(
          `[LewDropdown] 无效的弹出位置: ${value}。请使用有效的位置值`
        )
        return false
      }
      return true
    }
  },
  options: {
    type: Array as PropType<DropdownOptions[]>,
    default: () => [],
    description: '选项列表',
    validator(value: DropdownOptions[]): boolean {
      if (!Array.isArray(value)) {
        console.warn('[LewDropdown] 选项列表必须是一个数组')
        return false
      }
      return true
    }
  }
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
