<script lang="ts" setup>
import type { LewXAlignment, LewYAlignment } from 'lew-ui/types'
import { useResizeObserver } from '@vueuse/core'
import { LewCheckbox, LewEmpty, LewFlex, LewTextTrim } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/render/components/RenderComponent.vue'
import { any2px, getUniqueId } from 'lew-ui/utils'
import {
  cloneDeep,
  difference,
  isEmpty,
  isString,
  keyBy,
  keys,
  mapValues,
  pickBy,
  sumBy,
  throttle,
} from 'lodash-es'
import { markRaw, toRaw } from 'vue'
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

const selectedKeys = defineModel('selectedKeys')
const sortValue: any = defineModel('sortValue', { default: {} })

const tableRef = ref()
const fixedLeftRef = ref()
const fixedRightRef = ref()
const trRefMap = ref<Record<string, HTMLElement | null>>({})
const fixedLeftTrRefMap = ref<Record<string, HTMLElement | null>>({})
const fixedRightTrRefMap = ref<Record<string, HTMLElement | null>>({})
const tableWrapperRef = ref()

let tooltipAnimationFrame: number | null = null
const _rowKey = props.rowKey || '_lew_table_tr_id'

const state = reactive({
  isInitialized: false,
  columns: [],
  isAllChecked: false,
  isScrollbarVisible: false,
  isScroll: false,
  scrollClientWidth: 0,
  hiddenScrollLine: 'all',
  fixedLeftWidth: 0,
  fixedRightWidth: 0,
  selectedRowsMap: {} as any,
  dragIndex: -1,
  targetIndex: -1,
  isDragging: false,
  showTooltip: false,
  tooltipStyle: ``,
  dataSource: [] as any[],
  trPositionsMap: {} as Record<string, any>,
  trHeightMap: {} as Record<string, number | undefined>,
  isAboveTarget: false,
  initialDragY: 0 as number,
  lastMouseY: 0 as number,
  dragRowId: '',
  targetRowId: '',
})

const tooltipComponent = shallowRef(null as any)
const hoverRowIndex = shallowRef(-1)
const renderCache = new Map<string, any>()
const columnWidthCache = new Map()

const getCheckableWidth = computed(() => {
  const sizeMap = {
    small: 50,
    medium: 60,
    large: 70,
  }
  return sizeMap[props.size]
})

const getDragColumnWidth = computed(() => {
  const sizeMap = {
    small: 40,
    medium: 45,
    large: 50,
  }
  return sizeMap[props.size]
})

const getHeadHeight = computed(() => {
  const sizeMap = {
    small: 34,
    medium: 38,
    large: 44,
  }
  return sizeMap[props.size]
})

const getFontSize = computed(() => {
  const sizeMap = {
    small: 13,
    medium: 14,
    large: 16,
  }
  return sizeMap[props.size]
})

const getIconSize = computed(() => {
  const sizeMap = {
    small: 15,
    medium: 16,
    large: 17,
  }
  return sizeMap[props.size]
})

const getPadding = computed(() => {
  const paddingMap = {
    small: '8px',
    medium: '10px',
    large: '12px',
  }
  return paddingMap[props.size]
})

const getEmptyPadding = computed(() => {
  const paddingMap = {
    small: 20,
    medium: 30,
    large: 40,
  }
  return paddingMap[props.size]
})

const getEmptyProps: any = computed(() => {
  const widthMap = {
    small: 150,
    medium: 200,
    large: 250,
  }
  const fontSizeMap = {
    small: 13,
    medium: 14,
    large: 16,
  }
  return {
    width: any2px(widthMap[props.size]),
    fontSize: any2px(fontSizeMap[props.size]),
  }
})

const getRowClass = computed(() => {
  return (index: number, row: any) => ({
    'lew-table-tr-hover': hoverRowIndex.value === index && !state.isDragging,
    'lew-table-tr-dragging': state.dragIndex === index,
    'lew-table-tr-selected': state.selectedRowsMap[row[_rowKey]],
  })
})

const getRowSelectedState = computed(() => {
  return (row: any) => state.selectedRowsMap[row[_rowKey]]
})

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
  let width = sumBy(processedColumns.value, 'width')
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
    left: leftWidth + (props.checkable ? getCheckableWidth.value : 0),
    right: rightWidth,
  }
})

