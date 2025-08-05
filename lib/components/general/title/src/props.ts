import type { Property } from 'csstype'
import type { LewColor } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validColorList } from 'lew-ui/validators'

export const titleProps = {
  text: {
    type: String,
    validator: validators.string({
      componentName: 'LewTitle',
      propName: 'text',
    }),
  },
  size: {
    type: String,
    default: '24px',
    validator: validators.fontSize({
      componentName: 'LewTitle',
      propName: 'size',
    }),
  },
  color: {
    type: String as PropType<LewColor>,
    typeValues: validColorList,
    validator: validators.enum({
      componentName: 'LewTitle',
      propName: 'color',
      values: validColorList,
    }),
  },
  bold: {
    type: Number as PropType<Property.FontWeight>,
    default: 500,
    validator: validators.fontWeight({
      componentName: 'LewTitle',
      propName: 'bold',
    }),
  },
}

export type TitleProps = ExtractPropTypes<typeof titleProps>
