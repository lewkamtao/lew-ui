import { convertProps } from 'docs/lib/utils'
import { colorPickerProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 3,
  data: convertProps(colorPickerProps),
}