const getColumnStyle = computed(() => {
  const sizeStyle = `padding: ${getPadding.value}; fontSize:${getFontSize.value}px;`

  return (column: any, row?: any) => {
    const width = column.width
    const customStyle = row && row.tdStyle?.[column.field]

    if (state.isScrollbarVisible || column.fixed) {
      return `${sizeStyle};width: ${width}px;${customStyle}`
    }

    const tdWidth
      = (width
        / (totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right))
      * (state.scrollClientWidth - fixedWidths.value.left - fixedWidths.value.right)
    return `${sizeStyle};width: ${tdWidth}px;${customStyle}`
  }
})

const getHeaderColumnStyle = computed(() => {
  const sizeStyle = `fontSize:${getFontSize.value}px;`

  return (column: any, row?: any) => {
    const width = column.width
    const customStyle = row && row.tdStyle?.[column.field]

    if (state.isScrollbarVisible || column.fixed) {
      return `${sizeStyle};width: ${width}px;${customStyle}`
    }

    const tdWidth
      = (width
        / (totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right))
      * (state.scrollClientWidth - fixedWidths.value.left - fixedWidths.value.right)
    return `${sizeStyle};width: ${tdWidth}px;${customStyle}`
  }
})

const hasPartialSelection = computed(() => {
  const selectedRowsMap = state.selectedRowsMap
  return state.dataSource.some((row: any) => selectedRowsMap[row[_rowKey]])
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

const getFixedHeaderColumns = computed(() => (direction: string) => {
  return headerColumns.value[direction as keyof typeof headerColumns.value] || []
})

const getFixedColumns = computed(() => (direction: string) => {
  return fixedColumns.value[direction as keyof typeof fixedColumns.value] || []
})

const getScrollLineLeftClassName = computed(() => {
  return !state.isScrollbarVisible
    || !state.isInitialized
    || ['all', 'left'].includes(state.hiddenScrollLine)
    ? 'lew-hide-line-left'
    : ''
})

const getScrollLineRightClassName = computed(() => {
  return !state.isScrollbarVisible
    || !state.isInitialized
    || ['all', 'right'].includes(state.hiddenScrollLine)
    ? 'lew-hide-line-right'
    : ''
})

const getTableClass = computed(() => {
  return {
    'lew-table-bordered': props.bordered,
    'lew-table-scroll': state.isScroll,
    'lew-table-dragging': state.isDragging,
    'lew-table-has-fixed-left':
      getFixedColumns.value('left').length > 0 || props.checkable || props.sortable,
    'lew-table-has-fixed-right': getFixedColumns.value('right').length > 0,
  }
})

const nonFixedHeaderColumns = computed(() => headerColumns.value.nonFixed)

function calculateColumnWidth(column: any): number {
  const cacheKey = JSON.stringify(column)
  if (columnWidthCache.has(cacheKey)) {
    return columnWidthCache.get(cacheKey)
  }

  let width
  if (column.children && column.children.length > 0) {
    width = column.children.reduce((sum: number, child: any) => {
      return sum + (calculateColumnWidth(child) || 100)
    }, 0)
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
  const checkedKeys = keys(pickBy(state.selectedRowsMap, Boolean))
  const allDataKeys = state.dataSource.map((row: any) => String(row[_rowKey]))
  const uncheckedKeys = difference(allDataKeys, checkedKeys)
  state.isAllChecked
    = isEmpty(uncheckedKeys) && props.multiple && props.checkable && checkedKeys.length > 0
}

function setAllRowsChecked(checked: boolean) {
  state.selectedRowsMap = mapValues(keyBy(state.dataSource, _rowKey), () => checked)
  if (props.multiple) {
    selectedKeys.value = checked ? keys(state.selectedRowsMap) : []
  }
}

function toggleRowSelection(row: any) {
  const isChecked = state.selectedRowsMap[row[_rowKey]]
  if (props.multiple) {
    state.selectedRowsMap[row[_rowKey]] = !isChecked
    selectedKeys.value = keys(pickBy(state.selectedRowsMap, Boolean))
  }
  else {
    state.selectedRowsMap = { [row[_rowKey]]: !isChecked }
    selectedKeys.value = isChecked ? undefined : row[_rowKey]
  }
  emit('selectChange', toRaw(cloneDeep(selectedKeys.value)))
  updateAllCheckedState()
}

function updateSelectedKeys(keys: any) {
  if (props.multiple) {
    state.selectedRowsMap = mapValues(keyBy(state.dataSource, _rowKey), () => false)
    keys.forEach((key: string) => {
      state.selectedRowsMap[key] = true
    })
  }
  else {
    state.selectedRowsMap = { [keys]: true }
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

function readerHeaderTd({ column }: any) {
  const tdClass = ['lew-table-td']
  if (column.sortable) {
    tdClass.push('lew-table-td-sortable')
  }

  const xMap: Record<string, string> = {
    start: 'start',
    left: 'start',
    center: 'center',
    right: 'end',
    end: 'end',
  }

  const tdStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: any2px(column.width),
    justifyContent: 'center',
    alignItems: xMap[column.x] || 'start',
  }

  const titleSpanStyle = {
    padding: getPadding.value,
    display: 'flex',
    alignItems: 'center',
    justifyContent: xMap[column.x],
    width: any2px(column.width),
    height: '100%',
    boxSizing: 'border-box',
  }

  const tdGroupStyle = {
    display: 'flex',
  }

  return h(
    'div',
    {
      class: tdClass,
      onClick: () => {
        if (column.sortable) {
          sort(column)
        }
      },
      style: tdStyle,
    },
    {
      default: () => [
        h(
          'span',
          {
            style: titleSpanStyle,
          },
          {
            default: () => [
              h(
                'span',
                {
                  class: 'lew-table-title-span',
                },
                {
                  default: () => [
                    column?.title,
                    column.sortable
                    && h(SortIcon, {
                      'sort-value': sortValue.value[column.field],
                      'size': props.size,
                      'class': 'lew-table-sorter',
                    }),
                  ],
                },
              ),
            ],
          },
        ),
        column?.children && column.children.length > 0
          ? h(
              'div',
              {
                class: 'lew-table-td-group',
                style: tdGroupStyle,
              },
              {
                default: () =>
                  column.children.map((child: any) => readerHeaderTd({ column: child })),
              },
            )
          : null,
      ],
    },
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

    emit('sortChange', toRaw(cloneDeep(sortValue.value)))
  }
}

function updateScrollState() {
  if (!tableRef.value)
    return
  const element = tableRef.value
  const { clientWidth, scrollWidth, scrollLeft } = element

  if (scrollWidth === clientWidth) {
    state.hiddenScrollLine = 'all'
    return
  }
  if (scrollLeft < SCROLL_THRESHOLD) {
    state.hiddenScrollLine = 'left'
    return
  }
  if (scrollLeft + clientWidth > scrollWidth - SCROLL_THRESHOLD) {
    state.hiddenScrollLine = 'right'
    return
  }

  state.hiddenScrollLine = ''
}

function computeTableRowHeight() {
  console.log('🚀 Starting height computation...')

  nextTick(() => {
    const newTrHeightMap: Record<string, number | undefined> = {}
    const newTrPositionsMap: Record<string, any> = {}

    const allRowIds = state.dataSource.map(row => row._lew_table_tr_id)
    console.log(`Found ${allRowIds.length} rows to process`)

    allRowIds.forEach((rowId) => {
      let maxHeight = 0
      let mainHeight = 0
      let leftHeight = 0
      let rightHeight = 0

      const mainElement = trRefMap.value[rowId]
      if (mainElement) {
        const mainRect = mainElement.getBoundingClientRect()
        mainHeight = mainRect.height
        maxHeight = Math.max(maxHeight, mainHeight)
      }

      const leftElement = fixedLeftTrRefMap.value[rowId]
      if (leftElement) {
        const leftRect = leftElement.getBoundingClientRect()
        leftHeight = leftRect.height
        maxHeight = Math.max(maxHeight, leftHeight)
      }

      const rightElement = fixedRightTrRefMap.value[rowId]
      if (rightElement) {
        const rightRect = rightElement.getBoundingClientRect()
        rightHeight = rightRect.height
        maxHeight = Math.max(maxHeight, rightHeight)
      }

      console.log(
        `Row ${rowId}: main=${mainHeight}, left=${leftHeight}, right=${rightHeight}, max=${maxHeight}`,
      )
      console.log(
        `Elements found: main=${!!mainElement}, left=${!!leftElement}, right=${!!rightElement}`,
      )

      if (mainElement) {
        console.log(
          `Main element current style.height: ${
            mainElement.style.height
          }, computed height: ${getComputedStyle(mainElement).height}`,
        )
      }
      if (rightElement) {
        console.log(
          `Right element current style.height: ${
            rightElement.style.height
          }, computed height: ${getComputedStyle(rightElement).height}`,
        )
      }

      if (maxHeight > 0) {
        newTrHeightMap[rowId] = maxHeight

        const referenceElement = mainElement || leftElement || rightElement
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
    })

    state.trHeightMap = newTrHeightMap
    state.trPositionsMap = newTrPositionsMap
    console.log('✅ Height computation completed, updated state:', newTrHeightMap)

    nextTick(() => {
      console.log('🔄 Forcing re-render after height update')
    })
  })
}

const handleTableResize = throttle(() => {
  const table = tableRef.value
  if (!table)
    return

  const newScrollClientWidth = table.clientWidth
  const newIsScroll = table.scrollWidth > table.clientWidth + 5

  if (state.scrollClientWidth !== newScrollClientWidth) {
    state.scrollClientWidth = newScrollClientWidth
  }
  if (state.isScroll !== newIsScroll) {
    state.isScroll = newIsScroll
  }

  if (fixedLeftRef.value) {
    const newLeftWidth = fixedLeftRef.value.clientWidth || 0
    if (state.fixedLeftWidth !== newLeftWidth) {
      state.fixedLeftWidth = newLeftWidth
    }
  }
  if (fixedRightRef.value) {
    const newRightWidth = fixedRightRef.value.clientWidth || 0
    if (state.fixedRightWidth !== newRightWidth) {
      state.fixedRightWidth = newRightWidth
    }
  }

  const totalWidth = totalColumnWidth.value
  const newIsScrollbarVisible = totalWidth > state.scrollClientWidth
  if (state.isScrollbarVisible !== newIsScrollbarVisible) {
    state.isScrollbarVisible = newIsScrollbarVisible
  }

  state.isInitialized = true
  computeTableRowHeight()
  updateScrollState()
}, THROTTLE_DELAY)

function init() {
  nextTick(() => {
    updateScrollState()
    handleTableResize()

    if (props.checkable) {
      updateSelectedKeys(selectedKeys.value)
    }
    initDragState()
    state.dataSource = addUniqueIdToDataSource(cloneDeep(props.dataSource))
    computeTableRowHeight()
  })
}

function initDragState() {
  state.dragIndex = -1
  state.targetIndex = -1
  state.dragRowId = ''
  state.targetRowId = ''
  state.initialDragY = 0
  state.lastMouseY = 0
  state.showTooltip = false
  state.isDragging = false
}

const throttledTooltipUpdate = throttle(updateTooltipPosition, TOOLTIP_THROTTLE_DELAY)

function dragStart(event: DragEvent, row: any, index: number) {
  if (!props.sortable)
    return
  initDragState()
  computeTableRowHeight()
  state.dragIndex = index
  state.dragRowId = row._lew_table_tr_id
  state.isDragging = true
  document.body.style.cursor = 'grabbing'

  state.initialDragY = event.clientY
  state.lastMouseY = event.clientY

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'

    const canvas = document.createElement('canvas')
    event.dataTransfer.setDragImage(canvas, 0, 0)
  }

  document.body.style.userSelect = 'none'
  document.body.style.webkitUserSelect = 'none'

  state.showTooltip = true
  state.tooltipStyle = `transform: translate(calc(${event.clientX}px - 2px), calc(${event.clientY}px - 2px))`

  const tooltipCacheKey = `tooltip_${row._lew_table_tr_id}`
  if (!renderCache.has(tooltipCacheKey)) {
    const tooltipComponent = props.sortTooltipCustomRender
      ? props.sortTooltipCustomRender(row)
      : h('div', {}, `Row ${row._lew_table_tr_id}`)
    renderCache.set(tooltipCacheKey, tooltipComponent)
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
    state.tooltipStyle = `transform: translate(calc(${event.clientX}px - 2px), calc(${event.clientY}px - 2px))`
    updateDragTarget(event.clientY)
  })
}

function dragEnd() {
  const dragDistance = Math.abs(state.initialDragY - state.lastMouseY)
  document.body.style.cursor = 'default'
  if (
    state.dragRowId
    && state.targetRowId
    && state.dragRowId !== state.targetRowId
    && dragDistance >= MIN_DRAG_DISTANCE
  ) {
    const dragIndex = state.dataSource.findIndex(
      row => row._lew_table_tr_id === state.dragRowId,
    )
    const targetIndex = state.dataSource.findIndex(
      row => row._lew_table_tr_id === state.targetRowId,
    )
    if (dragIndex !== -1 && targetIndex !== -1 && dragIndex !== targetIndex) {
      const targetPosition = state.isAboveTarget ? targetIndex : targetIndex + 1

      let actualTargetPosition = targetPosition
      if (dragIndex < targetPosition) {
        actualTargetPosition--
      }

      if (actualTargetPosition !== dragIndex) {
        const newDataSource = [...state.dataSource]
        const [movedItem] = newDataSource.splice(dragIndex, 1)
        newDataSource.splice(actualTargetPosition, 0, movedItem)
        state.dataSource = newDataSource
        emit('dragSort', toRaw(newDataSource))
      }
    }
  }

  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame)
    tooltipAnimationFrame = null
  }

  document.body.style.userSelect = ''
  document.body.style.webkitUserSelect = ''

  state.dragIndex = -1
  state.targetIndex = -1
  state.dragRowId = ''
  state.targetRowId = ''
  state.initialDragY = 0
  state.lastMouseY = 0
  state.showTooltip = false
  setTimeout(() => {
    state.isDragging = false
  }, DRAG_END_DELAY)

  document.removeEventListener('mousemove', throttledTooltipUpdate)
  document.removeEventListener('mouseup', dragEnd)

  setTimeout(() => {
    computeTableRowHeight()
  }, DRAG_END_DELAY)
}

function updateDragTarget(mouseY: number) {
  state.lastMouseY = mouseY

  if (!state.dragRowId || Object.keys(state.trPositionsMap).length === 0)
    return

  const dragDistance = Math.abs(state.initialDragY - mouseY)
  const minDragDistance = 5

  if (dragDistance < minDragDistance) {
    return
  }

  let targetRowId = ''
  let isAbove = false
  const positionEntries = Object.entries(state.trPositionsMap).map(([id, pos]) => ({
    id,
    ...pos,
  }))

  positionEntries.sort((a, b) => a.top - b.top)

  for (const entry of positionEntries) {
    if (entry.id === state.dragRowId)
      continue

    const position = entry

    if (mouseY >= position.top && mouseY <= position.bottom) {
      targetRowId = position.id

      isAbove = mouseY < position.top + position.height / 2
      break
    }
  }

  if (!targetRowId) {
    for (let i = 0; i < positionEntries.length - 1; i++) {
      if (positionEntries[i].id === state.dragRowId)
        continue
      if (positionEntries[i + 1].id === state.dragRowId)
        continue

      if (mouseY > positionEntries[i].bottom && mouseY < positionEntries[i + 1].top) {
        if (mouseY - positionEntries[i].bottom < positionEntries[i + 1].top - mouseY) {
          targetRowId = positionEntries[i].id
          isAbove = false
        }
        break
      }
    }
  }

  if (!targetRowId && positionEntries.length > 0) {
    if (mouseY < positionEntries[0].top) {
      targetRowId = positionEntries[0].id
      isAbove = true
    }
    else if (mouseY > positionEntries[positionEntries.length - 1].bottom) {
      targetRowId = positionEntries[positionEntries.length - 1].id
      isAbove = false
    }
  }

  if (targetRowId) {
    state.targetRowId = targetRowId
    state.targetIndex = state.dataSource.findIndex(
      row => row._lew_table_tr_id === targetRowId,
    )
    state.isAboveTarget = isAbove
  }
}

function getIndicatorStyle() {
  if (!state.isDragging || !state.targetRowId || state.dragRowId === state.targetRowId) {
    return `
      display: none;
      transform: translateY(0);
    `
  }
  const targetPosition = state.trPositionsMap[state.targetRowId]
  if (!targetPosition)
    return 'display: none;'
  const top = state.isAboveTarget ? targetPosition.top : targetPosition.bottom
  const tableRect = tableRef.value?.getBoundingClientRect()
  const offsetTop = tableRect ? top - tableRect.top : 0
  return `
    display: block;
    transform: translateY(${offsetTop}px);
    opacity: 1;
  `
}

function addUniqueIdToDataSource(dataSource: any[]) {
  return dataSource.map((row) => {
    if (!row._lew_table_tr_id) {
      row._lew_table_tr_id = getUniqueId()
    }
    return markRaw(row)
  })
}

function getRowHeight(row: any) {
  if (!row || !row._lew_table_tr_id)
    return 'auto'
  const height = state.trHeightMap[row._lew_table_tr_id]
  const result = height ? `${height}px` : 'auto'
  if (height) {
    console.log(`getRowHeight for ${row._lew_table_tr_id}: ${result}`)
  }
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
    state.isInitialized = false
    handleTableResize()
  })

  if (props.checkable && !props.rowKey) {
    console.warn(
      '[LewTable] Invalid rowKey: "undefined". Expected: string when checkable is enabled',
    )
  }
  if (
    props.columns.some(
      (col: any) => !col.width && (!col.children || col.children.length === 0),
    )
  ) {
    console.warn(
      '[LewTable] Invalid column width: "undefined". Expected: number for every column',
    )
  }
})

