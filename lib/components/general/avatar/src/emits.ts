/**
 * Avatar 组件事件定义
 */
export const avatarEmits = {
  /**
   * 图片加载成功时触发
   */
  load: (e?: Event) => e === undefined || e instanceof Event,
  /**
   * 图片加载失败时触发
   */
  error: (e?: Event | string | unknown) => true,
}

export type LewAvatarEmits = typeof avatarEmits
