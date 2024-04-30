import { ExtractPropTypes, PropType } from 'vue'

type markColor =
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

export const markProps = {
  color: {
    type: String as PropType<markColor>,
    default: 'blue',
    typeDesc: `red
        | orange
        | yellow 
        | green
        | mint  
        | teal
        | cyan
        | blue
        | indigo
        | purple
        | pink
        | gray
        | brown`,
    description: '颜色'
  },
  round: {
    type: Boolean,
    default: false,
    description: '是否圆角'
  },
  to: {
    type: String,
    default: '',
    description: '跳转链接'
  },
  bold: {
    type: Number,
    default: 400,
    description: '加粗'
  }
}
export type MarkProps = ExtractPropTypes<typeof markProps>
