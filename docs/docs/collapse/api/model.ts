import { convertProps } from 'docs/lib/utils'
import { collapseModel } from 'lew-ui'

export default {
  title: 'Model',
  columnsKey: 'model',
  orderNum: 1,
  data: convertProps(collapseModel),
}
