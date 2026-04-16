import type { Property } from 'csstype'
import type { LewEmptyType } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validEmptyTypeList } from 'lew-ui/validators'

/**
 * LewEmpty 已废弃：请在业务中自行实现空状态展示，未来主版本可能移除。
 * @deprecated
 */
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
    type: String as PropType<Property.Height>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewEmpty',
      propName: 'height',
    }),
  },
  fontSize: {
    type: String as PropType<Property.FontSize>,
    default: '14px',
    validator: validators.fontSize({
      componentName: 'LewEmpty',
      propName: 'fontSize',
    }),
  },
  padding: {
    type: String as PropType<Property.Padding>,
    default: '20px',
    validator: validators.spacing({
      componentName: 'LewEmpty',
      propName: 'padding',
    }),
  },
}

// Extract prop types
export type LewEmptyProps = ExtractPublicPropTypes<typeof emptyProps>
