import type { LewAvatarObjectFit, LewAvatarObjectPosition, LewAvatarPlacement, LewAvatarShape, LewAvatarStatus } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

const statusValues = ['online', 'processing', 'away', 'offline', 'busy']
const objectFitValues = ['fill', 'contain', 'cover', 'none', 'scale-down']
const objectPositionValues = ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right']
const placementValues = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
const shapeValues = ['circle', 'square', 'sharp']

export const avatarProps = {
  size: {
    type: String,
    default: '40px',
    validator: validators.widthHeight({
      componentName: 'LewAvatar',
      propName: 'size',
    }),
  },
  loading: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewAvatar',
      propName: 'loading',
    }),
  },
  shape: {
    type: String as PropType<LewAvatarShape>,
    typeValues: shapeValues,
    default: 'square',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'shape',
      values: shapeValues,
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
    type: String as PropType<LewAvatarStatus>,
    typeValues: statusValues,
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'status',
      values: statusValues,
    }),
  },
  objectFit: {
    type: String as PropType<LewAvatarObjectFit>,
    typeValues: objectFitValues,
    default: 'cover',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'objectFit',
      values: objectFitValues,
    }),
  },
  objectPosition: {
    type: String as PropType<LewAvatarObjectPosition>,
    typeValues: objectPositionValues,
    default: 'center',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'objectPosition',
      values: objectPositionValues,
    }),
  },
  statusPlacement: {
    type: String as PropType<LewAvatarPlacement>,
    typeValues: placementValues,
    default: 'top-right',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'statusPlacement',
      values: placementValues,
    }),
  },
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
