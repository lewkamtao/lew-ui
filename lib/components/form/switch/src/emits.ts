export const switchEmits = {
  change: (value?: boolean) => typeof value === 'boolean' || value === undefined,
} as const
