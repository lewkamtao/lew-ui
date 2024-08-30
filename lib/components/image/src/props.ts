import type { ExtractPropTypes, PropType } from 'vue'

export type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export const imageProps = {
  src: {
    type: String,
    required: true,
    description: '图片的源URL地址',
    validator: (value: string) => {
      if (!value) {
        console.warn('[LewImage] src 属性不能为空')
        return false
      }
      return true
    }
  },
  alt: {
    type: String,
    default: '',
    description: '图片的替代文本，用于无法加载图片时显示，同时提高可访问性'
  },
  width: {
    type: [Number, String],
    default: '',
    description: '图片宽度，支持数字（单位：像素）或百分比字符串',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewImage] width 必须大于 0')
        return false
      }
      return true
    }
  },
  height: {
    type: [Number, String],
    default: '',
    description: '图片高度，支持数字（单位：像素）或百分比字符串',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewImage] height 必须大于 0')
        return false
      }
      return true
    }
  },
  objectFit: {
    type: String as PropType<ObjectFit>,
    default: 'cover',
    description: '指定图片如何适应容器，影响图片的缩放和裁剪方式',
    validator: (value: ObjectFit) => {
      const validValues: ObjectFit[] = ['fill', 'contain', 'cover', 'none', 'scale-down']
      if (!validValues.includes(value)) {
        console.warn(`[LewImage] objectFit 必须是以下值之一: ${validValues.join(', ')}`)
        return false
      }
      return true
    }
  },
  objectPosition: {
    type: String,
    default: 'center',
    description: '指定图片在容器中的位置，支持 CSS 位置值（如："center"、"top left"）'
  },
  title: {
    type: String,
    default: '',
    description: '图片的标题，鼠标悬停时显示的提示文本'
  },
  lazy: {
    type: Boolean,
    default: false,
    description: '是否启用图片懒加载，可提高页面加载性能'
  },
  loading: {
    type: Boolean,
    default: false,
    description: '指示图片是否处于加载状态'
  },
  previewKey: {
    type: String,
    default: '',
    description: '用于预览同组图片的唯一标识，设置后自动启用预览功能'
  }
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
