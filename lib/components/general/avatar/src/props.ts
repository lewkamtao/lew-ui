import type { Property } from 'csstype'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

// Type definitions
export type AvatarPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type AvatarStatus = 'online' | 'processing' | 'away' | 'offline' | 'busy'
export type AvatarShape = 'circle' | 'square' | 'sharp'
export type AvatarSize = number | string

export const avatarProps = {
  size: {
    type: [Number, String] as PropType<AvatarSize>,
    default: 40,
    validator: validators.widthHeight({
      componentName: 'LewAvatar',
      propName: 'size',
    }),
  },
  loading: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewAvatar',
      propName: 'loading',
    }),
  },
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'square',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'shape',
      values: ['circle', 'square', 'sharp'],
    }),
  },
  src: {
    type: String,
    validator: validators.string({
      componentName: 'LewAvatar',
      propName: 'src',
    }),
  },
  alt: {
    type: String,
    validator: validators.string({
      componentName: 'LewAvatar',
      propName: 'alt',
    }),
  },
  status: {
    type: String as PropType<AvatarStatus>,
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'status',
      values: ['online', 'processing', 'away', 'offline', 'busy'],
    }),
  },
  objectFit: {
    type: String as PropType<Property.ObjectFit>,
    default: 'cover',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'objectFit',
      values: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    }),
  },
  objectPosition: {
    type: String as PropType<Property.ObjectPosition>,
    default: 'center',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'objectPosition',
      values: ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'],
    }),
  },
  statusPlacement: {
    type: String as PropType<AvatarPlacement>,
    default: 'top-right',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'statusPlacement',
      values: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    }),
  },
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
