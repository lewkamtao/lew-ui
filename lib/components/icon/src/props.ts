import type { ExtractPropTypes } from 'vue'

export const iconProps = {
  color: {
    type: String,
    default: 'inherit',
    description: '图标的颜色'
  },
  size: {
    type: [String, Number],
    default: '24px',
    description: '图标的大小'
  },
  as: {
    type: String,
    default: 'send-plane-line',
    description: '图标的标签'
  }
}

export type IconProps = ExtractPropTypes<typeof iconProps>
