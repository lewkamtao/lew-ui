import { convertEmits } from 'docs/lib/utils'
import { collapseEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 10,
  data: convertEmits(collapseEmits),
}
