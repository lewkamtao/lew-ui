import { getUniqueId } from 'lew-ui/utils'
import { isString } from 'lodash-es'
import { markRaw } from 'vue'

export function addUniqueIdToDataSource(dataSource: Record<string, unknown>[]) {
  return dataSource.map((row) => {
    if (row._lew_table_tr_id) {
      return markRaw(row)
    }
    return markRaw({
      ...row,
      _lew_table_tr_id: getUniqueId(),
    })
  })
}

export function showTextAndEmpty(text: unknown) {
  if (text === null || text === undefined || text === '') {
    return '-'
  }
  return isString(text) ? text : String(text)
}
