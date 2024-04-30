import { ExtractPropTypes } from 'vue'

export const magicNumberProps = {
  value: {
    type: Number,
    default: 999.99,
    description: '绑定值'
  },
  size: {
    type: Number,
    default: 16,
    description: '字体大小'
  },
  sep: {
    type: Boolean,
    default: false,
    description: '是否展示千位分隔符'
  }
}
export type MagicNumberProps = ExtractPropTypes<typeof magicNumberProps>
