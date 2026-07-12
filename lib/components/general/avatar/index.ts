import { avatarEmits } from './src/emits'
import { avatarGroupProps } from './src/groupProps'
import LewAvatar from './src/LewAvatar.vue'
import LewAvatarGroup from './src/LewAvatarGroup.vue'
import { avatarProps } from './src/props'

// ✅ 具名导出组件
export { LewAvatar, LewAvatarGroup }

// ✅ 具名导出类型
export type { LewAvatarGroupContext } from './src/context'
export type { LewAvatarEmits } from './src/emits'
export type { LewAvatarGroupProps } from './src/groupProps'
export type { LewAvatarProps } from './src/props'

// ✅ 导出 props 和 emits 对象（用于文档生成）
export { avatarEmits, avatarGroupProps, avatarProps }

// ✅ 默认导出主组件
export default LewAvatar
