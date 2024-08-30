import type { ExtractPropTypes } from 'vue'

type AvatarPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type AvatarStatus = 'online' | 'processing' | 'away' | 'offline' | 'busy'
type AvatarSize = number | string

export const avatarProps = {
  src: {
    type: String,
    default: '',
    description: '头像图片的 URL 地址'
  },
  alt: {
    type: String,
    default: '',
    description: '头像图片的替代文本，用于无法显示图片时的描述',
    validator(value: string): boolean {
      if (value.length > 100) {
        console.warn('[LewAvatar] alt 文本不应超过100个字符')
        return false
      }
      return true
    }
  },
  size: {
    type: [Number, String],
    default: 40,
    description: '头像的尺寸，可以是数字（单位：像素）或字符串（如 "40px"、"2.5rem"）',
    validator(value: AvatarSize): boolean {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewAvatar] size 必须大于0')
        return false
      }
      return true
    }
  },
  shape: {
    type: String,
    default: 'square',
    description: '头像的形状',
    validator(value: string): boolean {
      const validShapes = ['circle', 'square']
      if (!validShapes.includes(value)) {
        console.warn(`[LewAvatar] 无效的形状: ${value}。请使用 ${validShapes.join(', ')} 中的一个`)
        return false
      }
      return true
    }
  },
  status: {
    type: String,
    default: undefined,
    description: '头像的当前状态',
    validator(value: AvatarStatus): boolean {
      const validStatus = ['online', 'processing', 'away', 'offline', 'busy']
      if (!validStatus.includes(value)) {
        console.warn(`[LewAvatar] 无效的状态值: ${value}。请使用 ${validStatus.join(', ')} 中的一个`)
        return false
      }
      return true
    }
  },
  statusPlacement: {
    type: String,
    default: 'top-right',
    description: '状态标识的显示位置',
    validator(value: AvatarPlacement): boolean {
      const validPlacements = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      if (!validPlacements.includes(value)) {
        console.warn(`[LewAvatar] 无效的状态位置: ${value}。请使用 ${validPlacements.join(', ')} 中的一个`)
        return false
      }
      return true
    }
  }
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
