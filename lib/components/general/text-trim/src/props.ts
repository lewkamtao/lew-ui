import type { Property } from 'csstype'
import type { LewPlacement } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validPlacementList, validXAlignmentList } from 'lew-ui/validators'

export const textTrimProps = {
  text: {
    type: String,
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
    typeValues: validXAlignmentList,
    validator: validators.enum({
      componentName: 'LewTextTrim',
      propName: 'textAlign',
      values: validXAlignmentList,
    }),
  },
  placement: {
    type: String as PropType<LewPlacement>,
    default: 'top',
    typeValues: validPlacementList,
    validator: validators.enum({
      componentName: 'LewTextTrim',
      propName: 'placement',
      values: validPlacementList,
    }),
  },
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: [0, 15],
    validator: validators.offset({
      componentName: 'LewTextTrim',
      propName: 'offset',
    }),
  },
  delay: {
    type: Array as unknown as PropType<[number, number]>,
    default: [120, 120],
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

export type LewTextTrimProps = ExtractPublicPropTypes<typeof textTrimProps>
