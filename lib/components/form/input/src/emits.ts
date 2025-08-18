export const inputEmits = {
  clear: () => true,
  blur: (value: any) => value,
  focus: () => true,
  change: (value: any) => value,
  input: (value: any) => value,
  ok: (value: any) => value,
} as const
