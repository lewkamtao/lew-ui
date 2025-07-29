import { convertProps } from 'docs/lib/utils'
import { paginationModel } from 'lew-ui'

export default {
  title: 'Model',
  columnsKey: 'model',
  orderNum: 1,
  data: convertProps(paginationModel),
}
