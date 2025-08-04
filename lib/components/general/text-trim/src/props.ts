import type { Property } from 'csstype'
import type { LewPlacement } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const textTrimProps = {
  // Content props
  text: {
    type: [String, Number],
    validator: validators.string({
      componentName: 'LewTextTrim',
      propName: 'text',
    }),
  },
  allowHTML: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewTextTrim',
      propName: 'allowHTML',
    }),
  },

  lineClamp: {
    type: Number,
    validator: validators.number({
      componentName: 'LewTextTrim',
      propName: 'lineClamp',
    }),
  },
  textAlign: {
    type: String as PropType<Property.TextAlign>,
    default: 'left',
    validator: validators.xAlignment({
      componentName: 'LewTextTrim',
      propName: 'textAlign',
    }),
  },

  placement: {
    type: String as PropType<LewPlacement>,
    default: 'top',
    validator: validators.popoverPlacement({
      componentName: 'LewTextTrim',
      propName: 'placement',
    }),
  },
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 15],
    validator: validators.offset({
      componentName: 'LewTextTrim',
      propName: 'offset',
    }),
  },
  delay: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [120, 120],
    validator: validators.offset({
      componentName: 'LewTextTrim',
      propName: 'delay',
    }),
  },
  reserveEnd: {
    type: Number,
    validator: validators.number({
      componentName: 'LewTextTrim',
      propName: 'reserveEnd',
    }),
  },
}

export type TextTrimProps = ExtractPropTypes<typeof textTrimProps>
