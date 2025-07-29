import { convertProps } from 'docs/lib/utils'
import { switchModel } from 'lew-ui'

export default {
  title: 'Model',
  columnsKey: 'model',
  orderNum: 1,
  data: convertProps(switchModel),
}
