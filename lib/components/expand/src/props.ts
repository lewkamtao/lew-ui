import type { ExtractPropTypes } from 'vue'

export const expandProps = {
  collapseHeight: {
    type: [Number, String],
    default: '',
    description: '收起的高度'
  }
}

export type ExpandProps = ExtractPropTypes<typeof expandProps>
