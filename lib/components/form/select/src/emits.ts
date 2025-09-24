export const selectEmits = {
  change: (value?: string | number | (string | number)[]) => value || typeof value === 'undefined',
  blur: () => true,
  clear: () => true,
  focus: () => true,
  delete: (value: (string | number)[], item: string | number) => {
    return { value, item }
  },
} as const
