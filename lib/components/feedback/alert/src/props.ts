import type { LewStatusColor } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

// Props definitions
export const alertProps = {
  type: {
    type: String as PropType<LewStatusColor>,
    default: 'normal',
    validator: validators.color({
      componentName: 'LewAlert',
      propName: 'type',
    }),
  },
  title: {
    type: String,
    validator: validators.string({
      componentName: 'LewAlert',
      propName: 'title',
    }),
  },
  content: {
    type: String,
    validator: validators.string({
      componentName: 'LewAlert',
      propName: 'content',
    }),
  },
  closeable: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewAlert',
      propName: 'closeable',
    }),
  },
}

// Extract prop types
export type AlertProps = ExtractPropTypes<typeof alertProps>
