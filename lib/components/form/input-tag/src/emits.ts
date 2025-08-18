export const inputTagEmits = {
  remove: (tag: string, index: number) => ({ tag, index }),
  change: (value: string[] | undefined) => value,
  clear: () => true,
  add: (tag: string) => tag,
} as const
