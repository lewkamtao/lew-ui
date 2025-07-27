import { convertProps } from 'docs/lib/utils'
import { treeProps } from 'lew-ui'

export default {
  title: 'Props',
  columnsKey: 'props',
  data: convertProps(treeProps),
}
