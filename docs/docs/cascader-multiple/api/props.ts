import { convertProps } from 'docs/lib/utils'
import { cascaderMultipleProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  data: convertProps(cascaderMultipleProps),
}
