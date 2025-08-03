import type { Property } from 'csstype'
import type { LewColor } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const markProps = {
  color: {
    type: String as PropType<LewColor>,
    default: 'blue',
    validator: validators.string({
      componentName: 'LewMark',
      propName: 'color',
    }),
  },
  bold: {
    type: Number as PropType<Property.FontWeight>,
    default: 400,
    validator: validators.number({
      componentName: 'LewMark',
      propName: 'bold',
    }),
  },
  cursor: {
    type: String as PropType<Property.Cursor>,
    validator: validators.string({
      componentName: 'LewMark',
      propName: 'cursor',
    }),
  },
  round: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewMark',
      propName: 'round',
    }),
  },
}

export type MarkProps = ExtractPropTypes<typeof markProps>
