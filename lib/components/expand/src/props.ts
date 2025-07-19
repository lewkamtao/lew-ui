import type { ExtractPropTypes } from 'vue'

export const expandProps = {
  collapseHeight: {
    type: [Number, String],
    default: '',
    description: `组件收起状态时的高度，可以是数字（单位为像素）或字符串（如 '50px'、'3rem' 等）`,
  },
}

export type ExpandProps = ExtractPropTypes<typeof expandProps>
