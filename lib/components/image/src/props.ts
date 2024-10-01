import type { ExtractPropTypes, PropType } from 'vue'

export type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export const imageProps = {
  src: {
    type: String,
    required: true,
    description: '图片源URL',
    validator: (value: string) => {
      if (!value) {
        console.warn('[LewImage] src 不能为空')
        return false
      }
      return true
    }
  },
  alt: {
    type: String,
    default: '',
    description: '图片替代文本',
    validator: (value: string) => {
      if (value.length > 100) {
        console.warn('[LewImage] alt 文本不应超过100个字符')
        return false
      }
      return true
    }
  },
  width: {
    type: [Number, String],
    default: '',
    description: '图片宽度',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewImage] width 必须大于0')
        return false
      }
      return true
    }
  },
  height: {
    type: [Number, String],
    default: '',
    description: '图片高度',
    validator: (value: number | string) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewImage] height 必须大于0')
        return false
      }
      return true
    }
  },
  objectFit: {
    type: String as PropType<ObjectFit>,
    default: 'cover',
    description: '图片适应容器方式',
    validator: (value: ObjectFit) => {
      const validValues: ObjectFit[] = [
        'fill',
        'contain',
        'cover',
        'none',
        'scale-down'
      ]
      if (!validValues.includes(value)) {
        console.warn(
          `[LewImage] objectFit 必须是以下值之一: ${validValues.join(', ')}`
        )
        return false
      }
      return true
    }
  },
  objectPosition: {
    type: String,
    default: 'center',
    description: '图片在容器中的位置',
    validator: (value: string) => {
      const validPositions = [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top left',
        'top right',
        'bottom left',
        'bottom right'
      ]
      if (
        !validPositions.includes(value) &&
        !/^\d+(%|px|em|rem)(\s+\d+(%|px|em|rem))?$/.test(value)
      ) {
        console.warn('[LewImage] objectPosition 格式不正确')
        return false
      }
      return true
    }
  },
  lazy: {
    type: Boolean,
    default: false,
    description: '是否启用懒加载'
  },
  loading: {
    type: Boolean,
    default: false,
    description: '是否处于加载状态'
  },
  title: {
    type: String,
    default: '',
    description: '图片标题',
    validator: (value: string) => {
      if (value.length > 50) {
        console.warn('[LewImage] title 不应超过50个字符')
        return false
      }
      return true
    }
  },
  previewGroupKey: {
    type: String,
    default: '',
    description: '预览组标识，存在此值会自动开启预览功能',
    validator: (value: string) => {
      if (value && !/^[a-zA-Z0-9_-]+$/.test(value)) {
        console.warn(
          '[LewImage] previewGroupKey 只能包含字母、数字、下划线和连字符'
        )
        return false
      }
      return true
    }
  }
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
