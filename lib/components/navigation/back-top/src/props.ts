import type { ExtractPropTypes } from 'vue'
import validators from 'lew-ui/validators'

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

export type BackTopProps = ExtractPropTypes<typeof backTopProps>
