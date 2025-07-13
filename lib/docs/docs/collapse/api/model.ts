import { collapseModel } from 'lew-ui'
import { convertProps } from '@/lib/utils'

export default {
    title: 'Model',
    columnsKey: 'model',
    orderNum: 1,
    data: convertProps(collapseModel),
}
