import { convertProps } from 'docs/lib/utils'
import { menuTreeModel } from 'lew-ui'

export default {
  title: 'Model',
  columnsKey: 'model',
  orderNum: 1,
  data: convertProps(menuTreeModel),
}
