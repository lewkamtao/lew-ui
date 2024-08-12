import type { ExtractPropTypes, PropType } from 'vue'

type AvatarPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

type AvatarStatus = 'online' | 'processing' | 'away' | 'offline' | 'busy'

export const avatarProps = {
  round: {
    type: Boolean,
    default: false,
    description: '是否为圆形'
  },
  status: {
    type: String as PropType<AvatarStatus>,
    default: '',
    description: '状态'
  },
  statusPlacement: {
    type: String as PropType<AvatarPlacement>,
    default: 'top-right',
    description: '状态位置'
  },
  width: {
    type: [Number, String],
    default: 40,
    description: '宽度'
  },
  height: {
    type: [Number, String],
    default: 40,
    description: '高度'
  },
  src: {
    type: String,
    default: '',
    description: '图片链接'
  },
  alt: {
    type: String,
    default: '',
    description: '图像的备选文本,供图像无法显示时采用'
  }
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
