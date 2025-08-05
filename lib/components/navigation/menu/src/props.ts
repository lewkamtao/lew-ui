import type { LewMenuOption } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const menuModel = {
  modelValue: {
    type: String,
  },
}

export const menuProps = {
  options: {
    type: Array as PropType<LewMenuOption[]>,
    default: [],
    typePopKeys: ['LewMenuOption'],
    validator: validators.array({
      componentName: 'LewMenu',
      propName: 'options',
    }),
  },
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
