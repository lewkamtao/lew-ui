import type { ExtractPropTypes } from 'vue'

export const magicNumberProps = {
  value: {
    type: Number,
    default: 999.99,
    description: '数字的显示值，可以是整数或小数'
  },
  size: {
    type: [Number, String],
    default: 16,
    description: '字体大小，可以是数字（单位为像素）或字符串（如 "16px"、"1rem"）'
  },
  sep: {
    type: Boolean,
    default: false,
    description: '是否使用千位分隔符来格式化数字，true 表示使用分隔符，false 表示不使用'
  }
}

export type MagicNumberProps = ExtractPropTypes<typeof magicNumberProps>
