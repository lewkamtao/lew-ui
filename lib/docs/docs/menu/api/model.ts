import { menuModel, menuProps } from 'lew-ui'
import { convertProps } from '@/lib/utils'

export default {
  title: 'Model',
  columnsKey: 'props',
  orderNum: 10,
  data: convertProps(menuModel)
}
