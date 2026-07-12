import type { LewAvatarShape } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

const shapeValues = ['circle', 'square', 'sharp']

export const avatarGroupProps = {
  /**
   * 最多显示的头像数量（含剩余计数头像）；超出时显示 +N
   */
  max: {
    type: Number,
    validator: validators.positiveInteger({
      componentName: 'LewAvatarGroup',
      propName: 'max',
    }),
  },
  size: {
    type: [String, Number] as PropType<string | number>,
    validator: validators.widthHeight({
      componentName: 'LewAvatarGroup',
      propName: 'size',
    }),
  },
  shape: {
    type: String as PropType<LewAvatarShape>,
    typeValues: shapeValues,
    validator: validators.enum({
      componentName: 'LewAvatarGroup',
      propName: 'shape',
      values: shapeValues,
    }),
  },
  /**
   * 头像重叠间距（负边距绝对值）
   */
  overlap: {
    type: [String, Number] as PropType<string | number>,
    default: '10px',
    validator: validators.widthHeight({
      componentName: 'LewAvatarGroup',
      propName: 'overlap',
    }),
  },
}

export type LewAvatarGroupProps = ExtractPublicPropTypes<typeof avatarGroupProps>
