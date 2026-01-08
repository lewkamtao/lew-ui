<script lang="ts" setup>
import type { LewXAlignment, LewYAlignment } from 'lew-ui/types'
import { useResizeObserver } from '@vueuse/core'
import { LewCheckbox, LewEmpty, LewFlex, LewTextTrim } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { any2px, getUniqueId } from 'lew-ui/utils'
import { difference, isEmpty, isString, keys, pickBy, sumBy, throttle } from 'lodash-es'
import { markRaw } from 'vue'
import { tableEmits } from './emits'
import { tableProps } from './props'
import SortIcon from './SortIcon.vue'

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const MIN_DRAG_DISTANCE = 10
const SCROLL_THRESHOLD = 10
const THROTTLE_DELAY = 120
const TOOLTIP_THROTTLE_DELAY = 16
const DRAG_END_DELAY = 250
const ROW_HEIGHT_THROTTLE_DELAY = 100

const selectedKeys = defineModel('selectedKeys')
const sortValue: any = defineModel('sortValue', { default: {} })

const tableRef = ref<HTMLElement>()
const fixedLeftRef = ref<HTMLElement>()
const fixedRightRef = ref<HTMLElement>()

const trRefMap = shallowRef<Record<string, HTMLElement | null>>({})
const fixedLeftTrRefMap = shallowRef<Record<string, HTMLElement | null>>({})
const fixedRightTrRefMap = shallowRef<Record<string, HTMLElement | null>>({})

let tooltipAnimationFrame: number | null = null
let rowHeightRAF: number | null = null
const _rowKey = props.rowKey || '_lew_table_tr_id'

const layoutState = shallowReactive({
  isScrollbarVisible: false,
  isScroll: false,
  scrollClientWidth: 0,
  hiddenScrollLine: 'all',
  fixedLeftWidth: 0,
  fixedRightWidth: 0,
})

const selectionState = shallowReactive({
  isAllChecked: false,
  selectedRowsMap: {} as Record<string, boolean>,
})

const dragState = shallowReactive({
  dragIndex: -1,
  targetIndex: -1,
  isDragging: false,
  showTooltip: false,
  tooltipStyle: '',
  isAboveTarget: false,
  initialDragY: 0,
  lastMouseY: 0,
  dragRowId: '',
  targetRowId: '',
})

const dataState = shallowReactive({
  dataSource: [] as any[],
  trPositionsMap: {} as Record<string, any>,
  trHeightMap: {} as Record<string, number | undefined>,
  isInitializing: true,
})

const tooltipComponent = shallowRef<any>(null)
const hoverRowIndex = shallowRef(-1)
const renderCache = new Map<string, any>()
const columnWidthCache = new Map<string, number>()
const rowHeightCache = new Map<string, string>()
const columnStyleCache = new Map<string, string>()

const SIZE_CONFIG = {
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

const sizeConfig = computed(() => SIZE_CONFIG[props.size])

const getCheckableWidth = computed(() => sizeConfig.value.checkableWidth)
const getDragColumnWidth = computed(() => sizeConfig.value.dragColumnWidth)
const getHeadHeight = computed(() => sizeConfig.value.headHeight)
const getFontSize = computed(() => sizeConfig.value.fontSize)
const getIconSize = computed(() => sizeConfig.value.iconSize)
const getPadding = computed(() => sizeConfig.value.padding)
const getEmptyPadding = computed(() => sizeConfig.value.emptyPadding)
const getMinRowHeight = computed(() => sizeConfig.value.minRowHeight)

const getEmptyProps = computed(() => ({
  width: any2px(sizeConfig.value.emptyWidth),
  fontSize: any2px(sizeConfig.value.fontSize),
}))

function getRowClass(index: number, row: any) {
  return {
    'lew-table-tr-hover': hoverRowIndex.value === index && !dragState.isDragging,
    'lew-table-tr-dragging': dragState.dragIndex === index,
    'lew-table-tr-selected': selectionState.selectedRowsMap[row[_rowKey]],
  }
}

function getRowSelectedState(row: any): boolean {
  return selectionState.selectedRowsMap[row[_rowKey]] || false
}

const processedColumns = computed(() => {
  return processColumnsWidth(props.columns)
})

const leafColumns = computed(() => {
  return getLeafColumns(processedColumns.value)
})

const nonFixedColumns = computed(() => {
  return leafColumns.value.filter(col => !col.fixed)
})

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
  if (props.checkable)
    width += getCheckableWidth.value
  if (props.sortable)
    width += getDragColumnWidth.value
  return width
})

const fixedWidths = computed(() => {
  const leftWidth = sumBy(fixedColumns.value.left, 'width')
  const rightWidth = sumBy(fixedColumns.value.right, 'width')
  return {
    left:
      leftWidth
      + (props.checkable ? getCheckableWidth.value : 0)
      + (props.sortable ? getDragColumnWidth.value : 0),
    right: rightWidth,
  }
})

const baseSizeStyle = computed(
  () => `padding: ${getPadding.value}; font-size: ${getFontSize.value}px;`,
)
const headerSizeStyle = computed(() => `font-size: ${getFontSize.value}px;`)

function getColumnStyle(column: any, row?: any): string {
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
      = layoutState.scrollClientWidth - fixedWidths.value.left - fixedWidths.value.right
    const tdWidth = nonFixedWidth > 0 ? (width / nonFixedWidth) * availableWidth : width
    result = `${baseSizeStyle.value}; width: ${tdWidth}px; ${customStyle}`
  }

  columnStyleCache.set(cacheKey, result)
  return result
}

