<script lang="ts" setup>
import type { LewXAlignment } from 'lew-ui/types'
import { useResizeObserver, useThrottleFn } from '@vueuse/core'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { LewCheckbox } from 'lew-ui/components/form/checkbox'
import { LewFlex } from 'lew-ui/components/general/flex'
import { LewTextTrim } from 'lew-ui/components/general/text-trim'
import { useVirtualScroll } from 'lew-ui/hooks'
import { locale } from 'lew-ui/locals'
import { any2px } from 'lew-ui/utils'
import { markRaw } from 'vue'
import { createTableLayoutState, useTableColumns } from './composables/useTableColumns'
import { useTableSelection } from './composables/useTableSelection'
import { useTableColumnSort } from './composables/useTableSort'
import { tableEmits } from './emits'
import { tableProps } from './props'
import SortIcon from './SortIcon.vue'
import { addUniqueIdToDataSource } from './utils/tableData'

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const MIN_DRAG_DISTANCE = 10
const SCROLL_THRESHOLD = 10
const THROTTLE_DELAY = 20
const TOOLTIP_THROTTLE_DELAY = 16
const DRAG_END_DELAY = 250
const VIRTUAL_AUTO_THRESHOLD = 50

const selectedKeys = defineModel('selectedKeys')
const sortValue: any = defineModel('sortValue', { default: () => ({}) })

const tableRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()
let tooltipAnimationFrame: number | null = null
const _rowKey = props.rowKey || '_lew_table_tr_id'

const layoutState = createTableLayoutState()

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
  indicatorOffset: 0,
})

const dataState = shallowReactive({
  dataSource: addUniqueIdToDataSource(props.dataSource) as any[],
  isInitializing: true,
})

const tooltipComponent = shallowRef<any>(null)
const renderCache = new Map<string, any>()
const columnWidthCache = new Map<string, number>()
const columnStyleCache = new Map<string, string>()

const {
  getHeadHeight,
  getIconSize,
  getPadding,
  getEmptyPadding,
  getMinRowHeight,
  sizeConfig,
  fixedColumns,
  headerColumns,
  displayColumns,
  totalColumnWidth,
  fixedWidths,
  getColumnStyle,
  getResolvedWidth,
  getStickyClass,
  getSpecialColumnStyle,
  getSpecialColumnClass,
  columnLevel,
} = useTableColumns({
  columns: computed(() => props.columns),
  size: computed(() => props.size),
  checkable: computed(() => props.checkable),
  sortable: computed(() => props.sortable),
  layoutState,
  columnWidthCache,
  columnStyleCache,
})

const {
  selectionState,
  focusState,
  updateAllCheckedState,
  setAllRowsChecked,
  handleHeaderCheckboxClick,
  handleRowClick,
  updateSelectedKeys,
  getRowSelectedState,
} = useTableSelection({
  props,
  emit,
  selectedKeys,
  dataSource: computed(() => dataState.dataSource),
  rowKey: _rowKey,
})

const { sort } = useTableColumnSort({
  sortValue,
  emit,
})

const isVirtualEnabled = computed(() => {
  if (props.virtual === true)
    return true
  if (props.virtual === false)
    return false
  return !!props.maxHeight && dataState.dataSource.length > VIRTUAL_AUTO_THRESHOLD
})

const dataSourceRef = computed(() => dataState.dataSource)

