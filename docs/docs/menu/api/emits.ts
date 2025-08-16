import { convertEmits } from 'docs/lib/utils'
import { menuEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 10,
  data: convertEmits(menuEmits),
}
