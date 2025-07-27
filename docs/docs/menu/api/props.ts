import { convertProps } from 'docs/lib/utils'
import { menuProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 10,
  data: convertProps(menuProps),
}
