export const selectEmits = {
  change: (value?: string) => value,
  blur: () => true,
  clear: () => true,
  focus: () => true,
} as const
