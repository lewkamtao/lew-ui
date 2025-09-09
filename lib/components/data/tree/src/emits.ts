export const treeEmits = {
  change: (data: any) => data,
  expand: (data: any) => data,
  loadStart: () => true,
  loadEnd: (text: string) => text,
} as const
