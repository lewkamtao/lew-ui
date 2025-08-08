import type { LewAvatarPlacement, LewAvatarShape, LewAvatarStatus, LewImageObjectFit, LewImageObjectPosition } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validObjectFitList, validObjectPositionList } from 'lew-ui/validators'

const statusValues = ['online', 'processing', 'away', 'offline', 'busy']
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
    type: String as PropType<LewImageObjectFit>,
    typeValues: validObjectFitList,
    default: 'cover',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'objectFit',
      values: validObjectFitList,
    }),
  },
  objectPosition: {
    type: String as PropType<LewImageObjectPosition>,
    typeValues: validObjectPositionList,
    default: 'center',
    validator: validators.enum({
      componentName: 'LewAvatar',
      propName: 'objectPosition',
      values: validObjectPositionList,
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

export type LewAvatarProps = ExtractPublicPropTypes<typeof avatarProps>
