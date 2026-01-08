export const stepsEmits = {
  change: (value: number) => value,
} as const

export type LewStepsEmits = typeof stepsEmits
