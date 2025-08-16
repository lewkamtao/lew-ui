import { convertEmits } from 'docs/lib/utils'
import { menuTreeEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 10,
  data: convertEmits(menuTreeEmits),
}
