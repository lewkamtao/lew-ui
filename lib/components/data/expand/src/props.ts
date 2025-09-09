import type { ExtractPublicPropTypes } from 'vue'
import validators from 'lew-ui/validators'

export const expandProps = {
  collapseHeight: {
    type: String,
    validator: validators.widthHeight({
      componentName: 'LewExpand',
      propName: 'collapseHeight',
    }),
  },
}

export type LewExpandProps = ExtractPublicPropTypes<typeof expandProps>
