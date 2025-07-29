import { convertProps } from 'docs/lib/utils'
import { dropdownProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 1,
  data: convertProps(dropdownProps),
}
