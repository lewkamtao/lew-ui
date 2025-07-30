import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'

// Type definitions
export type AvatarPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type AvatarStatus = 'online' | 'processing' | 'away' | 'offline' | 'busy'
export type AvatarShape = 'circle' | 'square' | 'sharp'
export type AvatarSize = number | string

export const avatarProps = {
  size: {
    type: [Number, String] as PropType<AvatarSize>,
    default: 40,
    validator(value: AvatarSize): boolean {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewAvatar] size must be greater than 0')
        return false
      }
      return true
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'square',
    validator(value: AvatarShape): boolean {
      if (!['circle', 'square', 'sharp'].includes(value)) {
        console.warn('[LewAvatar] shape must be one of: circle, square, sharp')
        return false
      }
      return true
    },
  },
  src: {
    type: String,
  },
  alt: {
    type: String,
    validator(value: string): boolean {
      if (value && value.length > 100) {
        console.warn('[LewAvatar] alt text should not exceed 100 characters')
        return false
      }
      return true
    },
  },
  status: {
    type: String as PropType<AvatarStatus>,
    validator(value: AvatarStatus): boolean {
      const validStatus: AvatarStatus[] = ['online', 'processing', 'away', 'offline', 'busy']
      if (!validStatus.includes(value)) {
        console.warn(`[LewAvatar] status must be one of: ${validStatus.join(', ')}`)
        return false
      }
      return true
    },
  },
  objectFit: {
    type: String as PropType<Property.ObjectFit>,
    default: 'cover',
    validator(value: Property.ObjectFit): boolean {
      const validValues: Property.ObjectFit[] = ['fill', 'contain', 'cover', 'none', 'scale-down']
      if (!validValues.includes(value)) {
        console.warn(`[LewAvatar] objectFit must be one of: ${validValues.join(', ')}`)
        return false
      }
      return true
    },
  },
  objectPosition: {
    type: String as PropType<Property.ObjectPosition>,
    default: 'center',
    validator(value: Property.ObjectPosition): boolean {
      const validPositions = [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top left',
        'top right',
        'bottom left',
        'bottom right',
      ]
      if (
        typeof value === 'string'
        && !validPositions.includes(value)
        && !/^\d+(%|px|em|rem)(\s+\d+(%|px|em|rem))?$/.test(value)
      ) {
        console.warn('[LewAvatar] objectPosition format is invalid')
        return false
      }
      return true
    },
  },
  statusPlacement: {
    type: String as PropType<AvatarPlacement>,
    default: 'top-right',
    validator(value: AvatarPlacement): boolean {
      const validPlacements: AvatarPlacement[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      if (!validPlacements.includes(value)) {
        console.warn(`[LewAvatar] statusPlacement must be one of: ${validPlacements.join(', ')}`)
        return false
      }
      return true
    },
  },
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
