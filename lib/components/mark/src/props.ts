import type { ExtractPropTypes, PropType } from 'vue'

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
  cursor: {
    type: String,
    default: '',
    description: '鼠标悬停样式'
  },
  bold: {
    type: Number,
    default: 400,
    description: '加粗'
  }
}
export type MarkProps = ExtractPropTypes<typeof markProps>
