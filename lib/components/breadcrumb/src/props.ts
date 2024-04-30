import { PropType, ExtractPropTypes } from 'vue'

export type BreadcrumbOptions = {
  label: string
  to: string
  active: boolean
}

export type BreadcrumbIconType = 'shoulder' | 'sprit'

export const breadcrumbProps = {
  options: {
    type: Array as PropType<BreadcrumbOptions[]>,
    default: [],
    description: '配置项'
  },
  iconType: {
    type: String as PropType<BreadcrumbIconType>,
    default: 'sprit',
    description: '图标类型'
  }
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
