import { convertEmits } from 'docs/lib/utils'
import { datePickerEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 99,
  data: convertEmits(datePickerEmits),
}
