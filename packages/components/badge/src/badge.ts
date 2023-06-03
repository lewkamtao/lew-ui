import type { ExtractPropTypes, PropType } from 'vue'

type badgeType =
    | 'primary'
    | 'info'
    | 'success'
    | 'error'
    | 'warning'
    | 'normal'

export const badgeProps = {
  type: {
    type: String as PropType<badgeType>,
    default: 'normal',
  },
  round: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
