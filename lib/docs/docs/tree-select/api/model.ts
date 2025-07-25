import { treeSelectModel } from 'lew-ui'
import { convertProps } from '@/lib/utils'

export default {
  title: 'Model',
  columnsKey: 'model',
  data: convertProps(treeSelectModel),
}