function getHeaderColumnStyle(column: any, row?: any): string {
  const width = column.width
  const customStyle = row?.tdStyle?.[column.field] || ''

  if (layoutState.isScrollbarVisible || column.fixed) {
    return `${headerSizeStyle.value}; width: ${width}px; ${customStyle}`
  }

  const nonFixedWidth
    = totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right
  const availableWidth
    = layoutState.scrollClientWidth - fixedWidths.value.left - fixedWidths.value.right
  const tdWidth = nonFixedWidth > 0 ? (width / nonFixedWidth) * availableWidth : width
  return `${headerSizeStyle.value}; width: ${tdWidth}px; ${customStyle}`
}

const hasPartialSelection = computed(() => {
  const selectedRowsMap = selectionState.selectedRowsMap
  return dataState.dataSource.some((row: any) => selectedRowsMap[row[_rowKey]])
})

const columnLevel = computed(() => {
  const findMaxDepth = (columns: any[], currentDepth = 1): number => {
    if (!columns || columns.length === 0)
      return currentDepth

    let maxDepth = currentDepth
    for (const col of columns) {
      if (col.children && col.children.length > 0) {
        const childDepth = findMaxDepth(col.children, currentDepth + 1)
        maxDepth = Math.max(maxDepth, childDepth)
      }
    }
    return maxDepth
  }
  return findMaxDepth(props.columns)
})

const getScrollLineLeftClassName = computed(() => {
  return !layoutState.isScrollbarVisible
    || ['all', 'left'].includes(layoutState.hiddenScrollLine)
    ? 'lew-hide-line-left'
    : ''
})

const getScrollLineRightClassName = computed(() => {
  return !layoutState.isScrollbarVisible
    || ['all', 'right'].includes(layoutState.hiddenScrollLine)
    ? 'lew-hide-line-right'
    : ''
})

const hasFixedLeft = computed(
  () => fixedColumns.value.left.length > 0 || props.checkable || props.sortable,
)
const hasFixedRight = computed(() => fixedColumns.value.right.length > 0)

const getTableClass = computed(() => ({
  'lew-table-bordered': props.bordered,
  'lew-table-scroll': layoutState.isScroll,
  'lew-table-dragging': dragState.isDragging,
  'lew-table-has-fixed-left': hasFixedLeft.value,
  'lew-table-has-fixed-right': hasFixedRight.value,
}))

const nonFixedHeaderColumns = computed(() => headerColumns.value.nonFixed)

function getColumnX(column: any): LewXAlignment {
  return column.x || 'start'
}

function getColumnY(column: any): LewYAlignment | undefined {
  return column.y
}

function calculateColumnWidth(column: any): number {
  const cacheKey = column.field || column.title || JSON.stringify(column)
  const cached = columnWidthCache.get(cacheKey)
  if (cached !== undefined) {
    return cached
  }

  let width: number
  if (column.children?.length > 0) {
    width = column.children.reduce(
      (sum: number, child: any) => sum + (calculateColumnWidth(child) || 100),
      0,
    )
  }
  else {
    width = column.width || 100
  }

  columnWidthCache.set(cacheKey, width)
  return width
}

function processColumnsWidth(columns: any[]) {
  return columns.map((col) => {
    const cloneCol = { ...col }
    cloneCol.width = calculateColumnWidth(cloneCol)
    return cloneCol
  })
}

