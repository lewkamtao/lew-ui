import type { ExtractPropTypes, PropType } from 'vue'

export type markType =
    | 'primary'
    | 'info'
    | 'success'
    | 'error'
    | 'warning'
    | 'normal'

export const markProps = {
  type: {
    type: String as PropType<markType>,
    default: 'normal',
  },
  round: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: '',
  },
  bold: {
    type: Number,
    default: 400,
  },
}
export type MarkProps = ExtractPropTypes<typeof markProps>
