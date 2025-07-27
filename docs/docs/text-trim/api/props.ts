import { convertProps } from 'docs/lib/utils'
import { textTrimProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  data: convertProps(textTrimProps),
}
