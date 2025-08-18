import { convertEmits } from 'docs/lib/utils'
import { dropdownEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 99,
  data: convertEmits(dropdownEmits),
}
