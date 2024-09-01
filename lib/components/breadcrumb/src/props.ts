import type { ExtractPropTypes, PropType } from 'vue'

export interface BreadcrumbOption {
  label: string
  value?: string | number
  active?: boolean
}

export type BreadcrumbIconType = 'shoulder' | 'sprit'

export const breadcrumbProps = {
  options: {
    type: Array as PropType<BreadcrumbOption[]>,
    default: () => [],
    description: '面包屑导航项列表',
    validator(value: unknown): boolean {
      if (!Array.isArray(value)) {
        console.warn('[LewBreadcrumb] options 必须是数组类型')
        return false
      }
      return value.every((item) => {
        if (typeof item !== 'object' || item === null) {
          console.warn('[LewBreadcrumb] options 中的每一项必须是对象类型')
          return false
        }
        if (typeof item.label !== 'string') {
          console.warn('[LewBreadcrumb] options 中的 label 必须是字符串类型')
          return false
        }
        if (
          item.value !== undefined &&
          typeof item.value !== 'string' &&
          typeof item.value !== 'number'
        ) {
          console.warn('[LewBreadcrumb] options 中的 value 必须是字符串或数字类型')
          return false
        }
        if (item.active !== undefined && typeof item.active !== 'boolean') {
          console.warn('[LewBreadcrumb] options 中的 active 必须是布尔类型')
          return false
        }
        return true
      })
    }
  },
  iconType: {
    type: String,
    default: 'sprit',
    description: '分隔图标类型',
    validator(value: string): boolean {
      const validTypes: BreadcrumbIconType[] = ['shoulder', 'sprit']
      if (!validTypes.includes(value as BreadcrumbIconType)) {
        console.warn(`[LewBreadcrumb] iconType 必须是 ${validTypes.join(' 或 ')}`)
        return false
      }
      return true
    }
  }
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
