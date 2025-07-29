import { convertProps } from 'docs/lib/utils'
import { selectModel } from 'lew-ui'

export default {
  title: 'Model',
  columnsKey: 'model',
  orderNum: 1,
  data: convertProps(selectModel),
}
