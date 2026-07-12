import type { LewAvatarShape } from 'lew-ui/types'
import type { ComputedRef, InjectionKey } from 'vue'

export interface LewAvatarGroupContext {
  size?: string | number
  shape?: LewAvatarShape
}

export const AVATAR_GROUP_KEY: InjectionKey<
  ComputedRef<LewAvatarGroupContext>
> = Symbol('lew-avatar-group')