function getLeafColumns(columns: any[]) {
  const result: any[] = []
  const traverse = (cols: any[]) => {
    cols.forEach((col) => {
      if (col.children && col.children.length > 0) {
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

function getCachedRenderResult(column: any, row: any) {
  const cacheKey = `${column.field}_${row._lew_table_tr_id}`

  if (!renderCache.has(cacheKey)) {
    const renderResult = column.customRender({
      row,
      column,
      text: row[column.field],
    })
    renderCache.set(cacheKey, markRaw(renderResult))
  }

  return renderCache.get(cacheKey)
}

function clearRenderCache() {
  renderCache.clear()
}

function updateAllCheckedState() {
  const checkedKeys = keys(pickBy(selectionState.selectedRowsMap, Boolean))
  const allDataKeys = dataState.dataSource.map((row: any) => String(row[_rowKey]))
  const uncheckedKeys = difference(allDataKeys, checkedKeys)
  selectionState.isAllChecked
    = isEmpty(uncheckedKeys) && props.multiple && props.checkable && checkedKeys.length > 0
}

function setAllRowsChecked(checked: boolean) {
  const newMap: Record<string, boolean> = {}
  for (const row of dataState.dataSource) {
    newMap[row[_rowKey]] = checked
  }
  selectionState.selectedRowsMap = newMap
  if (props.multiple) {
    selectedKeys.value = checked ? keys(newMap) : []
  }
}

function toggleRowSelection(row: any) {
  if (!props.checkable)
    return

  const rowKey = row[_rowKey]
  const isChecked = selectionState.selectedRowsMap[rowKey]

  if (props.multiple) {
    selectionState.selectedRowsMap[rowKey] = !isChecked
    selectedKeys.value = keys(pickBy(selectionState.selectedRowsMap, Boolean))
  }
  else {
    selectionState.selectedRowsMap = { [rowKey]: !isChecked }
    selectedKeys.value = isChecked ? undefined : rowKey
  }
  emit('selectChange', selectedKeys.value)
  updateAllCheckedState()
}

function updateSelectedKeys(newKeys: any) {
  if (props.multiple) {
    const newMap: Record<string, boolean> = {}
    for (const row of dataState.dataSource) {
      newMap[row[_rowKey]] = false
    }
    if (Array.isArray(newKeys)) {
      for (const key of newKeys) {
        newMap[key] = true
      }
    }
    selectionState.selectedRowsMap = newMap
  }
  else {
    selectionState.selectedRowsMap = { [newKeys]: true }
  }
}

function showTextAndEmpty(text: any) {
  if (text === null || text === undefined || text === '') {
    return '-'
  }
  else {
    return isString(text) ? text : String(text)
  }
}

const X_ALIGN_MAP: Record<string, string> = {
  start: 'start',
  left: 'start',
  center: 'center',
  right: 'end',
  end: 'end',
}

function readerHeaderTd({ column }: any) {
  const tdClass = column.sortable
    ? ['lew-table-td', 'lew-table-td-sortable']
    : ['lew-table-td']
  const alignItems = X_ALIGN_MAP[column.x] || 'start'

  const width = column.width
  let calculatedWidth = width

  if (!layoutState.isScrollbarVisible && !column.fixed) {
    const nonFixedWidth
      = totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right
    const availableWidth
      = layoutState.scrollClientWidth - fixedWidths.value.left - fixedWidths.value.right
    calculatedWidth
      = nonFixedWidth > 0 ? (width / nonFixedWidth) * availableWidth : width
  }

  const widthPx = any2px(calculatedWidth)

  return h(
    'div',
    {
      class: tdClass,
      onClick: column.sortable ? () => sort(column) : undefined,
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: widthPx,
        justifyContent: 'center',
        alignItems,
      },
    },
    [
      h(
        'span',
        {
          style: {
            padding: getPadding.value,
            display: 'flex',
            alignItems: 'center',
            justifyContent: alignItems,
            width: widthPx,
            height: '100%',
            boxSizing: 'border-box',
          },
        },
        [
          h('span', { class: 'lew-table-title-span' }, [
            column.title,
            column.sortable
            && h(SortIcon, {
              'sort-value': sortValue.value[column.field],
              'size': props.size,
              'class': 'lew-table-sorter',
            }),
          ]),
        ],
      ),
      column.children?.length > 0
        ? h(
            'div',
            { class: 'lew-table-td-group', style: { display: 'flex' } },
            column.children.map((child: any) => readerHeaderTd({ column: child })),
          )
        : null,
    ],
  )
}

function sort(column: any) {
  if (column.sortable) {
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
}

function updateScrollState() {
  const element = tableRef.value
  if (!element)
    return

  const { clientWidth, scrollWidth, scrollLeft } = element
  let newHiddenScrollLine: string

  if (scrollWidth === clientWidth) {
    newHiddenScrollLine = 'all'
  }
  else if (scrollLeft < SCROLL_THRESHOLD) {
    newHiddenScrollLine = 'left'
  }
  else if (scrollLeft + clientWidth > scrollWidth - SCROLL_THRESHOLD) {
    newHiddenScrollLine = 'right'
  }
  else {
    newHiddenScrollLine = ''
  }

  if (layoutState.hiddenScrollLine !== newHiddenScrollLine) {
    layoutState.hiddenScrollLine = newHiddenScrollLine
  }
}

function computeTableRowHeight() {
  if (rowHeightRAF) {
    cancelAnimationFrame(rowHeightRAF)
  }

  rowHeightRAF = requestAnimationFrame(() => {
    const newTrHeightMap: Record<string, number | undefined> = {}
    const newTrPositionsMap: Record<string, any> = {}
    const mainRefs = trRefMap.value
    const leftRefs = fixedLeftTrRefMap.value
    const rightRefs = fixedRightTrRefMap.value

    const elementsToMeasure: Array<{ rowId: string, elements: HTMLElement[] }> = []

    for (const row of dataState.dataSource) {
      const rowId = row._lew_table_tr_id
      const elements: HTMLElement[] = []

      const mainEl = mainRefs[rowId]
      const leftEl = leftRefs[rowId]
      const rightEl = rightRefs[rowId]

      if (mainEl) {
        mainEl.style.height = 'auto'
        mainEl.style.minHeight = 'auto'
        elements.push(mainEl)
      }
      if (leftEl) {
        leftEl.style.height = 'auto'
        leftEl.style.minHeight = 'auto'
        elements.push(leftEl)
      }
      if (rightEl) {
        rightEl.style.height = 'auto'
        rightEl.style.minHeight = 'auto'
        elements.push(rightEl)
      }

      if (elements.length > 0) {
        elementsToMeasure.push({ rowId, elements })
      }
    }

    for (const { rowId, elements } of elementsToMeasure) {
      let maxHeight = 0
      let referenceElement: HTMLElement | null = null

      for (const el of elements) {
        const height = el.getBoundingClientRect().height
        if (height > maxHeight) {
          maxHeight = height
          referenceElement = el
        }
      }

      if (maxHeight > 0) {
        newTrHeightMap[rowId] = maxHeight

        if (referenceElement) {
          const rect = referenceElement.getBoundingClientRect()
          newTrPositionsMap[rowId] = {
            top: rect.top,
            bottom: rect.bottom,
            height: maxHeight,
            middle: rect.top + maxHeight / 2,
          }
        }
      }
    }

    dataState.trHeightMap = newTrHeightMap
    dataState.trPositionsMap = newTrPositionsMap
    rowHeightCache.clear()
    rowHeightRAF = null
  })
}

const handleTableResize = throttle(() => {
  const table = tableRef.value
  if (!table)
    return

  const newScrollClientWidth = table.clientWidth
  const newIsScroll = table.scrollWidth > table.clientWidth + 5

  if (layoutState.scrollClientWidth !== newScrollClientWidth) {
    layoutState.scrollClientWidth = newScrollClientWidth
    columnStyleCache.clear()
  }
  if (layoutState.isScroll !== newIsScroll) {
    layoutState.isScroll = newIsScroll
  }

  const leftEl = fixedLeftRef.value
  const rightEl = fixedRightRef.value

  if (leftEl) {
    const newLeftWidth = leftEl.clientWidth || 0
    if (layoutState.fixedLeftWidth !== newLeftWidth) {
      layoutState.fixedLeftWidth = newLeftWidth
    }
  }
  if (rightEl) {
    const newRightWidth = rightEl.clientWidth || 0
    if (layoutState.fixedRightWidth !== newRightWidth) {
      layoutState.fixedRightWidth = newRightWidth
    }
  }

  const totalWidth = totalColumnWidth.value
  const newIsScrollbarVisible = totalWidth > layoutState.scrollClientWidth
  if (layoutState.isScrollbarVisible !== newIsScrollbarVisible) {
    layoutState.isScrollbarVisible = newIsScrollbarVisible
    columnStyleCache.clear()
  }

  updateScrollState()
  nextTick(computeTableRowHeight)
}, THROTTLE_DELAY)

function init() {
  nextTick(() => {
    updateScrollState()
    handleTableResize()

    if (props.checkable) {
      updateSelectedKeys(selectedKeys.value)
    }
    initDragState()
    dataState.dataSource = addUniqueIdToDataSource(props.dataSource)

    nextTick(() => {
      dataState.isInitializing = false
      computeTableRowHeight()
    })
  })
}

function initDragState() {
  dragState.dragIndex = -1
  dragState.targetIndex = -1
  dragState.dragRowId = ''
  dragState.targetRowId = ''
  dragState.initialDragY = 0
  dragState.lastMouseY = 0
  dragState.showTooltip = false
  dragState.isDragging = false
}

const throttledTooltipUpdate = throttle(updateTooltipPosition, TOOLTIP_THROTTLE_DELAY)

function dragStart(event: DragEvent, row: any, index: number) {
  if (!props.sortable)
    return

  initDragState()
  computeTableRowHeight()

  dragState.dragIndex = index
  dragState.dragRowId = row._lew_table_tr_id
  dragState.isDragging = true
  dragState.initialDragY = event.clientY
  dragState.lastMouseY = event.clientY
  dragState.showTooltip = true
  dragState.tooltipStyle = `transform: translate(calc(${event.clientX}px - 2px), calc(${event.clientY}px - 2px))`

  document.body.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'
  document.body.style.webkitUserSelect = 'none'

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    const canvas = document.createElement('canvas')
    event.dataTransfer.setDragImage(canvas, 0, 0)
  }

  const tooltipCacheKey = `tooltip_${row._lew_table_tr_id}`
  if (!renderCache.has(tooltipCacheKey)) {
    const rendered = props.sortTooltipCustomRender
      ? props.sortTooltipCustomRender(row)
      : h('div', {}, `Row ${row._lew_table_tr_id}`)
    renderCache.set(tooltipCacheKey, rendered)
  }
  tooltipComponent.value = renderCache.get(tooltipCacheKey)

  document.addEventListener('mousemove', throttledTooltipUpdate)
  document.addEventListener('mouseup', dragEnd)
}

function updateTooltipPosition(event: MouseEvent) {
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame)
  }

  tooltipAnimationFrame = requestAnimationFrame(() => {
    dragState.tooltipStyle = `transform: translate(calc(${event.clientX}px - 2px), calc(${event.clientY}px - 2px))`
    updateDragTarget(event.clientY)
  })
}

function dragEnd() {
  const dragDistance = Math.abs(dragState.initialDragY - dragState.lastMouseY)
  document.body.style.cursor = 'default'

  if (
    dragState.dragRowId
    && dragState.targetRowId
    && dragState.dragRowId !== dragState.targetRowId
    && dragDistance >= MIN_DRAG_DISTANCE
  ) {
    const dragIndex = dataState.dataSource.findIndex(
      row => row._lew_table_tr_id === dragState.dragRowId,
    )
    const targetIndex = dataState.dataSource.findIndex(
      row => row._lew_table_tr_id === dragState.targetRowId,
    )

    if (dragIndex !== -1 && targetIndex !== -1 && dragIndex !== targetIndex) {
      const targetPosition = dragState.isAboveTarget ? targetIndex : targetIndex + 1
      let actualTargetPosition = targetPosition
      if (dragIndex < targetPosition) {
        actualTargetPosition--
      }

      if (actualTargetPosition !== dragIndex) {
        const newDataSource = [...dataState.dataSource]
        const [movedItem] = newDataSource.splice(dragIndex, 1)
        newDataSource.splice(actualTargetPosition, 0, movedItem)
        dataState.dataSource = newDataSource
        emit('dragSort', newDataSource)
      }
    }
  }

  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame)
    tooltipAnimationFrame = null
  }

  document.body.style.userSelect = ''
  document.body.style.webkitUserSelect = ''
  document.removeEventListener('mousemove', throttledTooltipUpdate)
  document.removeEventListener('mouseup', dragEnd)

  dragState.dragIndex = -1
  dragState.targetIndex = -1
  dragState.dragRowId = ''
  dragState.targetRowId = ''
  dragState.initialDragY = 0
  dragState.lastMouseY = 0
  dragState.showTooltip = false

  setTimeout(() => {
    dragState.isDragging = false
    computeTableRowHeight()
  }, DRAG_END_DELAY)
}

