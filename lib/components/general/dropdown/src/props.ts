import type { LewContextMenusOption } from 'lew-ui'
import type { LewPlacement, LewTrigger } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const dropdownModel = {
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
}

export const dropdownProps = {
  trigger: {
    type: String as PropType<LewTrigger>,
    default: 'hover',
    validator: validators.string({
      componentName: 'LewDropdown',
      propName: 'trigger',
    }),
  },
  placement: {
    type: String as PropType<LewPlacement>,
    default: 'bottom',
    validator: validators.string({
      componentName: 'LewDropdown',
      propName: 'placement',
    }),
  },
  options: {
    type: Array as PropType<LewContextMenusOption[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewDropdown',
      propName: 'options',
    }),
  },
  checkable: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewDropdown',
      propName: 'checkable',
    }),
  },
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
