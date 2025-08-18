export const imageEmits = {
  load: (event: Event) => event,
  error: (event: Event) => event,
  click: (event: MouseEvent) => event,
} as const
