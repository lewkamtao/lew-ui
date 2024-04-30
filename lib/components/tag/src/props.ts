import { ExtractPropTypes, PropType } from 'vue'

type TagSize = 'small' | 'medium' | 'large'
type TagType = 'fill' | 'light' | 'ghost'
type TagColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'mint'
  | 'teal'
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'gray'
  | 'brown'

export const tagProps = {
  type: {
    type: String as PropType<TagType>,
    default: 'fill',
    description: '类型'
  },
  color: {
    type: String as PropType<TagColor>,
    default: '',
    description: '颜色'
  },
  size: {
    type: String as PropType<TagSize>,
    default: 'medium',
    description: '大小'
  },
  round: {
    type: Boolean,
    default: false,
    description: '是否圆角'
  },
  closable: {
    type: Boolean,
    default: false,
    description: '是否可关闭'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  }
}

export type TagProps = ExtractPropTypes<typeof tagProps>
