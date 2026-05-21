import type { Ref } from 'vue'

export function useTableColumnSort(options: {
  sortValue: Ref<any>
  emit: (...args: any[]) => void
}) {
  const { sortValue, emit } = options

  function sort(column: { field: string, sortable?: boolean }) {
    if (!column.sortable)
      return

    let value = sortValue.value?.[column.field]

    switch (value) {
      case 'desc':
        value = 'asc'
        break
      case 'asc':
        value = undefined
        break
      default:
        value = 'desc'
        break
    }

    sortValue.value = {
      ...(sortValue.value || {}),
      [column.field]: value,
    }

    emit('sortChange', { ...sortValue.value })
  }

  return { sort }
}
