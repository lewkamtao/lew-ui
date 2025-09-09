import type { LewStatusColor } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validStatusColorList } from 'lew-ui/validators'

export const alertProps = {
  type: {
    type: String as PropType<LewStatusColor>,
    default: 'normal',
    typeValues: validStatusColorList,
    validator: validators.enum({
      componentName: 'LewAlert',
      propName: 'type',
      values: validStatusColorList,
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

export type LewAlertProps = ExtractPublicPropTypes<typeof alertProps>
