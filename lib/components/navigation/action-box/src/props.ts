import type { LewXAlignment } from 'lew-ui'
import type { LewActionBoxOption } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validXAlignmentList } from 'lew-ui/validators'

export const actionBoxProps = {
  options: {
    type: Array as PropType<LewActionBoxOption[]>,
    typePopKeys: ['LewActionBoxOption'],
    required: true,
    validator: validators.array({
      componentName: 'LewActionBox',
      propName: 'options',
    }),
  },
  x: {
    type: String as PropType<LewXAlignment>,
    default: 'start',
    typeValues: validXAlignmentList,
    validator: validators.enum({
      componentName: 'LewActionBox',
      propName: 'x',
      values: validXAlignmentList,
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
    typePopKeys: ['LewComponentSource'],
    default: 'More',
  },
  dropdownIcon: {
    type: null,
    typePopKeys: ['LewComponentSource'],
  },
  iconOnly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewActionBox',
      propName: 'iconOnly',
    }),
  },
}

export type LewActionBoxProps = ExtractPublicPropTypes<typeof actionBoxProps>
