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
  fixedLeftWidth: number
  fixedRightWidth: number
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

  const headerColumns = computed(() => ({
    left: processedColumns.value.filter(col => col.fixed === 'left'),
    right: processedColumns.value.filter(col => col.fixed === 'right'),
    nonFixed: processedColumns.value.filter(col => !col.fixed),
  }))

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

  function getColumnStyle(column: any, row?: Record<string, any>): string {
    const width = column.width
    const customStyle = row?.tdStyle?.[column.field] || ''
    const cacheKey = `${column.field}_${width}_${layoutState.isScrollbarVisible}_${layoutState.scrollClientWidth}_${customStyle}`

    const cached = columnStyleCache.get(cacheKey)
    if (cached)
      return cached

    let result: string
    if (layoutState.isScrollbarVisible || column.fixed) {
      result = `${baseSizeStyle.value}; width: ${width}px; ${customStyle}`
    }
    else {
      const nonFixedWidth
        = totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right
      const availableWidth
        = layoutState.scrollClientWidth
          - fixedWidths.value.left
          - fixedWidths.value.right
      const tdWidth
        = nonFixedWidth > 0 ? (width! / nonFixedWidth) * availableWidth : width
      result = `${baseSizeStyle.value}; width: ${tdWidth}px; ${customStyle}`
    }

    columnStyleCache.set(cacheKey, result)
    return result
  }

  function getHeaderColumnStyle(column: any, row?: Record<string, any>): string {
    const width = column.width
    const customStyle = row?.tdStyle?.[column.field] || ''

    if (layoutState.isScrollbarVisible || column.fixed) {
      return `${headerSizeStyle.value}; width: ${width}px; ${customStyle}`
    }

    const nonFixedWidth
      = totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right
    const availableWidth
      = layoutState.scrollClientWidth
        - fixedWidths.value.left
        - fixedWidths.value.right
    const tdWidth
      = nonFixedWidth > 0 ? (width! / nonFixedWidth) * availableWidth : width
    return `${headerSizeStyle.value}; width: ${tdWidth}px; ${customStyle}`
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
    totalColumnWidth,
    fixedWidths,
    baseSizeStyle,
    headerSizeStyle,
    getColumnStyle,
    getHeaderColumnStyle,
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
    fixedLeftWidth: 0,
    fixedRightWidth: 0,
  })
}
