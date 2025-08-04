import type { LewMenuOptions } from 'lew-ui'
import type { ExtractPropTypes } from 'vue'
import validators from 'lew-ui/validators'

export const menuModel = {
  modelValue: {
    type: String,
  },
}

export const menuProps = {
  options: {
    type: Array as PropType<LewMenuOptions[]>,
    default: [],
    typeGhost: 'MenuOptions[]',
    validator: validators.array({
      componentName: 'LewMenu',
      propName: 'options',
    }),
  },
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
