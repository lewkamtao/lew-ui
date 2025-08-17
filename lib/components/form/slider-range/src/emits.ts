export const sliderRangeEmits = {
  'change': (value: number[]) => value,
} as const

export type LewSliderRangeEmits = typeof sliderRangeEmits
