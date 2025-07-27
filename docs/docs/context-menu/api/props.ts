import { convertProps } from 'docs/lib/utils'
import { contextMenuProps } from 'lew-ui/directives/context-menu'

export default {
  title: 'Props',
  columnsKey: 'props',
  orderNum: 1,
  data: convertProps(contextMenuProps),
}
