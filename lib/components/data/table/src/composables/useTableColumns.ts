import type { Ref } from 'vue'
import { sumBy } from 'lodash-es'
import { computed, shallowReactive } from 'vue'

export const TABLE_SIZE_CONFIG = {
  small: {
    checkableWidth: 50,
    dragColumnWidth: 40,
    headHeight: 34,
    fontSize: 13,
    iconSize: 15,
    padding: '8px',
    emptyPadding: 20,
    emptyWidth: 150,
    minRowHeight: 32,
  },
  medium: {
    checkableWidth: 60,
    dragColumnWidth: 45,
    headHeight: 38,
    fontSize: 14,
    iconSize: 16,
    padding: '10px',
    emptyPadding: 30,
    emptyWidth: 200,
    minRowHeight: 36,
  },
  large: {
    checkableWidth: 70,
    dragColumnWidth: 50,
    headHeight: 44,
    fontSize: 16,
    iconSize: 17,
    padding: '12px',
    emptyPadding: 40,
    emptyWidth: 250,
    minRowHeight: 42,
  },
} as const

export interface TableLayoutState {
  isScrollbarVisible: boolean
  isScroll: boolean
  scrollClientWidth: number
  hiddenScrollLine: string
}

export interface TableDisplayColumn {
  [key: string]: any
  _stickyLeft?: number
  _stickyRight?: number
  _isLastLeftFixed?: boolean
  _isFirstRightFixed?: boolean
}

function calculateColumnWidth(
  column: any,
  columnWidthCache: Map<string, number>,
): number {
  const cacheKey = column.field || column.title || JSON.stringify(column)
  const cached = columnWidthCache.get(cacheKey)
  if (cached !== undefined) {
    return cached
  }

  let width: number
  if (column.children?.length) {
    width = column.children.reduce(
      (sum: number, child: any) => sum + (calculateColumnWidth(child, columnWidthCache) || 100),
      0,
    )
  }
  else {
    width = column.width || 100
  }

  columnWidthCache.set(cacheKey, width)
  return width
}

export function processColumnsWidth(
  columns: any[],
  columnWidthCache: Map<string, number>,
) {
  return columns.map((col) => {
    const cloneCol = { ...col }
    cloneCol.width = calculateColumnWidth(cloneCol, columnWidthCache)
    return cloneCol
  })
}

export function getLeafColumns(columns: any[]) {
  const result: any[] = []
  const traverse = (cols: any[]) => {
    cols.forEach((col) => {
      if (col.children?.length) {
        traverse(col.children)
      }
      else {
        result.push(col)
      }
    })
  }
  traverse(columns)
  return result
}

function applyStickyOffsetsToTree(
  columns: any[],
  leftAcc: { value: number },
  rightMap: Map<string, number>,
): any[] {
  return columns.map((col) => {
    const next = { ...col }
    if (next.children?.length) {
      next.children = applyStickyOffsetsToTree(next.children, leftAcc, rightMap)
      if (next.fixed === 'left') {
        next._stickyLeft = leftAcc.value - (next.width || 0)
      }
      else if (next.fixed === 'right') {
        const firstLeaf = getLeafColumns([next])[0]
        if (firstLeaf?.field && rightMap.has(firstLeaf.field)) {
          next._stickyRight = rightMap.get(firstLeaf.field)
        }
      }
    }
    else if (next.fixed === 'left') {
      next._stickyLeft = leftAcc.value
      leftAcc.value += next.width || 0
    }
    else if (next.fixed === 'right' && next.field && rightMap.has(next.field)) {
      next._stickyRight = rightMap.get(next.field)
    }
    return next
  })
}

