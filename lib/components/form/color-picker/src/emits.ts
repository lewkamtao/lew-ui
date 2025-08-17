export const colorPickerEmits = {
  change: (value?: string | undefined) => value,
} as const

export type LewColorPickerEmits = typeof colorPickerEmits