function updateDragTarget(mouseY: number) {
  dragState.lastMouseY = mouseY

  const positionsMap = dataState.trPositionsMap
  if (!dragState.dragRowId || Object.keys(positionsMap).length === 0)
    return

  const dragDistance = Math.abs(dragState.initialDragY - mouseY)
  if (dragDistance < 5)
    return

  const positionEntries = Object.entries(positionsMap)
    .map(([id, pos]) => ({ id, ...pos }))
    .sort((a, b) => a.top - b.top)

  let targetRowId = ''
  let isAbove = false

  for (const entry of positionEntries) {
    if (entry.id === dragState.dragRowId)
      continue

    if (mouseY >= entry.top && mouseY <= entry.bottom) {
      targetRowId = entry.id
      isAbove = mouseY < entry.top + entry.height / 2
      break
    }
  }

  if (!targetRowId) {
    for (let i = 0; i < positionEntries.length - 1; i++) {
      const curr = positionEntries[i]
      const next = positionEntries[i + 1]
      if (curr.id === dragState.dragRowId || next.id === dragState.dragRowId)
        continue

      if (mouseY > curr.bottom && mouseY < next.top) {
        if (mouseY - curr.bottom < next.top - mouseY) {
          targetRowId = curr.id
          isAbove = false
        }
        break
      }
    }
  }

  if (!targetRowId && positionEntries.length > 0) {
    const first = positionEntries[0]
    const last = positionEntries[positionEntries.length - 1]
    if (mouseY < first.top) {
      targetRowId = first.id
      isAbove = true
    }
    else if (mouseY > last.bottom) {
      targetRowId = last.id
      isAbove = false
    }
  }

  if (targetRowId) {
    dragState.targetRowId = targetRowId
    dragState.targetIndex = dataState.dataSource.findIndex(
      row => row._lew_table_tr_id === targetRowId,
    )
    dragState.isAboveTarget = isAbove
  }
}

