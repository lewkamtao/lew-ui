import { convertProps } from 'docs/lib/utils'
import { menuTreeProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 3,
  data: convertProps(menuTreeProps),
}
