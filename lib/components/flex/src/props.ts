import type { ExtractPropTypes } from 'vue'

export const flexProps = {
  direction: {
    type: String,
    default: 'x',
    description: '排列方向'
  },
  x: {
    type: String,
    default: 'center',
    typeDesc: 'start | center | end',
    description: '横向对齐方向'
  },
  y: {
    type: String,
    default: 'center',
    typeDesc: 'start | center | end',
    description: '垂直对齐方向'
  },
  wrap: {
    type: Boolean,
    default: false,
    description: '让元素在必要的时候换行'
  },
  mode: {
    type: String,
    default: '', // around / between
    typeDesc: 'around | between',
    description: '排序模式，这是个可选项，定义之后会干扰x或y的对齐方向，这取决于你的direction。'
  },
  gap: {
    type: [String, Number],
    default: 10,
    description: '元素之间的空隙'
  },
  width: {
    type: [String, Number],
    default: '',
    description: '父元素宽度'
  }
}
export type FlexProps = ExtractPropTypes<typeof flexProps>
