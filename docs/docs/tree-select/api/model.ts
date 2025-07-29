import { convertProps } from 'docs/lib/utils'
import { treeSelectModel } from 'lew-ui'

export default {
  title: 'Model',
  columnsKey: 'model',
  data: convertProps(treeSelectModel),
}
