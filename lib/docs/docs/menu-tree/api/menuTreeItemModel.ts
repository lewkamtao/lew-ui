import { menuTreeItemModel } from 'lew-ui'
import { convertProps } from '@/lib/utils'

export default {
  title: 'Model (MenuTreeItem)',
  columnsKey: 'model',
  orderNum: 2,
  data: convertProps(menuTreeItemModel)
}
