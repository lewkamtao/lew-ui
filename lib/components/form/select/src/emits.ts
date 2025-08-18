export const selectEmits = {
  change: (value?: string | number | undefined) => value,
  blur: () => true,
  clear: () => true,
  focus: () => true,
} as const