onUnmounted(() => {
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame)
    tooltipAnimationFrame = null
  }
})

watch(
  () => props.dataSource,
  (newVal) => {
    clearRenderCache()
    const newDataSource = addUniqueIdToDataSource(cloneDeep(newVal))
    nextTick(() => {
      state.dataSource = newDataSource
      updateScrollState()
      handleTableResize()
      state.selectedRowsMap = mapValues(keyBy(newVal, _rowKey), () => false)
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

watch(
  () => trRefMap.value,
  () => {
    computeTableRowHeight()
  },
  {
    deep: true,
  },
)

watch(
  () => fixedLeftTrRefMap.value,
  () => {
    computeTableRowHeight()
  },
  {
    deep: true,
  },
)

watch(
  () => fixedRightTrRefMap.value,
  () => {
    computeTableRowHeight()
  },
  {
    deep: true,
  },
)

watch(
  () => props.size,
  () => {
    nextTick(() => {
      updateScrollState()
      handleTableResize()
      computeTableRowHeight()
      if (props.checkable) {
        updateSelectedKeys(selectedKeys.value)
      }
    })
  },
)
</script>

<template>
  <div ref="tableWrapperRef" class="lew-table-wrapper">
    <i
      :style="{ left: any2px(state.fixedLeftWidth) }"
      :class="getScrollLineLeftClassName"
      class="lew-table-scroll-line-left"
    />
    <i
      :style="{ right: any2px(state.fixedRightWidth) }"
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
        <div
          v-if="getFixedHeaderColumns('left').length > 0 || checkable || sortable"
          ref="fixedLeftRef"
          class="lew-table-fixed-left"
        >
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
                v-model="state.isAllChecked"
                :size="size"
                :disabled="state.dataSource.length === 0"
                :certain="hasPartialSelection && !state.isAllChecked"
                @change="setAllRowsChecked($event)"
              />
              <CommonIcon v-else :size="getIconSize" type="square-mouse-pointer" />
            </LewFlex>
            <readerHeaderTd
              v-for="(column, index) in getFixedHeaderColumns('left')"
              :key="`columns${index}`"
              :column="column"
              :x="(column.x as LewXAlignment) || 'start'"
              :y="column.y as LewYAlignment"
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
              :x="(column.x as LewXAlignment) || 'start'"
              :y="column.y as LewYAlignment"
              :style="getHeaderColumnStyle(column)"
              gap="5px"
            />
          </div>
        </div>
        <div
          v-if="getFixedHeaderColumns('right').length > 0"
          ref="fixedRightRef"
          class="lew-table-fixed-right"
        >
          <div class="lew-table-tr">
            <readerHeaderTd
              v-for="column in getFixedHeaderColumns('right')"
              :key="column.field"
              :column="column"
              class="lew-table-td"
              :class="{
                'lew-table-td-sortable': column.sortable,
              }"
              :x="(column.x as LewXAlignment) || 'start'"
              :y="column.y as LewYAlignment"
              :style="getHeaderColumnStyle(column)"
              gap="5px"
            />
          </div>
        </div>
      </div>
      <div v-if="state.dataSource.length === 0" class="lew-table-empty">
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
        v-if="state.dataSource.length > 0"
        class="lew-table-body"
        :style="`width: ${totalColumnWidth}px`"
      >
        <div
          v-if="getFixedColumns('left').length > 0 || checkable || sortable"
          class="lew-table-fixed-left"
        >
          <div
            v-for="(row, i) in state.dataSource"
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
              v-for="column in getFixedColumns('left')"
              :key="column.field"
              class="lew-table-td"
              :x="(column.x as LewXAlignment) || 'start'"
              :y="column.y as LewYAlignment"
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
            v-for="(row, i) in state.dataSource"
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
              :x="(column.x as LewXAlignment) || 'start'"
              :y="column.y as LewYAlignment"
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
        <div v-if="getFixedColumns('right').length > 0" class="lew-table-fixed-right">
          <div
            v-for="(row, i) in state.dataSource"
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
              v-for="(column, j) in getFixedColumns('right')"
              :key="`col${j}`"
              class="lew-table-td"
              :x="(column.x as LewXAlignment) || 'start'"
              :y="column.y as LewYAlignment"
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
      v-show="state.showTooltip"
      class="lew-table-drag-tooltip"
      :style="state.tooltipStyle"
    >
      <RenderComponent :render-fn="tooltipComponent" />
    </div>
  </div>
</template>

<style lang="scss">
.lew-table-wrapper {
  position: relative;
  width: 100%;
  border-bottom: 0px solid transparent;
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
    border-bottom: var(--lew-table-border);
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;
    transition: background 0.08s;
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

  .lew-table-tr:last-child {
    border-bottom: none;
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
      border-bottom: var(--lew-table-border);
      height: 100%;

      .lew-table-td {
        color: var(--lew-text-color-1);
        white-space: nowrap;
        transition: background 0.08s;
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
          transition: all 0.2s;
        }
      }

      .lew-table-td-sortable:hover {
        background: var(--lew-table-bgcolor-hover);
      }

      .lew-table-td-sortable:active {
        background: var(--lew-table-bgcolor-active);
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

.lew-table-tr-dragging {
  position: relative;
}

.lew-table-tr-dragging::after {
  position: absolute;
  content: '';
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--lew-table-tr-dragging-bgcolor);
}

.lew-table-scroll {
  overflow-x: auto;
}

.lew-table-td-group {
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  margin-left: 1px;
}

.lew-table-bordered {
  border: var(--lew-table-border);

  .lew-table-td {
    border-right: var(--lew-table-border);
  }

  .lew-table-td-group {
    border-top: var(--lew-table-border);

    .lew-table-td:last-child {
      border-right: none;
    }
  }

  .lew-table-fixed-left,
  .lew-table-fixed-right {
    .lew-table-td:last-child {
      border-right: none;
      border-left: none;
    }

    .lew-table-td:first-child {
      border-left: none;
    }
  }

  .lew-table-main {
    border-left: var(--lew-table-border);
  }
}

.lew-table-head-bordered {
  .lew-table-td {
    border-right: var(--lew-table-border);
  }

  .lew-table-td-group {
    border-top: var(--lew-table-border);

    .lew-table-td:last-child {
      border-right: none;
    }
  }

  .lew-table-fixed-left,
  .lew-table-fixed-right {
    .lew-table-td:last-child {
      border-right: none;
      border-left: none;
    }

    .lew-table-td:first-child {
      border-left: none;
    }
  }

  .lew-table-main {
    border-left: var(--lew-table-border);
  }
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

// 修改边框控制规则
.lew-table {
  box-sizing: border-box;

  &.lew-table-bordered {
    .lew-table-main {
      border-left: var(--lew-table-border);
      border-right: var(--lew-table-border);
    }

    &:not(.lew-table-has-fixed-left) {
      .lew-table-main {
        border-left: none;
      }
    }

    &:not(.lew-table-has-fixed-right) {
      .lew-table-main {
        border-right: none;
      }
    }

    .lew-table-td {
      border-right: var(--lew-table-border);
    }

    .lew-table-main {
      .lew-table-td:last-child {
        border-right: none;
      }
    }
  }

  &.lew-table-head-bordered {
    .lew-table-main {
      border-left: var(--lew-table-border);
      border-right: var(--lew-table-border);
    }

    &:not(.lew-table-has-fixed-left) {
      .lew-table-main {
        border-left: none;
      }
    }

    &:not(.lew-table-has-fixed-right) {
      .lew-table-main {
        border-right: none;
      }
    }

    .lew-table-td {
      border-right: var(--lew-table-border);
    }

    .lew-table-main {
      .lew-table-td:last-child {
        border-right: none;
      }
    }
  }
}
</style>
