import { convertEmits } from 'docs/lib/utils'
import { cascaderEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 99,
  data: convertEmits(cascaderEmits),
}
