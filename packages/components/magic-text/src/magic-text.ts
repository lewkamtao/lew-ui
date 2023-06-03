import type { ExtractPropTypes, PropType } from 'vue'

type TitleType =
    | 'primary'
    | 'info'
    | 'success'
    | 'error'
    | 'warning'
    | 'normal'
export const magicNumberProps = {
  type: {
    type: String as PropType<TitleType>,
    default: 'primary',
  },
}
export type MagicNumberProps = ExtractPropTypes<typeof magicNumberProps>