const estimatedContainerHeight = computed(() => {
  if (typeof props.maxHeight === 'number')
    return props.maxHeight
  if (typeof props.maxHeight === 'string') {
    const parsed = Number.parseFloat(props.maxHeight)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
})

const {
  containerRef: virtualContainerRef,
  visibleItems,
  offsetY,
  totalHeight: virtualTotalHeight,
  update: updateVirtualScroll,
} = useVirtualScroll(dataSourceRef, {
  itemSize: getMinRowHeight,
  buffer: 5,
  estimatedContainerHeight: estimatedContainerHeight.value,
})

const renderedRows = computed(() => {
  if (!isVirtualEnabled.value) {
    return dataState.dataSource.map((data, index) => ({ data, index }))
  }
  if (visibleItems.value.length > 0)
    return visibleItems.value

  // 容器尚未测量时，先按预估高度渲染首屏，避免空白
  const size = getMinRowHeight.value
  const estimateHeight = estimatedContainerHeight.value || size * 10
  const count = Math.min(
    dataState.dataSource.length,
    Math.ceil(estimateHeight / size) + 10,
  )
  return dataState.dataSource.slice(0, count).map((data, index) => ({ data, index }))
})

/** 用上下占位代替 transform，避免切断单元格 sticky */
const virtualTopSpacer = computed(() => {
  if (!isVirtualEnabled.value)
    return 0
  return offsetY.value
})

const virtualBottomSpacer = computed(() => {
  if (!isVirtualEnabled.value)
    return 0
  const renderedHeight = renderedRows.value.length * getMinRowHeight.value
  return Math.max(0, virtualTotalHeight.value - offsetY.value - renderedHeight)
})

const rowHeightPx = computed(() => `${getMinRowHeight.value}px`)

function getRowStyle() {
  // 虚拟滚动必须固定行高；普通模式仅设最小高度，允许内容撑开
  if (isVirtualEnabled.value) {
    return {
      height: rowHeightPx.value,
      minHeight: rowHeightPx.value,
    }
  }
  return {
    minHeight: rowHeightPx.value,
  }
}

function getRowClass(index: number, row: any) {
  const isFocused
    = props.focusable
      && !props.checkable
      && focusState.focusedRowsMap[row[_rowKey]]

  return {
    'lew-table-tr-dragging': dragState.dragIndex === index,
    'lew-table-tr-selected': selectionState.selectedRowsMap[row[_rowKey]],
    'lew-table-tr-focused': isFocused,
  }
}

const hasPartialSelection = computed(() => {
  const selectedRowsMap = selectionState.selectedRowsMap
  return dataState.dataSource.some((row: any) => selectedRowsMap[row[_rowKey]])
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

/** 无横向溢出时拉满容器，避免单元格撑破行宽导致右固定列错位 */
const tableContentWidth = computed(() => {
  if (layoutState.isScrollbarVisible)
    return totalColumnWidth.value
  return Math.max(totalColumnWidth.value, layoutState.scrollClientWidth || 0)
})

const getTableClass = computed(() => ({
  'lew-table-bordered': props.bordered,
  'lew-table-scroll': layoutState.isScrollbarVisible,
  'lew-table-dragging': dragState.isDragging,
  'lew-table-has-fixed-left': hasFixedLeft.value,
  'lew-table-has-fixed-right': hasFixedRight.value,
  'lew-table-virtual': isVirtualEnabled.value,
}))

function getColumnX(column: any): LewXAlignment {
  return column.x || 'start'
}

function getCellText(row: Record<string, unknown>, field: string): string {
  const value = row[field]
  if (value === null || value === undefined || value === '') {
    return '-'
  }
  return typeof value === 'string' ? value : String(value)
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

const X_ALIGN_MAP: Record<string, string> = {
  start: 'start',
  left: 'start',
  center: 'center',
  right: 'end',
  end: 'end',
}

function readerHeaderTd(headerProps: any) {
  const column = headerProps.column
  const depth = headerProps.depth ?? 1
  const hasChildren = Array.isArray(column.children) && column.children.length > 0
  // 未达最大深度的叶子：标题落在最底一行，避免中间留白像缺表头
  const spanLevels = columnLevel.value - depth + 1
  const isShallowLeaf = !hasChildren && depth > 1 && spanLevels > 1
  const tdClass = [
    ...(column.sortable
      ? ['lew-table-td', 'lew-table-td-sortable']
      : ['lew-table-td']),
  ]
  if (hasChildren)
    tdClass.push('lew-table-td-parent')

  const stickyClass = getStickyClass(column)
  for (const [key, value] of Object.entries(stickyClass)) {
    if (value)
      tdClass.push(key)
  }

  const alignItems = X_ALIGN_MAP[column.x] || 'start'
  // 与表体共用 getResolvedWidth（父级 = 子列之和），避免分组 fixed 锁宽导致错位
  const width = getResolvedWidth(column)
  const widthPx = any2px(width)
  const cellStyle: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: hasChildren ? 'flex-start' : 'center',
    alignItems: hasChildren ? 'stretch' : alignItems,
    width: widthPx,
    flex: `0 0 ${width}px`,
    boxSizing: 'border-box',
    // 分组父级不能加 padding，否则子列总宽会溢出导致表头错乱
    padding: hasChildren || isShallowLeaf ? '0' : getPadding.value,
  }
  if (layoutState.isScrollbarVisible) {
    if (column.fixed === 'left' && column._stickyLeft != null) {
      cellStyle.position = 'sticky'
      cellStyle.left = `${column._stickyLeft}px`
      cellStyle.zIndex = '4'
    }
    else if (column.fixed === 'right' && column._stickyRight != null) {
      cellStyle.position = 'sticky'
      cellStyle.right = `${column._stickyRight}px`
      cellStyle.zIndex = '4'
    }
  }

  return h(
    'div',
    {
      class: tdClass,
      onClick: column.sortable && !hasChildren ? () => sort(column) : undefined,
      style: cellStyle,
    },
    [
      h(
        'span',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: alignItems,
            width: '100%',
            boxSizing: 'border-box',
            flexShrink: '0',
            ...(hasChildren
              ? {
                  padding: getPadding.value,
                  height: any2px(getHeadHeight.value),
                }
              : isShallowLeaf
                ? {
                    padding: getPadding.value,
                    height: any2px(getHeadHeight.value),
                    marginTop: 'auto',
                    boxSizing: 'border-box',
                  }
                : {
                    height: '100%',
                  }),
          },
        },
        [
          h('span', { class: 'lew-table-title-span' }, [
            column.title,
            column.sortable
            && !hasChildren
            && h(SortIcon, {
              'sort-value': sortValue.value[column.field],
              'size': props.size,
              'class': 'lew-table-sorter',
            }),
          ]),
        ],
      ),
      hasChildren
        ? h(
            'div',
            {
              class: 'lew-table-td-group',
              style: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                flex: '1 1 auto',
                minHeight: '0',
                width: '100%',
              },
            },
            column.children.map((child: any) =>
              readerHeaderTd({ column: child, depth: depth + 1 }),
            ),
          )
        : null,
    ],
  )
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

const handleTableResize = useThrottleFn(() => {
  const table = tableRef.value
  if (!table)
    return

  const newScrollClientWidth = table.clientWidth
  // clientWidth 为 0（未挂载/不可见）时不判定为溢出，避免误开 sticky/阴影
  const newIsScroll
    = newScrollClientWidth > 0 && table.scrollWidth > newScrollClientWidth + 5

  if (layoutState.scrollClientWidth !== newScrollClientWidth) {
    layoutState.scrollClientWidth = newScrollClientWidth
    columnStyleCache.clear()
  }
  if (layoutState.isScroll !== newIsScroll) {
    layoutState.isScroll = newIsScroll
  }

  const totalWidth = totalColumnWidth.value
  const newIsScrollbarVisible
    = newScrollClientWidth > 0 && totalWidth > newScrollClientWidth
  if (layoutState.isScrollbarVisible !== newIsScrollbarVisible) {
    layoutState.isScrollbarVisible = newIsScrollbarVisible
    columnStyleCache.clear()
  }

  updateScrollState()
  if (isVirtualEnabled.value)
    updateVirtualScroll()
}, THROTTLE_DELAY)

function init() {
  nextTick(() => {
    virtualContainerRef.value = tableRef.value || null
    updateScrollState()
    handleTableResize()

    if (props.checkable) {
      updateSelectedKeys(selectedKeys.value)
    }
    initDragState()
    dataState.dataSource = addUniqueIdToDataSource(props.dataSource)

    nextTick(() => {
      dataState.isInitializing = false
      if (isVirtualEnabled.value)
        updateVirtualScroll()
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
  dragState.indicatorOffset = 0
}

const throttledTooltipUpdate = useThrottleFn(
  updateTooltipPosition,
  TOOLTIP_THROTTLE_DELAY,
)

function dragStart(event: MouseEvent, row: any, index: number) {
  if (!props.sortable)
    return

  initDragState()

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
      const targetPosition = dragState.isAboveTarget
        ? targetIndex
        : targetIndex + 1
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
  }, DRAG_END_DELAY)
}

function syncIndicatorOffset() {
  if (
    !dragState.isDragging
    || !dragState.targetRowId
    || dragState.dragRowId === dragState.targetRowId
    || dragState.targetIndex < 0
  ) {
    dragState.indicatorOffset = 0
    return
  }

  const wrapper = wrapperRef.value
  const table = tableRef.value
  if (!wrapper || !table) {
    dragState.indicatorOffset = 0
    return
  }

  const wrapperRect = wrapper.getBoundingClientRect()
  const targetEl = table.querySelector<HTMLElement>(
    `.lew-table-body .lew-table-tr[data-row-id="${dragState.targetRowId}"]`,
  )

  if (targetEl) {
    const rowRect = targetEl.getBoundingClientRect()
    const lineY = dragState.isAboveTarget ? rowRect.top : rowRect.bottom
    dragState.indicatorOffset = lineY - wrapperRect.top
    return
  }

  const tableRect = table.getBoundingClientRect()
  const headHeight = getHeadHeight.value * columnLevel.value + columnLevel.value
  const rowHeight = getMinRowHeight.value
  const lineY = dragState.isAboveTarget
    ? dragState.targetIndex * rowHeight
    : (dragState.targetIndex + 1) * rowHeight
  const offsetInTable = headHeight + lineY - table.scrollTop
  dragState.indicatorOffset = tableRect.top - wrapperRect.top + offsetInTable
}

function updateDragTarget(mouseY: number) {
  dragState.lastMouseY = mouseY
  if (!dragState.dragRowId || !tableRef.value)
    return

  const dragDistance = Math.abs(dragState.initialDragY - mouseY)
  if (dragDistance < 5)
    return

  const table = tableRef.value
  const rowEls = table.querySelectorAll<HTMLElement>('.lew-table-body .lew-table-tr[data-row-id]')

  // 优先用可见行 DOM 命中（兼容动态行高 / 虚拟滚动可视区）
  if (rowEls.length > 0) {
    let hit:
      | {
        id: string
        index: number
        isAbove: boolean
      }
      | null = null

    for (const el of rowEls) {
      const id = el.dataset.rowId
      if (!id || id === dragState.dragRowId)
        continue

      const rect = el.getBoundingClientRect()
      if (mouseY >= rect.top && mouseY <= rect.bottom) {
        const index = dataState.dataSource.findIndex(
          row => row._lew_table_tr_id === id,
        )
        if (index < 0)
          continue
        hit = {
          id,
          index,
          isAbove: mouseY < rect.top + rect.height / 2,
        }
        break
      }
    }

    // 落在行间隙或可视区外时，取最近行
    if (!hit) {
      let bestDistance = Infinity
      for (const el of rowEls) {
        const id = el.dataset.rowId
        if (!id || id === dragState.dragRowId)
          continue
        const rect = el.getBoundingClientRect()
        const middle = rect.top + rect.height / 2
        const distance = Math.abs(mouseY - middle)
        if (distance < bestDistance) {
          const index = dataState.dataSource.findIndex(
            row => row._lew_table_tr_id === id,
          )
          if (index < 0)
            continue
          bestDistance = distance
          hit = {
            id,
            index,
            isAbove: mouseY < middle,
          }
        }
      }
    }

    if (hit) {
      dragState.targetRowId = hit.id
      dragState.targetIndex = hit.index
      dragState.isAboveTarget = hit.isAbove
      syncIndicatorOffset()
      return
    }
  }

  // 回退：固定行高估算（虚拟滚动空白占位区域）
  const tableRect = table.getBoundingClientRect()
  const headHeight = getHeadHeight.value * columnLevel.value + columnLevel.value
  const relativeY = mouseY - tableRect.top + table.scrollTop - headHeight
  const rowHeight = getMinRowHeight.value
  const length = dataState.dataSource.length
  if (length === 0 || rowHeight <= 0)
    return

  let index = Math.floor(relativeY / rowHeight)
  index = Math.max(0, Math.min(index, length - 1))
  const rowTop = index * rowHeight
  const isAbove = relativeY < rowTop + rowHeight / 2
  const targetRow = dataState.dataSource[index]
  if (!targetRow || targetRow._lew_table_tr_id === dragState.dragRowId)
    return

  dragState.targetRowId = targetRow._lew_table_tr_id
  dragState.targetIndex = index
  dragState.isAboveTarget = isAbove
  syncIndicatorOffset()
}

function getIndicatorStyle(): string {
  if (
    !dragState.isDragging
    || !dragState.targetRowId
    || dragState.dragRowId === dragState.targetRowId
    || dragState.targetIndex < 0
  ) {
    return 'display: none; transform: translateY(0);'
  }

  return `display: block; transform: translateY(${dragState.indicatorOffset}px); opacity: 1;`
}

function handleTableScroll() {
  updateScrollState()
  if (dragState.isDragging && dragState.lastMouseY) {
    updateDragTarget(dragState.lastMouseY)
    syncIndicatorOffset()
  }
}

onMounted(() => {
  init()

  useResizeObserver(tableRef, () => {
    handleTableResize()
  })
})

watch(tableRef, (el) => {
  virtualContainerRef.value = el || null
})

onUnmounted(() => {
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame)
    tooltipAnimationFrame = null
  }
  renderCache.clear()
  columnWidthCache.clear()
  columnStyleCache.clear()
})

watch(
  () => props.dataSource,
  (newVal) => {
    clearRenderCache()
    columnStyleCache.clear()

    const newDataSource = addUniqueIdToDataSource(newVal)
    dataState.dataSource = newDataSource
    nextTick(() => {
      updateScrollState()
      handleTableResize()

      const newMap: Record<string, boolean> = {}
      for (const row of newVal) {
        newMap[row[_rowKey]] = false
      }
      selectionState.selectedRowsMap = newMap
      updateAllCheckedState()
      initDragState()
      if (isVirtualEnabled.value)
        updateVirtualScroll()
    })
  },
)

watch(selectedKeys, (newVal: any) => {
  if (props.checkable) {
    updateSelectedKeys(newVal)
  }
})

watch(
  () => props.size,
  () => {
    columnStyleCache.clear()

    nextTick(() => {
      updateScrollState()
      handleTableResize()
      if (isVirtualEnabled.value)
        updateVirtualScroll()
      if (props.checkable) {
        updateSelectedKeys(selectedKeys.value)
      }
    })
  },
)

watch(isVirtualEnabled, () => {
  nextTick(() => {
    virtualContainerRef.value = tableRef.value || null
    updateVirtualScroll()
  })
})
</script>

<template>
  <div ref="wrapperRef" class="lew-table-wrapper">
    <i
      :style="{ left: any2px(fixedWidths.left) }"
      :class="getScrollLineLeftClassName"
      class="lew-table-scroll-line-left"
    />
    <i
      :style="{ right: any2px(fixedWidths.right) }"
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
      @scroll="handleTableScroll"
    >
      <div
        class="lew-table-head"
        :class="{ 'lew-table-head-bordered': columnLevel > 1 }"
        :style="{
          width: `${tableContentWidth}px`,
          height: `${getHeadHeight * columnLevel + columnLevel * 1}px`,
        }"
      >
        <div class="lew-table-tr">
          <div
            v-if="sortable"
            :class="getSpecialColumnClass('drag')"
            :style="getSpecialColumnStyle('drag')"
          >
            <CommonIcon :size="getIconSize" type="grip-vertical" />
          </div>
          <div
            v-if="checkable"
            :class="[
              getSpecialColumnClass('checkbox'),
              { 'lew-table-checkbox-wrapper--static': !multiple },
            ]"
            :style="getSpecialColumnStyle('checkbox')"
            @click.stop="handleHeaderCheckboxClick"
          >
            <LewCheckbox
              v-if="multiple"
              v-model="selectionState.isAllChecked"
              :size="size"
              :disabled="dataState.dataSource.length === 0"
              :certain="hasPartialSelection && !selectionState.isAllChecked"
            />
            <CommonIcon
              v-else
              :size="getIconSize"
              type="square-mouse-pointer"
            />
          </div>
          <readerHeaderTd
            v-for="(column, index) in headerColumns.all"
            :key="column.field || `header-${index}`"
            :column="column"
          />
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
          <span
            class="lew-table-empty-text"
            :style="{
              fontSize: any2px(sizeConfig.fontSize),
              maxWidth: any2px(sizeConfig.emptyWidth),
            }"
          >
            {{ locale.t('empty.title') }}
          </span>
        </LewFlex>
      </div>
      <div
        v-if="dataState.dataSource.length > 0"
        class="lew-table-body"
        :style="{ width: `${tableContentWidth}px` }"
      >
        <div
          v-if="isVirtualEnabled && virtualTopSpacer > 0"
          class="lew-table-virtual-spacer"
          :style="{ height: `${virtualTopSpacer}px` }"
        />
        <div
          v-for="{ data: row, index: i } in renderedRows"
          :key="row._lew_table_tr_id"
          class="lew-table-tr"
          :class="[
            getRowClass(i, row),
            { 'lew-table-tr-last': i === dataState.dataSource.length - 1 },
          ]"
          :data-row-id="row._lew_table_tr_id"
          :style="getRowStyle()"
          @click="handleRowClick(row)"
        >
          <div
            v-if="sortable"
            :class="getSpecialColumnClass('drag')"
            :style="getSpecialColumnStyle('drag')"
            @mousedown.stop="dragStart($event, row, i)"
          >
            <CommonIcon
              :size="getIconSize"
              type="grip-vertical"
              class="lew-table-drag-icon"
            />
          </div>
          <div
            v-if="checkable"
            :class="getSpecialColumnClass('checkbox')"
            :style="getSpecialColumnStyle('checkbox')"
          >
            <LewCheckbox
              :size="size"
              class="lew-table-checkbox"
              :checked="getRowSelectedState(row)"
            />
          </div>
          <div
            v-for="column in displayColumns"
            :key="column.field"
            class="lew-table-td"
            :class="[
              getStickyClass(column),
              {
                'lew-table-td-align-start': getColumnX(column) === 'start' || getColumnX(column) === 'left',
                'lew-table-td-align-center': getColumnX(column) === 'center',
                'lew-table-td-align-end': getColumnX(column) === 'end' || getColumnX(column) === 'right',
              },
            ]"
            :style="getColumnStyle(column, row)"
          >
            <template v-if="$slots[column.field]">
              <slot
                :name="column.field"
                :row="row"
                :column="column"
                :index="i"
              />
            </template>
            <template v-else>
              <LewFlex
                v-if="column.type === 'text-trim'"
                :x="column.x"
                style="width: 100%"
              >
                <LewTextTrim :text="getCellText(row, column.field)" />
              </LewFlex>
              <template v-else-if="column.customRender">
                <RenderComponent
                  :render-fn="getCachedRenderResult(column, row)"
                />
              </template>
              <template v-else>
                {{ getCellText(row, column.field) }}
              </template>
            </template>
          </div>
        </div>
        <div
          v-if="isVirtualEnabled && virtualBottomSpacer > 0"
          class="lew-table-virtual-spacer"
          :style="{ height: `${virtualBottomSpacer}px` }"
        />
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
  box-sizing: border-box;

  .lew-table-head {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 15;
    box-sizing: border-box;
  }

  .lew-table-body {
    position: relative;
    width: 100%;
  }

  .lew-table-virtual-spacer {
    width: 100%;
    flex-shrink: 0;
    pointer-events: none;
  }

  .lew-table-tr {
    display: flex;
    align-items: stretch;
    background-color: var(--lew-table-bgcolor);
    width: 100%;
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
  }

  // 拖拽中关闭行 hover；focus/selected 不被 hover 覆盖
  &:not(.lew-table-dragging) .lew-table-tr:hover:not(.lew-table-tr-focused):not(
    .lew-table-tr-selected
  ) {
    background-color: var(--lew-table-tr-hover-bgcolor);

    .lew-table-td-sticky {
      background-color: var(--lew-table-tr-hover-bgcolor);
    }

    .lew-table-checkbox {
      .lew-checkbox-icon-box {
        border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
      }
    }
  }

  .lew-table-td {
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    flex: 0 0 auto;
    min-width: 0;
    color: var(--lew-text-color-1);
  }

  // 虚拟滚动时在单元格内裁切超高内容；不要给 tr 设 overflow，否则会切断 sticky
  &.lew-table-virtual {
    .lew-table-td {
      overflow: hidden;
    }
  }

  .lew-table-td-align-start {
    justify-content: flex-start;
  }

  .lew-table-td-align-center {
    justify-content: center;
  }

  .lew-table-td-align-end {
    justify-content: flex-end;
  }

  .lew-table-td-sticky {
    background-color: var(--lew-table-bgcolor);
  }

  .lew-table-td-special,
  .lew-table-checkbox-wrapper,
  .lew-table-drag-handle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0;
    flex-shrink: 0;
  }

  .lew-table-head {
    .lew-table-tr {
      background-color: var(--lew-table-header-bgcolor);
      flex-shrink: 0;
      height: 100%;

      &:hover {
        background-color: var(--lew-table-header-bgcolor);

        .lew-table-td-sticky {
          background-color: var(--lew-table-header-bgcolor);
        }
      }

      .lew-table-td {
        color: var(--lew-text-color-1);
        white-space: nowrap;
      }

      .lew-table-td-sticky {
        background-color: var(--lew-table-header-bgcolor);
      }

      .lew-table-td-special {
        background-color: var(--lew-table-header-bgcolor);
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

  .lew-table-checkbox-wrapper {
    position: relative;
    cursor: pointer;

    // 单选模式表头仅为示意图标，不可点击
    &--static {
      cursor: default;

      &::after {
        cursor: default;
        pointer-events: none;
      }
    }
  }

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

  .lew-table-tr-selected {
    background-color: var(--lew-color-primary-light);

    .lew-table-td-sticky {
      background-color: var(--lew-color-primary-light);
    }
  }

  .lew-table-tr-focused {
    background-color: var(--lew-table-tr-focused-bgcolor);

    .lew-table-td-sticky {
      background-color: var(--lew-table-tr-focused-bgcolor);
    }
  }

  .lew-table-empty {
    position: sticky;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .lew-table-empty-text {
      color: var(--lew-text-color-5);
      text-align: center;
      line-height: 1.5;
    }
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
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  box-sizing: border-box;
}

.lew-table-checkbox-wrapper::after {
  position: absolute;
  z-index: 1;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // 扩大整格点击热区；点击落在 wrapper 上（表头全选 / 表体行选）
  cursor: pointer;
}

.lew-table {
  // 行边界画在单元格上，避免 sticky 背景盖住 tr::after
  .lew-table-head .lew-table-tr {
    // 分组父级自身不画底边，由子级叶子列和 td-group 承担
    .lew-table-td:not(.lew-table-td-parent) {
      border-bottom: var(--lew-table-border);
    }
  }

  .lew-table-body .lew-table-tr {
    .lew-table-td {
      border-bottom: var(--lew-table-border);
    }

    &.lew-table-tr-last .lew-table-td {
      border-bottom: none;
    }
  }

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

  &.lew-table-bordered {
    border: var(--lew-table-border);

    .lew-table-td {
      border-right: var(--lew-table-border);
    }

    .lew-table-tr > .lew-table-td:last-child {
      border-right: none;
    }
  }

  &.lew-table-head-bordered {
    .lew-table-head {
      .lew-table-td {
        border-right: var(--lew-table-border);
      }

      .lew-table-tr > .lew-table-td:last-child {
        border-right: none;
      }
    }
  }

  .lew-table-tr-dragging {
    // 不能用行级 opacity（会切断 sticky），改为单元格自身淡化
    .lew-table-td {
      opacity: 0.4;
      // 顶边随单元格一起淡化（行只画 border-bottom，顶线本属上一行）
      box-shadow: inset 0 1px 0 var(--lew-table-border-color);
    }
  }

  // 去掉上一行未淡化的底边，避免拖拽行顶线仍是实线
  .lew-table-tr:has(+ .lew-table-tr-dragging) .lew-table-td {
    border-bottom-color: transparent;
  }

  // 拖的是首行时，顶线来自表头底边
  &:has(
    .lew-table-body > .lew-table-tr-dragging:first-child,
    .lew-table-body > .lew-table-virtual-spacer:first-child + .lew-table-tr-dragging
  )
    .lew-table-head
    .lew-table-td:not(.lew-table-td-parent) {
    border-bottom-color: transparent;
  }
}
</style>
