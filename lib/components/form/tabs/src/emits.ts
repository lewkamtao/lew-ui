export const tabsEmits = {
  'change': (data: { label: string, value: string | number | undefined }) => data,
} as const

export type LewTabsEmits = typeof tabsEmits
