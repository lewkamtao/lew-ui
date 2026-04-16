import type { ExtractPublicPropTypes } from 'vue'
import validators from 'lew-ui/validators'

/**
 * LewBackTop 已废弃：请使用原生滚动或自定义回到顶部能力，未来主版本可能移除。
 * @deprecated
 */
export const backTopProps = {
  right: {
    type: Number,
    default: 40,
    validator: validators.spacing({
      componentName: 'LewBackTop',
      propName: 'right',
    }),
  },
  bottom: {
    type: Number,
    default: 40,
    validator: validators.spacing({
      componentName: 'LewBackTop',
      propName: 'bottom',
    }),
  },
  valveHeight: {
    type: Number,
    default: 50,
    validator: validators.widthHeight({
      componentName: 'LewBackTop',
      propName: 'valveHeight',
    }),
  },
  target: {
    type: String,
    validator: validators.string({
      componentName: 'LewBackTop',
      propName: 'target',
    }),
  },
}

export type LewBackTopProps = ExtractPublicPropTypes<typeof backTopProps>
