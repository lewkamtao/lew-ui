import { convertEmits } from 'docs/lib/utils'
import { actionBoxEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 99,
  data: convertEmits(actionBoxEmits),
}
