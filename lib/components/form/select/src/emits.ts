export const selectEmits = {
  change: (value?: string) => value || typeof value === 'undefined',
  blur: () => true,
  clear: () => true,
  focus: () => true,
} as const
