import { convertProps } from 'docs/lib/utils'
import { selectMultipleProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 10,
  data: convertProps(selectMultipleProps),
}
