export const inputEmits = {
  change: (value?: string) => value,
  input: (value?: string) => value,
  ok: (value?: string) => value,
  focus: (e: FocusEvent) => e,
  blur: (e: FocusEvent) => e,
  clear: () => { },
} as const
