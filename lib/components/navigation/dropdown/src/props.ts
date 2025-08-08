import type { LewContextMenusOption } from 'lew-ui'
import type { LewPlacement, LewTrigger } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validPlacementList, validTriggerList } from 'lew-ui/validators'

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
    typeValues: validTriggerList,
    validator: validators.enum({
      componentName: 'LewDropdown',
      propName: 'trigger',
      values: validTriggerList,
    }),
  },
  placement: {
    type: String as PropType<LewPlacement>,
    default: 'bottom',
    validator: validators.enum({
      componentName: 'LewDropdown',
      propName: 'placement',
      values: validPlacementList,
    }),
  },
  options: {
    type: Array as PropType<LewContextMenusOption[]>,
    typePopKeys: ['LewContextMenusOption'],
    required: true,
    validator: validators.array({
      componentName: 'LewDropdown',
      propName: 'options',
    }),
  },
  checkable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDropdown',
      propName: 'checkable',
    }),
  },
}

export type LewDropdownProps = ExtractPublicPropTypes<typeof dropdownProps>