export function useTableColumns(options: {
  columns: Ref<any[]>
  size: Ref<'small' | 'medium' | 'large'>
  checkable: Ref<boolean>
  sortable: Ref<boolean>
  layoutState: TableLayoutState
  columnWidthCache: Map<string, number>
  columnStyleCache: Map<string, string>
}) {
  const {
    columns,
    size,
    checkable,
    sortable,
    layoutState,
    columnWidthCache,
    columnStyleCache,
  } = options

  const sizeConfig = computed(() => TABLE_SIZE_CONFIG[size.value])

  const getCheckableWidth = computed(() => sizeConfig.value.checkableWidth)
  const getDragColumnWidth = computed(() => sizeConfig.value.dragColumnWidth)
  const getHeadHeight = computed(() => sizeConfig.value.headHeight)
  const getFontSize = computed(() => sizeConfig.value.fontSize)
  const getIconSize = computed(() => sizeConfig.value.iconSize)
  const getPadding = computed(() => sizeConfig.value.padding)
  const getEmptyPadding = computed(() => sizeConfig.value.emptyPadding)
  const getMinRowHeight = computed(() => sizeConfig.value.minRowHeight)

  const processedColumns = computed(() =>
    processColumnsWidth(columns.value, columnWidthCache),
  )

  const leafColumns = computed(() => getLeafColumns(processedColumns.value))

  const nonFixedColumns = computed(() =>
    leafColumns.value.filter(col => !col.fixed),
  )

  const fixedColumns = computed(() => ({
    left: leafColumns.value.filter(col => col.fixed === 'left'),
    right: leafColumns.value.filter(col => col.fixed === 'right'),
  }))

  const specialLeftWidth = computed(() => {
    let width = 0
    if (sortable.value)
      width += getDragColumnWidth.value
    if (checkable.value)
      width += getCheckableWidth.value
    return width
  })

  const displayColumns = computed((): TableDisplayColumn[] => {
    const left = fixedColumns.value.left
    const right = fixedColumns.value.right
    const middle = nonFixedColumns.value

    let leftAcc = specialLeftWidth.value
    const leftCols = left.map((col, index) => {
      const next: TableDisplayColumn = {
        ...col,
        _stickyLeft: leftAcc,
        _isLastLeftFixed: index === left.length - 1,
      }
      leftAcc += col.width || 0
      return next
    })

    let rightAcc = 0
    const rightColsReversed = [...right].reverse().map((col) => {
      const next: TableDisplayColumn = {
        ...col,
        _stickyRight: rightAcc,
      }
      rightAcc += col.width || 0
      return next
    })
    const rightCols = rightColsReversed.reverse().map((col, index) => ({
      ...col,
      _isFirstRightFixed: index === 0,
    }))

    return [...leftCols, ...middle, ...rightCols]
  })

  const headerColumns = computed(() => {
    const left = processedColumns.value.filter(col => col.fixed === 'left')
    const right = processedColumns.value.filter(col => col.fixed === 'right')
    const nonFixed = processedColumns.value.filter(col => !col.fixed)

    const rightLeafSticky = new Map<string, number>()
    let rightAcc = 0
    const rightLeaves = getLeafColumns(right)
    for (let i = rightLeaves.length - 1; i >= 0; i--) {
      const leaf = rightLeaves[i]
      if (leaf?.field) {
        rightLeafSticky.set(leaf.field, rightAcc)
        rightAcc += leaf.width || 0
      }
    }

    const leftAcc = { value: specialLeftWidth.value }
    const leftWithSticky = applyStickyOffsetsToTree(left, leftAcc, rightLeafSticky)
    const rightWithSticky = applyStickyOffsetsToTree(right, { value: 0 }, rightLeafSticky)

    const leftLeaves = getLeafColumns(leftWithSticky)
    if (leftLeaves.length > 0) {
      const last = leftLeaves[leftLeaves.length - 1]
      last._isLastLeftFixed = true
    }
    const rightLeavesSticky = getLeafColumns(rightWithSticky)
    if (rightLeavesSticky.length > 0) {
      rightLeavesSticky[0]._isFirstRightFixed = true
    }

    return {
      left: leftWithSticky,
      right: rightWithSticky,
      nonFixed,
      all: [...leftWithSticky, ...nonFixed, ...rightWithSticky],
    }
  })

  const totalColumnWidth = computed(() => {
    let width = sumBy(leafColumns.value, 'width')
    if (checkable.value)
      width += getCheckableWidth.value
    if (sortable.value)
      width += getDragColumnWidth.value
    return width
  })

  const fixedWidths = computed(() => {
    const leftWidth = sumBy(fixedColumns.value.left, 'width')
    const rightWidth = sumBy(fixedColumns.value.right, 'width')
    return {
      left:
        leftWidth
        + (checkable.value ? getCheckableWidth.value : 0)
        + (sortable.value ? getDragColumnWidth.value : 0),
      right: rightWidth,
    }
  })

  const baseSizeStyle = computed(
    () => `padding: ${getPadding.value}; font-size: ${getFontSize.value}px;`,
  )
  const headerSizeStyle = computed(() => `font-size: ${getFontSize.value}px;`)

  function getResolvedWidth(column: any): number {
    // 分组父级宽度必须等于子列解析宽度之和，不能用自身 fixed/width 锁死，
    // 否则子列拉伸后会溢出，表现为多级表头错位叠字。
    if (column.children?.length) {
      return column.children.reduce(
        (sum: number, child: any) => sum + getResolvedWidth(child),
        0,
      )
    }

    const width = Number(column.width) || 0
    if (layoutState.isScrollbarVisible || column.fixed) {
      return Math.round(width)
    }
    const nonFixedWidth
      = totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right
    const availableWidth
      = layoutState.scrollClientWidth
        - fixedWidths.value.left
        - fixedWidths.value.right
    const resolved
      = nonFixedWidth > 0 ? (width / nonFixedWidth) * availableWidth : width
    return Math.round(resolved)
  }

  function getStickyStyle(column: any, zIndex = 2): string {
    // 无横向滚动时不启用 sticky，避免右固定列吸到视口右缘造成中间断层
    if (!layoutState.isScrollbarVisible)
      return ''

    if (column.fixed === 'left' && column._stickyLeft != null) {
      return `position:sticky;left:${column._stickyLeft}px;z-index:${zIndex};`
    }
    if (column.fixed === 'right' && column._stickyRight != null) {
      return `position:sticky;right:${column._stickyRight}px;z-index:${zIndex};`
    }
    return ''
  }

  function getStickyClass(column: any): Record<string, boolean> {
    const stickyActive = layoutState.isScrollbarVisible && !!column.fixed
    return {
      'lew-table-td-sticky': stickyActive,
      'lew-table-td-sticky-left': stickyActive && column.fixed === 'left',
      'lew-table-td-sticky-right': stickyActive && column.fixed === 'right',
      'lew-table-td-sticky-left-last': stickyActive && !!column._isLastLeftFixed,
      'lew-table-td-sticky-right-first': stickyActive && !!column._isFirstRightFixed,
    }
  }

  function getSpecialColumnStyle(kind: 'drag' | 'checkbox'): string {
    const width = kind === 'drag' ? getDragColumnWidth.value : getCheckableWidth.value
    const left = kind === 'drag'
      ? 0
      : (sortable.value ? getDragColumnWidth.value : 0)
    const sticky = layoutState.isScrollbarVisible
      ? `position:sticky;left:${left}px;z-index:3;`
      : ''
    // 勾选/拖拽列不加 content padding，避免表头与表体错位
    return `padding:0;width:${width}px;flex:0 0 ${width}px;box-sizing:border-box;${sticky}`
  }

  function getSpecialColumnClass(kind: 'drag' | 'checkbox'): Record<string, boolean> {
    const stickyActive = layoutState.isScrollbarVisible
    const isLastLeft
      = kind === 'checkbox'
        ? fixedColumns.value.left.length === 0
        : !checkable.value && fixedColumns.value.left.length === 0
    return {
      'lew-table-td': true,
      'lew-table-td-special': true,
      'lew-table-checkbox-wrapper': kind === 'checkbox',
      'lew-table-drag-handle': kind === 'drag',
      'lew-table-td-sticky': stickyActive,
      'lew-table-td-sticky-left': stickyActive,
      'lew-table-td-sticky-left-last': stickyActive && isLastLeft,
    }
  }

  function getColumnStyle(column: any, row?: Record<string, any>): string {
    const width = getResolvedWidth(column)
    const customStyle = row?.tdStyle?.[column.field] || ''
    const sticky = getStickyStyle(column, 2)
    const cacheKey = `${column.field}_${width}_${column._stickyLeft}_${column._stickyRight}_${layoutState.isScrollbarVisible}_${layoutState.scrollClientWidth}_${customStyle}`

    const cached = columnStyleCache.get(cacheKey)
    if (cached)
      return cached

    const result = `${baseSizeStyle.value};width:${width}px;flex:0 0 ${width}px;box-sizing:border-box;${sticky}${customStyle}`
    columnStyleCache.set(cacheKey, result)
    return result
  }

  function getHeaderColumnStyle(column: any, row?: Record<string, any>): string {
    const width = getResolvedWidth(column)
    const customStyle = row?.tdStyle?.[column.field] || ''
    const sticky = getStickyStyle(column, 4)
    // 与表体共用同一套 padding + width，保证列对齐
    return `${baseSizeStyle.value};width:${width}px;flex:0 0 ${width}px;box-sizing:border-box;${sticky}${customStyle}`
  }

  const columnLevel = computed(() => {
    const findMaxDepth = (cols: any[], currentDepth = 1): number => {
      if (!cols?.length)
        return currentDepth

      let maxDepth = currentDepth
      for (const col of cols) {
        if (col.children?.length) {
          const childDepth = findMaxDepth(col.children, currentDepth + 1)
          maxDepth = Math.max(maxDepth, childDepth)
        }
      }
      return maxDepth
    }
    return findMaxDepth(columns.value)
  })

  const nonFixedHeaderColumns = computed(() => headerColumns.value.nonFixed)

  return {
    sizeConfig,
    getCheckableWidth,
    getDragColumnWidth,
    getHeadHeight,
    getFontSize,
    getIconSize,
    getPadding,
    getEmptyPadding,
    getMinRowHeight,
    processedColumns,
    leafColumns,
    nonFixedColumns,
    fixedColumns,
    headerColumns,
    displayColumns,
    totalColumnWidth,
    fixedWidths,
    specialLeftWidth,
    baseSizeStyle,
    headerSizeStyle,
    getColumnStyle,
    getHeaderColumnStyle,
    getResolvedWidth,
    getStickyClass,
    getSpecialColumnStyle,
    getSpecialColumnClass,
    columnLevel,
    nonFixedHeaderColumns,
  }
}

export function createTableLayoutState() {
  return shallowReactive<TableLayoutState>({
    isScrollbarVisible: false,
    isScroll: false,
    scrollClientWidth: 0,
    hiddenScrollLine: 'all',
  })
}
