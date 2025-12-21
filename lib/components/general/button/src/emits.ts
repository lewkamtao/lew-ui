/**
 * Button 组件事件定义
 */
export const buttonEmits = {
  /**
   * 点击按钮时触发（disabled 或 loading 时不触发）
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
}

export type LewButtonEmits = typeof buttonEmits
