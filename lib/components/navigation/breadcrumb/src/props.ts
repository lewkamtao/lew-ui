import type { LewBreadcrumbOptions, LewBreadcrumbSeparator } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export const breadcrumbProps = {
  options: {
    type: Array as PropType<LewBreadcrumbOptions>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewBreadcrumb',
      propName: 'options',
    }),
  },
  separator: {
    type: String as PropType<LewBreadcrumbSeparator>,
    default: 'sprit',
    validator: validators.enum ({
      componentName: 'LewBreadcrumb',
      propName: 'separator',
      values: ['shoulder', 'sprit'],
    }),
  },
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
