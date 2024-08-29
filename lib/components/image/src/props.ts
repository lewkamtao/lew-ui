import type { ExtractPropTypes, PropType } from 'vue'

export const imageProps = {
  src: {
    type: String,
    default: '',
    description: '图片链接'
  },
  width: {
    type: [Number, String],
    default: '',
    description: '宽度'
  },
  height: {
    type: [Number, String],
    default: '',
    description: '高度'
  },
  title: {
    type: String,
    default: '',
    description: '图片标题'
  },
  objectFit: {
    type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    default: 'cover',
    description: '图片填充模式'
  },
  objectPosition: {
    type: String,
    default: '',
    description: '图片位置'
  },
  previewKey: {
    type: String,
    default: '',
    description: '预览同组图片内的 key，有值时，自动触发预览'
  },
  alt: {
    type: String,
    default: '',
    description: '图像的备选文本，供图像无法显示时采用'
  },
  lazy: {
    type: Boolean,
    default: false,
    description: '是否懒加载图片'
  },
  loading: {
    type: Boolean,
    default: false,
    description: '图片加载状态'
  }
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
