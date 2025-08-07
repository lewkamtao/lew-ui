import type { LewDirection, LewXAlignment, LewYAlignment } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validDirectionList, validXAlignmentList, validYAlignmentList } from 'lew-ui/validators'

export type FlexMode = 'around' | 'between'

export const flexProps = {
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    typeValues: validDirectionList,
    validator: validators.enum({ componentName: 'LewFlex', propName: 'direction', values: validDirectionList }),
  },
  x: {
    type: String as PropType<LewXAlignment>,
    default: 'start',
    typeValues: validXAlignmentList,
    validator: validators.enum({ componentName: 'LewFlex', propName: 'x', values: validXAlignmentList }),
  },
  y: {
    type: String as PropType<LewYAlignment>,
    default: 'center',
    typeValues: validYAlignmentList,
    validator: validators.enum({ componentName: 'LewFlex', propName: 'y', values: validYAlignmentList }),
  },
  mode: {
    type: String as PropType<FlexMode>,
    validator: validators.enum({ componentName: 'LewFlex', propName: 'mode', values: ['around', 'between'] }),
  },
  wrap: {
    type: Boolean,
    validator: validators.boolean({ componentName: 'LewFlex', propName: 'wrap' }),
  },
  gap: {
    type: String,
    default: '10px',
    validator: validators.gap({ componentName: 'LewFlex', propName: 'gap' }),
  },
  width: {
    type: String,
    default: '',
    validator: validators.widthHeight({ componentName: 'LewFlex', propName: 'width' }),
  },
}

export type LewFlexProps = ExtractPropTypes<typeof flexProps>
