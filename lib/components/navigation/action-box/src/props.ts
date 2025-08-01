import type { LewXAlignment } from 'lew-ui'
import type { LewComponentSource } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export interface ActionBoxOption {
  label: LewComponentSource
  icon?: LewComponentSource
  customRender?: LewComponentSource
  onClick?: (event?: MouseEvent) => void
}

export const actionBoxProps = {
  options: {
    type: Array as unknown as PropType<ActionBoxOption[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewActionBox',
      propName: 'options',
    }),
  },
  x: {
    type: String as PropType<LewXAlignment>,
    default: 'start',
    validator: validators.xAlignment({
      componentName: 'LewActionBox',
      propName: 'x',
    }),
  },
  divider: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewActionBox',
      propName: 'divider',
    }),
  },
  dropdownThreshold: {
    type: [Number, String] as PropType<number | string>,
    validator: validators.nonNegativeInteger({
      componentName: 'LewActionBox',
      propName: 'dropdownThreshold',
    }),
  },
  dropdownLabel: {
    type: null,
    default: 'More',
  },
  dropdownIcon: {
    type: null,
  },
  iconOnly: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewActionBox',
      propName: 'iconOnly',
    }),
  },
}

export type ActionBoxProps = ExtractPropTypes<typeof actionBoxProps>
