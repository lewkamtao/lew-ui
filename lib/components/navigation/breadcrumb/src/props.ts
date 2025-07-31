import type { ExtractPropTypes, PropType } from 'vue'

// Types
export interface BreadcrumbOption {
  label: string
  value?: string | number
  active?: boolean
}

export type BreadcrumbSeparator = 'shoulder' | 'sprit'

// Constants
const SEPARATORS: BreadcrumbSeparator[] = ['shoulder', 'sprit']

export const breadcrumbProps = {
  // Content props
  options: {
    type: Array as PropType<BreadcrumbOption[]>,
    default: () => [],
    validator(value: BreadcrumbOption[]): boolean {
      if (!Array.isArray(value)) {
        console.warn(`[LewBreadcrumb] Invalid options: "${value}". Expected: array.`)
        return false
      }

      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        if (typeof item !== 'object' || item === null) {
          console.warn(`[LewBreadcrumb] Invalid options[${i}]: "${item}". Expected: object.`)
          return false
        }

        if (typeof item.label !== 'string') {
          console.warn(`[LewBreadcrumb] Invalid options[${i}].label: "${item.label}". Expected: string.`)
          return false
        }

        if (
          item.value !== undefined
          && typeof item.value !== 'string'
          && typeof item.value !== 'number'
        ) {
          console.warn(`[LewBreadcrumb] Invalid options[${i}].value: "${item.value}". Expected: string or number.`)
          return false
        }

        if (item.active !== undefined && typeof item.active !== 'boolean') {
          console.warn(`[LewBreadcrumb] Invalid options[${i}].active: "${item.active}". Expected: boolean.`)
          return false
        }
      }

      return true
    },
  },

  // Style props
  separator: {
    type: String as PropType<BreadcrumbSeparator>,
    default: 'sprit',
    validator(value: BreadcrumbSeparator): boolean {
      if (!SEPARATORS.includes(value)) {
        console.warn(
          `[LewBreadcrumb] Invalid separator: "${value}". Expected one of: ${SEPARATORS.join(', ')}.`,
        )
        return false
      }
      return true
    },
  },
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
