export const inputTableEmits = {
  'addSuccess': (data: { row: any }) => data,
  'editSuccess': (data: { row: any }) => data,
} as const

export type LewInputTableEmits = typeof inputTableEmits