function getIndicatorStyle(): string {
  if (
    !dragState.isDragging
    || !dragState.targetRowId
    || dragState.dragRowId === dragState.targetRowId
  ) {
    return 'display: none; transform: translateY(0);'
  }

  const targetPosition = dataState.trPositionsMap[dragState.targetRowId]
  if (!targetPosition)
    return 'display: none;'

  const top = dragState.isAboveTarget ? targetPosition.top : targetPosition.bottom
  const tableRect = tableRef.value?.getBoundingClientRect()
  const offsetTop = tableRect ? top - tableRect.top : 0

  return `display: block; transform: translateY(${offsetTop}px); opacity: 1;`
}

function addUniqueIdToDataSource(dataSource: any[]): any[] {
  return dataSource.map((row) => {
    if (!row._lew_table_tr_id) {
      row._lew_table_tr_id = getUniqueId()
    }
    return markRaw(row)
  })
}

function getRowHeight(row: any): string {
  if (!row?._lew_table_tr_id)
    return 'auto'

  const rowId = row._lew_table_tr_id
  const cached = rowHeightCache.get(rowId)
  if (cached)
    return cached

  const height = dataState.trHeightMap[rowId]
  const result = height ? `${height}px` : `${getMinRowHeight.value}px`

  rowHeightCache.set(rowId, result)
  return result
}

function setTrRef(el: HTMLElement | null, row: any) {
  if (row && row._lew_table_tr_id) {
    trRefMap.value[row._lew_table_tr_id] = el
  }
}

function setFixedLeftTrRef(el: HTMLElement | null, row: any) {
  if (row && row._lew_table_tr_id) {
    fixedLeftTrRefMap.value[row._lew_table_tr_id] = el
  }
}

function setFixedRightTrRef(el: HTMLElement | null, row: any) {
  if (row && row._lew_table_tr_id) {
    fixedRightTrRefMap.value[row._lew_table_tr_id] = el
  }
}

onMounted(() => {
  init()

  useResizeObserver(tableRef, () => {
    handleTableResize()
  })
})

onUnmounted(() => {
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame)
    tooltipAnimationFrame = null
  }
  if (rowHeightRAF) {
    cancelAnimationFrame(rowHeightRAF)
    rowHeightRAF = null
  }
  renderCache.clear()
  columnWidthCache.clear()
  rowHeightCache.clear()
  columnStyleCache.clear()
})

watch(
  () => props.dataSource,
  (newVal) => {
    clearRenderCache()
    dataState.trHeightMap = {}
    dataState.trPositionsMap = {}
    rowHeightCache.clear()
    columnStyleCache.clear()

    const newDataSource = addUniqueIdToDataSource(newVal)
    nextTick(() => {
      dataState.dataSource = newDataSource
      updateScrollState()
      handleTableResize()

      const newMap: Record<string, boolean> = {}
      for (const row of newVal) {
        newMap[row[_rowKey]] = false
      }
      selectionState.selectedRowsMap = newMap
      updateAllCheckedState()
      initDragState()
      computeTableRowHeight()
    })
  },
  { deep: true },
)

watch(selectedKeys, (newVal: any) => {
  if (props.checkable) {
    updateSelectedKeys(newVal)
  }
})

const throttledRowHeightCompute = throttle(() => {
  if (!dataState.isInitializing) {
    computeTableRowHeight()
  }
}, ROW_HEIGHT_THROTTLE_DELAY)

watch([trRefMap, fixedLeftTrRefMap, fixedRightTrRefMap], throttledRowHeightCompute, {
  deep: true,
})

watch(
  () => props.size,
  () => {
    dataState.trHeightMap = {}
    dataState.trPositionsMap = {}
    rowHeightCache.clear()
    columnStyleCache.clear()

    nextTick(() => {
      updateScrollState()
      handleTableResize()
      setTimeout(computeTableRowHeight, 50)
      if (props.checkable) {
        updateSelectedKeys(selectedKeys.value)
      }
    })
  },
)
</script>

