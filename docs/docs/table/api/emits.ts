import { convertEmits } from 'docs/lib/utils'
import { tableEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 99,
  data: convertEmits(tableEmits),
}
