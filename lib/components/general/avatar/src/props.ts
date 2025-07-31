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
        console.warn(`[LewAvatar] Invalid size: "${value}". Expected: a number greater than 0.`)
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
      const validShapes = ['circle', 'square', 'sharp']
      if (!validShapes.includes(value)) {
        console.warn(`[LewAvatar] Invalid shape: "${value}". Expected: one of ${validShapes.join(', ')}.`)
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
        console.warn(`[LewAvatar] Invalid alt: "${value}". Expected: alt text length ≤ 100.`)
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
        console.warn(`[LewAvatar] Invalid status: "${value}". Expected: one of ${validStatus.join(', ')}.`)
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
        console.warn(`[LewAvatar] Invalid objectFit: "${value}". Expected: one of ${validValues.join(', ')}.`)
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
        console.warn(`[LewAvatar] Invalid objectPosition: "${value}". Expected: one of ${validPositions.join(', ')} or a valid CSS position value (e.g. "50% 50%").`)
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
        console.warn(`[LewAvatar] Invalid statusPlacement: "${value}". Expected: one of ${validPlacements.join(', ')}.`)
        return false
      }
      return true
    },
  },
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
