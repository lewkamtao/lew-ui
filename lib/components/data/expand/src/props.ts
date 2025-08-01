import type { ExtractPropTypes } from 'vue'
import validators from 'lew-ui/validators'

export const expandProps = {
  collapseHeight: {
    type: [Number, String],
    validator: validators.widthHeight({
      componentName: 'LewExpand',
      propName: 'collapseHeight',
    }),
  },
}

export type ExpandProps = ExtractPropTypes<typeof expandProps>
