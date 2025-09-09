export const textareaEmits = {
  change: (value?: string) => value,
  input: (value?: string) => value,
  ok: (value?: string) => value,
  clear: () => { },
} as const
