import type { Property } from 'csstype'
import type { LewDirection, LewXAlignment, LewYAlignment } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export type FlexMode = 'around' | 'between'
export type FlexGap = Property.Gap | number
export type FlexWidth = Property.Width | number

export const flexProps = {
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    validator: validators.direction({ componentName: 'LewFlex', propName: 'direction' }),
  },
  x: {
    type: String as PropType<LewXAlignment>,
    default: 'start',
    validator: validators.xAlignment({ componentName: 'LewFlex', propName: 'x' }),
  },
  y: {
    type: String as PropType<LewYAlignment>,
    default: 'center',
    validator: validators.yAlignment({ componentName: 'LewFlex', propName: 'y' }),
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
    type: [String, Number] as PropType<FlexGap>,
    default: 10,
    validator: validators.gap({ componentName: 'LewFlex', propName: 'gap' }),
  },
  width: {
    type: [String, Number] as PropType<FlexWidth>,
    validator: validators.widthHeight({ componentName: 'LewFlex', propName: 'width' }),
  },
}

export type FlexProps = ExtractPropTypes<typeof flexProps>
