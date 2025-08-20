export const inputTagEmits = {
  remove: (tag: string, index: number) => ({ tag, index }),
  change: (value?: string[]) => value,
  add: (tag: string) => tag,
  clear: () => true,
} as const
