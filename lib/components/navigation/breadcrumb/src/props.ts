import type { LewBreadcrumbOption, LewBreadcrumbSeparator } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validBreadcrumbSeparatorList } from 'lew-ui/validators'

export const breadcrumbProps = {
  options: {
    type: Array as PropType<LewBreadcrumbOption[]>,
    typePopKeys: ['LewBreadcrumbOption'],
    required: true,
    validator: validators.array({
      componentName: 'LewBreadcrumb',
      propName: 'options',
    }),
  },
  separator: {
    type: String as PropType<LewBreadcrumbSeparator>,
    default: 'sprit',
    typeValues: validBreadcrumbSeparatorList,
    validator: validators.enum({
      componentName: 'LewBreadcrumb',
      propName: 'separator',
      values: validBreadcrumbSeparatorList,
    }),
  },
}

export type LewBreadcrumbProps = ExtractPublicPropTypes<typeof breadcrumbProps>
