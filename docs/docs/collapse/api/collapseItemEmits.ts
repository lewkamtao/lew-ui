import { convertEmits } from 'docs/lib/utils'
import { collapseItemEmits } from 'lew-ui'

export default {
  title: 'Emits(CollapseItem)',
  columnsKey: 'emits',
  orderNum: 11,
  data: convertEmits(collapseItemEmits),
}
