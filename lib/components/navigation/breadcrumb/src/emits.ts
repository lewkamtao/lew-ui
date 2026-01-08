import type { LewBreadcrumbOption } from 'lew-ui/types'

export const breadcrumbEmits = {
  change: (item: LewBreadcrumbOption, index: number) => [item, index],
} as const

export type LewBreadcrumbEmits = typeof breadcrumbEmits