<template>
  <div class="lew-table-wrapper">
    <i
      :style="{ left: any2px(layoutState.fixedLeftWidth) }"
      :class="getScrollLineLeftClassName"
      class="lew-table-scroll-line-left"
    />
    <i
      :style="{ right: any2px(layoutState.fixedRightWidth) }"
      :class="getScrollLineRightClassName"
      class="lew-table-scroll-line-right"
    />
    <div class="lew-table-header">
      <slot name="table-header" />
    </div>
    <div class="lew-table-drag-indicator" :style="getIndicatorStyle()" />
    <div
      ref="tableRef"
      class="lew-table lew-scrollbar"
      :class="getTableClass"
      :style="`max-height: ${any2px(maxHeight)}`"
      @scroll="updateScrollState"
      @mouseleave.stop="hoverRowIndex = -1"
    >
      <div
        class="lew-table-head"
        :class="{ 'lew-table-head-bordered': columnLevel > 1 }"
        :style="{
          width: `${totalColumnWidth}px`,
          height: `${getHeadHeight * columnLevel + columnLevel * 1}px`,
        }"
        @mouseenter.stop="hoverRowIndex = -1"
      >
        <div v-if="hasFixedLeft" ref="fixedLeftRef" class="lew-table-fixed-left">
          <div class="lew-table-tr">
            <LewFlex
              v-if="sortable"
              class="lew-table-td"
              :style="{
                width: `${getDragColumnWidth}px`,
                padding: getPadding,
              }"
              x="center"
            >
              <CommonIcon :size="getIconSize" type="grip-vertical" />
            </LewFlex>
            <LewFlex
              v-if="checkable"
              class="lew-table-td"
              :style="{
                width: `${getCheckableWidth}px`,
                padding: getPadding,
              }"
              x="center"
            >
              <LewCheckbox
                v-if="multiple"
                v-model="selectionState.isAllChecked"
                :size="size"
                :disabled="dataState.dataSource.length === 0"
                :certain="hasPartialSelection && !selectionState.isAllChecked"
                @change="setAllRowsChecked($event)"
              />
              <CommonIcon v-else :size="getIconSize" type="square-mouse-pointer" />
            </LewFlex>
            <readerHeaderTd
              v-for="(column, index) in headerColumns.left"
              :key="`columns${index}`"
              :column="column"
              :x="getColumnX(column)"
              :y="getColumnY(column)"
              :style="getHeaderColumnStyle(column)"
              gap="5px"
            />
          </div>
        </div>
        <div class="lew-table-main">
          <div class="lew-table-tr">
            <readerHeaderTd
              v-for="column in nonFixedHeaderColumns"
              :key="column.field"
              :column="column"
              :x="getColumnX(column)"
              :y="getColumnY(column)"
              :style="getHeaderColumnStyle(column)"
              gap="5px"
            />
          </div>
        </div>
        <div v-if="hasFixedRight" ref="fixedRightRef" class="lew-table-fixed-right">
          <div class="lew-table-tr">
            <readerHeaderTd
              v-for="column in headerColumns.right"
              :key="column.field"
              :column="column"
              class="lew-table-td"
              :class="{
                'lew-table-td-sortable': column.sortable,
              }"
              :x="getColumnX(column)"
              :y="getColumnY(column)"
              :style="getHeaderColumnStyle(column)"
              gap="5px"
            />
          </div>
        </div>
      </div>
      <div v-if="dataState.dataSource.length === 0" class="lew-table-empty">
        <slot v-if="$slots.empty" name="empty" />
        <LewFlex
          v-else
          x="center"
          y="center"
          :style="{ padding: `${getEmptyPadding}px` }"
        >
          <LewEmpty v-bind="getEmptyProps" />
        </LewFlex>
      </div>
      <div
        v-if="dataState.dataSource.length > 0"
        class="lew-table-body"
        :style="`width: ${totalColumnWidth}px`"
      >
        <div v-if="hasFixedLeft" class="lew-table-fixed-left">
          <div
            v-for="(row, i) in dataState.dataSource"
            :key="row._lew_table_tr_id"
            :ref="(e: any) => setFixedLeftTrRef(e, row)"
            class="lew-table-tr"
            :class="getRowClass(i, row)"
            :style="{
              height: getRowHeight(row),
              minHeight: getRowHeight(row),
            }"
            @click="toggleRowSelection(row)"
            @mouseenter.stop="hoverRowIndex = i"
          >
            <LewFlex
              v-if="sortable"
              :style="{ width: `${getDragColumnWidth}px` }"
              x="center"
              class="lew-table-drag-handle"
              @mousedown.stop="dragStart($event, row, i)"
            >
              <CommonIcon
                :size="getIconSize"
                type="grip-vertical"
                class="lew-table-drag-icon"
              />
            </LewFlex>
            <LewFlex
              v-if="checkable"
              :style="{ width: `${getCheckableWidth}px` }"
              x="center"
              class="lew-table-checkbox-wrapper"
            >
              <LewCheckbox
                :size="size"
                class="lew-table-checkbox"
                :checked="getRowSelectedState(row)"
              />
            </LewFlex>
            <LewFlex
              v-for="column in fixedColumns.left"
              :key="column.field"
              class="lew-table-td"
              :x="getColumnX(column)"
              :y="getColumnY(column)"
              :style="getColumnStyle(column, row)"
            >
              <template v-if="$slots[column.field]">
                <slot :name="column.field" :row="row" :column="column" :index="i" />
              </template>
              <template v-else>
                <LewFlex
                  v-if="column.type === 'text-trim'"
                  :x="column.x"
                  style="width: 100%"
                >
                  <LewTextTrim :text="showTextAndEmpty(row[column.field])" />
                </LewFlex>
                <template v-else-if="column.customRender">
                  <RenderComponent :render-fn="getCachedRenderResult(column, row)" />
                </template>
                <template v-else>
                  {{ showTextAndEmpty(row[column.field]) }}
                </template>
              </template>
            </LewFlex>
          </div>
        </div>
        <div class="lew-table-main">
          <div
            v-for="(row, i) in dataState.dataSource"
            :key="row._lew_table_tr_id"
            :ref="(e: any) => setTrRef(e, row)"
            class="lew-table-tr"
            :class="getRowClass(i, row)"
            :style="{
              height: getRowHeight(row),
              minHeight: getRowHeight(row),
            }"
            @click="toggleRowSelection(row)"
            @mouseenter.stop="hoverRowIndex = i"
          >
            <LewFlex
              v-for="column in nonFixedColumns"
              :key="column.field"
              class="lew-table-td"
              :x="getColumnX(column)"
              :y="getColumnY(column)"
              :style="getColumnStyle(column, row)"
            >
              <template v-if="$slots[column.field]">
                <slot :name="column.field" :row="row" :column="column" :index="i" />
              </template>
              <template v-else>
                <LewFlex
                  v-if="column.type === 'text-trim'"
                  :x="column.x"
                  style="width: 100%"
                >
                  <LewTextTrim :text="showTextAndEmpty(row[column.field])" />
                </LewFlex>
                <template v-else-if="column.customRender">
                  <RenderComponent :render-fn="getCachedRenderResult(column, row)" />
                </template>
                <template v-else>
                  {{ showTextAndEmpty(row[column.field]) }}
                </template>
              </template>
            </LewFlex>
          </div>
        </div>
        <div v-if="hasFixedRight" class="lew-table-fixed-right">
          <div
            v-for="(row, i) in dataState.dataSource"
            :key="row._lew_table_tr_id"
            :ref="(e: any) => setFixedRightTrRef(e, row)"
            class="lew-table-tr"
            :style="{
              height: getRowHeight(row),
              minHeight: getRowHeight(row),
            }"
            :class="getRowClass(i, row)"
            @mouseenter.stop="hoverRowIndex = i"
          >
            <LewFlex
              v-for="(column, j) in fixedColumns.right"
              :key="`col${j}`"
              class="lew-table-td"
              :x="getColumnX(column)"
              :y="getColumnY(column)"
              :style="getColumnStyle(column, row)"
            >
              <template v-if="$slots[column.field]">
                <slot :name="column.field" :row="row" :column="column" :index="i" />
              </template>
              <template v-else>
                <LewFlex
                  v-if="column.type === 'text-trim'"
                  :x="column.x"
                  style="width: 100%"
                >
                  <LewTextTrim :text="showTextAndEmpty(row[column.field])" />
                </LewFlex>
                <template v-else-if="column.customRender">
                  <RenderComponent :render-fn="getCachedRenderResult(column, row)" />
                </template>
                <template v-else>
                  {{ showTextAndEmpty(row[column.field]) }}
                </template>
              </template>
            </LewFlex>
          </div>
        </div>
      </div>
    </div>
    <div class="lew-table-footer">
      <slot name="table-footer" />
    </div>

    <div
      v-show="dragState.showTooltip"
      class="lew-table-drag-tooltip"
      :style="dragState.tooltipStyle"
    >
      <RenderComponent :render-fn="tooltipComponent" />
    </div>
  </div>
