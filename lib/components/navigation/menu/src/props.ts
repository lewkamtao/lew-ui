import type { LewMenuOption } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const menuModel = {
  modelValue: {
    type: String,
  },
}

export const menuProps = {
  options: {
    type: Array as PropType<LewMenuOption[]>,
    required: true,
    typePopKeys: ['LewMenuOption'],
    validator: validators.array({
      componentName: 'LewMenu',
      propName: 'options',
    }),
  },
}

export type LewMenuProps = ExtractPublicPropTypes<typeof menuProps>
