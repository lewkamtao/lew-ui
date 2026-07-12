import type { Ref } from 'vue'
import { difference, isEmpty, keys, pickBy } from 'lodash-es'
import { shallowReactive } from 'vue'

export interface TableSelectionState {
  isAllChecked: boolean
  selectedRowsMap: Record<string, boolean>
}

export interface TableFocusState {
  focusedRowsMap: Record<string, boolean>
}

export function useTableSelection(options: {
  props: {
    checkable?: boolean
    multiple?: boolean
    focusable?: boolean
  }
  emit: (...args: any[]) => void
  selectedKeys: Ref<any>
  dataSource: Ref<Record<string, unknown>[]>
  rowKey: string
}) {
  const { props, emit, selectedKeys, dataSource, rowKey } = options

  const selectionState = shallowReactive<TableSelectionState>({
    isAllChecked: false,
    selectedRowsMap: {},
  })

  const focusState = shallowReactive<TableFocusState>({
    focusedRowsMap: {},
  })

  function getRawSelectedKeys(): unknown[] {
    return dataSource.value
      .filter(row => selectionState.selectedRowsMap[String(row[rowKey])])
      .map(row => row[rowKey])
  }

  function updateAllCheckedState() {
    const checkedKeys = keys(pickBy(selectionState.selectedRowsMap, Boolean))
    const allDataKeys = dataSource.value.map(row => String(row[rowKey]))
    const uncheckedKeys = difference(allDataKeys, checkedKeys)
    selectionState.isAllChecked
      = isEmpty(uncheckedKeys)
        && props.multiple
        && props.checkable
        && checkedKeys.length > 0
  }

  function setAllRowsChecked(checked: boolean) {
    const newMap: Record<string, boolean> = {}
    const nextKeys: unknown[] = []
    for (const row of dataSource.value) {
      const rawKey = row[rowKey]
      newMap[String(rawKey)] = checked
      if (checked)
        nextKeys.push(rawKey)
    }
    selectionState.selectedRowsMap = newMap
    selectionState.isAllChecked
      = checked
        && props.multiple
        && props.checkable
        && nextKeys.length > 0
    if (props.multiple)
      selectedKeys.value = checked ? nextKeys : []
    emit('selectChange', selectedKeys.value)
  }

  function handleHeaderCheckboxClick() {
    if (!props.checkable || !props.multiple || dataSource.value.length === 0)
      return
    setAllRowsChecked(!selectionState.isAllChecked)
  }

  function toggleRowSelection(row: Record<string, unknown>) {
    if (!props.checkable)
      return

    const rawKey = row[rowKey]
    const key = String(rawKey)
    const isChecked = !!selectionState.selectedRowsMap[key]

    if (props.multiple) {
      // shallowReactive 需替换引用才会触发更新
      selectionState.selectedRowsMap = {
        ...selectionState.selectedRowsMap,
        [key]: !isChecked,
      }
      selectedKeys.value = getRawSelectedKeys()
    }
    else {
      selectionState.selectedRowsMap = { [key]: !isChecked }
      selectedKeys.value = isChecked ? undefined : rawKey
    }
    emit('selectChange', selectedKeys.value)
    updateAllCheckedState()
  }

  function toggleRowFocus(row: Record<string, unknown>) {
    if (!props.focusable || props.checkable)
      return

    const key = String(row[rowKey])
    const isFocused = focusState.focusedRowsMap[key]
    focusState.focusedRowsMap = {
      ...focusState.focusedRowsMap,
      [key]: !isFocused,
    }
  }

  function handleRowClick(row: Record<string, unknown>) {
    if (props.checkable) {
      toggleRowSelection(row)
    }
    else if (props.focusable) {
      toggleRowFocus(row)
    }
  }

  function updateSelectedKeys(newKeys: any) {
    if (props.multiple) {
      const newMap: Record<string, boolean> = {}
      for (const row of dataSource.value) {
        newMap[String(row[rowKey])] = false
      }
      if (Array.isArray(newKeys)) {
        for (const key of newKeys)
          newMap[String(key)] = true
      }
      selectionState.selectedRowsMap = newMap
      updateAllCheckedState()
    }
    else if (newKeys !== undefined && newKeys !== null && newKeys !== '') {
      selectionState.selectedRowsMap = { [String(newKeys)]: true }
      updateAllCheckedState()
    }
    else {
      selectionState.selectedRowsMap = {}
      selectionState.isAllChecked = false
    }
  }

  function getRowSelectedState(row: Record<string, unknown>): boolean {
    return selectionState.selectedRowsMap[String(row[rowKey])] || false
  }

  return {
    selectionState,
    focusState,
    updateAllCheckedState,
    setAllRowsChecked,
    handleHeaderCheckboxClick,
    toggleRowSelection,
    toggleRowFocus,
    handleRowClick,
    updateSelectedKeys,
    getRowSelectedState,
  }
}
