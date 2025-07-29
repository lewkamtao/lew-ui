import { convertProps } from 'docs/lib/utils'
import { treeSelectProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  data: convertProps(treeSelectProps),
}
