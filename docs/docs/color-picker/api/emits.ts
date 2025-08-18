import { convertEmits } from 'docs/lib/utils'
import { colorPickerEmits } from 'lew-ui'

export default {
  title: 'Emits',
  columnsKey: 'emits',
  orderNum: 99,
  data: convertEmits(colorPickerEmits),
}
