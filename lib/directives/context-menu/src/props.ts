import type { LewContextMenusOption } from 'lew-ui/types'
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
}
