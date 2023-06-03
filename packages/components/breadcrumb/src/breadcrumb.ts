import type { ExtractPropTypes, PropType } from 'vue'

export interface BreadcrumbOptions {
  label: string
  to: string
  active: boolean
}

export type BreadcrumbIconType = 'shoulder' | 'sprit'

export const breadcrumbProps = {
  options: {
    type: Array as PropType<BreadcrumbOptions[]>,
    default() {
      return []
    },
  },
  iconType: {
    type: String as PropType<BreadcrumbIconType>,
    default() {
      return 'sprit' // shoulder ｜ sprit
    },
  },
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
