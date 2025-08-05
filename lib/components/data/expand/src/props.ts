import type { ExtractPropTypes } from 'vue'
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

export type LewExpandProps = ExtractPropTypes<typeof expandProps>
