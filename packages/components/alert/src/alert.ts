import type { ExtractPropTypes, PropType } from 'vue'

export interface AlertItem {
  type: string
  title: string
  content?: string
  closeable?: boolean
}

export const alertProps = {
  list: {
    type: Array as PropType<AlertItem[]>,
    required: true,
  },
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
