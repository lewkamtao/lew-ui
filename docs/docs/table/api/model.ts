import { convertProps } from 'docs/lib/utils'
import { tableModel } from 'lew-ui'

export default {
  title: 'Model',
  columnsKey: 'model',
  orderNum: 10,
  data: convertProps(tableModel),
}
