import type { Property } from 'csstype'
import type { LewEmptyType } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validEmptyTypeList } from 'lew-ui/validators'

// Props definitions
export const emptyProps = {
  type: {
    type: String as PropType<LewEmptyType>,
    default: 'search',
    typeValues: validEmptyTypeList,
    validator: validators.enum({
      componentName: 'LewEmpty',
      propName: 'type',
      values: validEmptyTypeList,
    }),
  },
  title: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewEmpty',
      propName: 'title',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '200px',
    validator: validators.widthHeight({
      componentName: 'LewEmpty',
      propName: 'width',
    }),
  },
  height: {
    type: [String, Number] as PropType<Property.Height | number>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewEmpty',
      propName: 'height',
    }),
  },
  fontSize: {
    type: [String, Number] as PropType<Property.FontSize | number>,
    default: '14px',
    validator: validators.fontSize({
      componentName: 'LewEmpty',
      propName: 'fontSize',
    }),
  },
  padding: {
    type: [String, Number] as PropType<Property.Padding | number>,
    default: '20px',
    validator: validators.spacing({
      componentName: 'LewEmpty',
      propName: 'padding',
    }),
  },
}

// Extract prop types
export type LewEmptyProps = ExtractPublicPropTypes<typeof emptyProps>
