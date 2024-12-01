import { menuTreeProps } from 'lew-ui'
import { convertProps } from '@/lib/utils'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 3,
  data: convertProps(menuTreeProps)
}
