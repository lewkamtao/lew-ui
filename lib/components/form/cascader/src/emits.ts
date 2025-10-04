// 单选/多选统一：
// - 当 props.multiple=false 时，change(value: string | undefined)
// - 当 props.multiple=true  时，change(value: string[] | undefined)
export const cascaderEmits = {
  change: (value: any, items: any) => ({ value, items }),
  clear: () => true,
  delete: (value: string[], deletedItem: string) => ({ value, deletedItem }),
} as const
