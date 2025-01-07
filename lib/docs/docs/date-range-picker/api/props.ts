import { dateRangePickerProps } from 'lew-ui'
import { convertProps } from '@/lib/utils'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 2,
  data: convertProps(dateRangePickerProps)
}
