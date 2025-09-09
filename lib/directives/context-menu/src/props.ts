import type { LewContextMenusOption, LewMenuTrigger } from 'lew-ui/types'
import type { PropType } from 'vue'
import validators from 'lew-ui/validators'

export const contextMenuProps = {
  options: {
    type: Array as PropType<LewContextMenusOption[]>,
    required: true,
    typePopKeys: ['LewContextMenusOption'],
    validator: validators.array({
      componentName: 'LewContextMenu',
      propName: 'options',
    }),
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewContextMenu',
      propName: 'disabled',
    }),
  },
  dropdownInstance: {
    type: null,
    hidden: true,
    default: null,
  },
  trigger: {
    type: String as PropType<LewMenuTrigger>,
    default: 'right-click',
    validator: validators.string({
      componentName: 'LewContextMenu',
      propName: 'trigger',
    }),
  },
}
