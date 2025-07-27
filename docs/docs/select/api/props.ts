import { convertProps } from 'docs/lib/utils'
import { selectProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 10,
  data: convertProps(selectProps),
}