</template>

<style lang="scss">
.lew-table-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--lew-table-bgcolor);

  .lew-table-header,
  .lew-table-footer {
    position: relative;
    z-index: 9;
  }

  .lew-table-scroll-line {
    position: absolute;
    top: 0px;
    height: 100%;
    z-index: 16;
    width: 5px;
    transition: opacity 0.25s;
  }

  .lew-table-scroll-line-left {
    @extend .lew-table-scroll-line;
    left: 0px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.075),
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0)
    );
  }

  .lew-table-scroll-line-right {
    @extend .lew-table-scroll-line;
    right: 0px;
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.075),
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0)
    );
  }

  .lew-hide-line-left,
  .lew-hide-line-right {
    opacity: 0;
  }

  // 拖拽提示气泡
  .lew-table-drag-tooltip {
    position: fixed;
    z-index: 9999;
    padding: 8px 12px;
    border-radius: var(--lew-border-radius-small);
    color: var(--lew-color-text-0);
    background-color: var(--lew-pop-bgcolor);
    box-shadow: var(--lew-pop-box-shadow);
    border: var(--lew-pop-border);
    font-size: 14px;
    pointer-events: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 0;
    top: 0;
    will-change: transform;
    transition: transform 0.12s ease-out;
  }
}

.lew-table {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--lew-table-bgcolor);

  .lew-table-head,
  .lew-table-body {
    display: flex;
    align-items: flex-start;
  }

  .lew-table-fixed-left {
    position: sticky;
    left: 0px;
    z-index: 9;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
  }

  .lew-table-fixed-right {
    position: sticky;
    right: 0px;
    z-index: 9;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
  }

  .lew-table-main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
  }

  .lew-table-tr {
    display: flex;
    background-color: var(--lew-table-bgcolor);
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
  }

  .lew-table-td {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: start;
    text-align: left;
    box-sizing: border-box;
    flex-grow: 1;
  }

  .lew-table-head {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 15;
    box-sizing: border-box;

    .lew-table-tr {
      background-color: var(--lew-table-header-bgcolor);
      flex-shrink: 0;
      height: 100%;

      .lew-table-td {
        color: var(--lew-text-color-1);
        white-space: nowrap;
      }

      .lew-table-td-sortable {
        cursor: pointer;
        user-select: none;
      }

      .lew-table-title-span {
        position: relative;

        .lew-table-sorter {
          position: absolute;
          top: 50%;
          right: 0px;
          width: auto;
          transform: translate(calc(100% + 10px), -50%);
          transition:
            opacity var(--lew-form-transition-ease),
            transform var(--lew-form-transition-ease);
        }
      }

      .lew-table-td-sortable:hover {
        background-color: var(--lew-table-header-bgcolor-hover);
      }

      .lew-table-td-sortable:active {
        background-color: var(--lew-table-header-bgcolor-active);
      }
    }
  }

  .lew-table-td {
    color: var(--lew-text-color-1);
  }

  .lew-table-checkbox-wrapper {
    position: relative;
    cursor: pointer;
  }

  // 拖拽相关样式
  .lew-table-drag-handle {
    position: relative;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    .lew-table-drag-icon {
      font-size: 16px;
      color: var(--lew-text-color-3);
      transition: color 0.2s;
    }

    &:hover .lew-table-drag-icon {
      color: var(--lew-primary-color, #1677ff);
    }
  }

  .lew-table-tr-hover {
    background-color: var(--lew-table-tr-hover-bgcolor);

    .lew-table-checkbox {
      .lew-checkbox-icon-box {
        border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
      }
    }
  }

  .lew-table-tr-selected {
    background-color: var(--lew-table-tr-selected);
  }

  .lew-table-empty {
    position: sticky;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.lew-table-drag-indicator {
  position: absolute;
  left: 0;
  top: -1px;
  width: 100%;
  height: 2px;
  background-color: var(--lew-color-primary-dark);
  pointer-events: none;
  z-index: 20;
  will-change: transform;
  transition: transform 0.1s ease-out;
}

.lew-table-scroll {
  overflow-x: auto;
}

.lew-table-td-group {
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
}

.lew-table-checkbox-wrapper::after {
  position: absolute;
  z-index: 1;
  content: '';
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.lew-table {
  box-sizing: border-box;

  // -------------------- 基础边框（所有模式都有） --------------------

  // 表头行底边框
  .lew-table-head .lew-table-tr {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: var(--lew-table-border);
      pointer-events: none;
      z-index: 1;
    }
  }

  // 表体行底边框
  .lew-table-body .lew-table-tr {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: var(--lew-table-border);
      pointer-events: none;
      z-index: 1;
    }

    &:last-child::after {
      display: none; // 最后一行不需要底边框
    }
  }

  // 分组单元格顶部边框（嵌套表头）
  .lew-table-td-group {
    position: relative;
    width: 100%;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      border-top: var(--lew-table-border);
      pointer-events: none;
      z-index: 1;
    }
  }

  // -------------------- bordered 模式（整表边框） --------------------

  &.lew-table-bordered {
    border: var(--lew-table-border);

    // 所有单元格右边框
    .lew-table-td::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      border-right: var(--lew-table-border);
      pointer-events: none;
      z-index: 1;
    }

    // 固定左侧列：移除最后一个单元格的右边框
    .lew-table-fixed-left > .lew-table-tr > .lew-table-td:last-child::after {
      display: none;
    }

    // 主区域
    .lew-table-main {
      position: relative;

      // 当存在固定左侧列时，添加左边框分隔
      &:not(:first-child)::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-left: var(--lew-table-border);
        pointer-events: none;
        z-index: 2;
      }

      // 移除最后一个单元格的右边框
      > .lew-table-tr > .lew-table-td:last-child::after {
        display: none;
      }
    }

    // 固定右侧列
    .lew-table-fixed-right {
      position: relative;

      // 添加左边框分隔
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-left: var(--lew-table-border);
        pointer-events: none;
        z-index: 2;
      }

      // 移除最后一个单元格的右边框
      > .lew-table-tr > .lew-table-td:last-child::after {
        display: none;
      }
    }
  }

  // -------------------- head-bordered 模式（仅表头边框） --------------------

  &.lew-table-head-bordered {
    .lew-table-head {
      // 表头单元格右边框
      .lew-table-td::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        border-right: var(--lew-table-border);
        pointer-events: none;
        z-index: 1;
      }

      // 固定左侧列：移除最后一个单元格的右边框
      .lew-table-fixed-left > .lew-table-tr > .lew-table-td:last-child::after {
        display: none;
      }

      // 主区域
      .lew-table-main {
        position: relative;

        // 当存在固定左侧列时，添加左边框分隔
        &:not(:first-child)::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-left: var(--lew-table-border);
          pointer-events: none;
          z-index: 2;
        }

        // 移除最后一个单元格的右边框
        > .lew-table-tr > .lew-table-td:last-child::after {
          display: none;
        }
      }

      // 固定右侧列
      .lew-table-fixed-right {
        position: relative;

        // 添加左边框分隔
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-left: var(--lew-table-border);
          pointer-events: none;
          z-index: 2;
        }

        // 移除最后一个单元格的右边框
        > .lew-table-tr > .lew-table-td:last-child::after {
          display: none;
        }
      }
    }
  }

  // -------------------- 拖拽状态 --------------------

  .lew-table-tr-dragging {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--lew-table-tr-dragging-bgcolor);
      pointer-events: none;
      z-index: 1;
    }
  }
}
</style>
