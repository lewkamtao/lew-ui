import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export interface BreadcrumbOption {
  label: string
  value?: string | number
  active?: boolean
}

export type BreadcrumbSeparator = 'shoulder' | 'sprit'

export const breadcrumbProps = {
  options: {
    type: Array as PropType<BreadcrumbOption[]>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewBreadcrumb',
      propName: 'options',
    }),
  },
  separator: {
    type: String as PropType<BreadcrumbSeparator>,
    default: 'sprit',
    validator: validators.enum ({
      componentName: 'LewBreadcrumb',
      propName: 'separator',
      values: ['shoulder', 'sprit'],
    }),
  },
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
