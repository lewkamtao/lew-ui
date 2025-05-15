<script lang="ts" setup>
import { tableProps } from './props'
import { any2px } from 'lew-ui/utils'
import { LewFlex, LewCheckbox, LewTextTrim, LewEmpty } from 'lew-ui'
import {
  isEmpty,
  throttle,
  mapValues,
  keyBy,
  pickBy,
  difference,
  keys,
  sumBy,
  isString,
  cloneDeep
} from 'lodash-es'
import type { FlexXAlignment, FlexYAlignment, TextTrimAlignment } from 'lew-ui'
import SortIcon from './SortIcon.vue'
import { h } from 'vue'
import { isVueComponent } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'

// ==================== Props & Emits ====================
const props = defineProps(tableProps)
const selectedKeys = defineModel('selectedKeys')
const sortValue: any = defineModel('sortValue', { default: {} })
const emit = defineEmits(['sortChange', 'selectChange'])

// ==================== Refs ====================
const tableRef = ref()
const fixedLeftRef = ref()
const fixedRightRef = ref()
const trRefArr = ref<any>([])
const trHeightArr = ref<any>([])
let resizeObserver: any

// ==================== State ====================
const state = reactive({
  isInitialized: false,
  columns: [],
  hoverRowIndex: -1,
  isAllChecked: false,
  isScrollbarVisible: false,
  isScroll: false,
  scrollClientWidth: 0,
  hiddenScrollLine: 'all',
  fixedLeftWidth: 0,
  fixedRightWidth: 0,
  selectedRowsMap: {} as any
})

// ==================== Size Related Computed ====================
const getCheckableWidth = computed(() => {
  const sizeMap = {
    small: 50,
    medium: 60,
    large: 70
  }
  return sizeMap[props.size]
})

const getHeadHeight = computed(() => {
  const sizeMap = {
    small: 34,
    medium: 42,
    large: 50
  }
  return sizeMap[props.size]
})

const getFontSize = computed(() => {
  const sizeMap = {
    small: 13,
    medium: 14,
    large: 16
  }
  return sizeMap[props.size]
})

const getPadding = computed(() => {
  const paddingMap = {
    small: '8px 10px',
    medium: '10px 14px',
    large: '12px 18px'
  }
  return paddingMap[props.size]
})

const getEmptyPadding = computed(() => {
  const paddingMap = {
    small: 20,
    medium: 30,
    large: 40
  }
  return paddingMap[props.size]
})

const getEmptyProps: any = computed(() => {
  const widthMap = {
    small: 150,
    medium: 200,
    large: 250
  }
  const fontSizeMap = {
    small: 13,
    medium: 14,
    large: 16
  }
  return {
    width: widthMap[props.size],
    fontSize: fontSizeMap[props.size]
  }
})

// ==================== Column Related Computed ====================
const calculateColumnWidth = (column: any): number => {
  if (column.children && column.children.length > 0) {
    const totalChildWidth = column.children.reduce(
      (sum: number, child: any) => {
        return sum + (calculateColumnWidth(child) || 100)
      },
      0
    )
    column.width = totalChildWidth
    return totalChildWidth
  }

  if (!column.width || column.width === 0) {
    column.width = 100
  }

  return column.width
}

const processColumnsWidth = (columns: any[]) => {
  return columns.map((col) => {
    const cloneCol = { ...col }
    cloneCol.width = calculateColumnWidth(cloneCol)
    return cloneCol
  })
}

const formatColumns = computed(() => {
  return processColumnsWidth(props.columns)
})

const totalColumnWidth = computed(() => {
  let width = sumBy(formatColumns.value, 'width')
  if (props.checkable) width += getCheckableWidth.value
  return width
})

const nonFixedHeaderColumns = computed(() => {
  return formatColumns.value.filter((col) => !col.fixed)
})

const getFixedHeaderColumns = computed(() => (direction: string) => {
  return formatColumns.value.filter((col) => col.fixed === direction)
})

const getLeafColumns = (columns: any[]) => {
  const result: any[] = []
  const traverse = (cols: any[]) => {
    cols.forEach((col) => {
      if (col.children && col.children.length > 0) {
        traverse(col.children)
      } else {
        result.push(col)
      }
    })
  }
  traverse(columns)
  return result
}

const nonFixedColumns = computed(() => {
  return getLeafColumns(formatColumns.value).filter((col) => !col.fixed)
})

const getFixedColumns = computed(() => (direction: string) => {
  return getLeafColumns(formatColumns.value).filter(
    (col) => col.fixed === direction
  )
})

const columnLevel = computed(() => {
  const findMaxDepth = (columns: any[], currentDepth = 1): number => {
    if (!columns || columns.length === 0) return currentDepth

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

// ==================== Selection Related Computed & Methods ====================
const hasPartialSelection = computed(() => {
  const selectedRowsMap = state.selectedRowsMap
  return props.dataSource.some((row: any) => selectedRowsMap[row[props.rowKey]])
})

const updateAllCheckedState = () => {
  const checkedKeys = keys(pickBy(state.selectedRowsMap, Boolean))
  const allDataKeys = props.dataSource.map((row: any) =>
    String(row[props.rowKey])
  )
  const uncheckedKeys = difference(allDataKeys, checkedKeys)
  state.isAllChecked =
    isEmpty(uncheckedKeys) &&
    props.multiple &&
    props.checkable &&
    checkedKeys.length > 0
}

const setAllRowsChecked = (checked: boolean) => {
  state.selectedRowsMap = mapValues(
    keyBy(props.dataSource, props.rowKey),
    () => checked
  )
  if (props.multiple) {
    selectedKeys.value = checked ? keys(state.selectedRowsMap) : []
  }
}

const toggleRowSelection = (row: any) => {
  if (!props.checkable) return
  const rowKey = row[props.rowKey]
  const isChecked = state.selectedRowsMap[rowKey]

  if (props.multiple) {
    state.selectedRowsMap[rowKey] = !isChecked
    selectedKeys.value = keys(pickBy(state.selectedRowsMap, Boolean))
  } else {
    state.selectedRowsMap = { [rowKey]: !isChecked }
    selectedKeys.value = isChecked ? undefined : rowKey
  }
  emit('selectChange', cloneDeep(selectedKeys.value))
  updateAllCheckedState()
}

const updateSelectedKeys = (keys: any) => {
  if (props.multiple) {
    state.selectedRowsMap = mapValues(
      keyBy(props.dataSource, props.rowKey),
      () => false
    )
    keys.forEach((key: string) => {
      state.selectedRowsMap[key] = true
    })
  } else {
    state.selectedRowsMap = { [keys]: true }
  }
}

// ==================== Style Related Computed ====================
const getHeaderColumnStyle = computed(() => (column: any, row?: any) => {
  const width = column.width
  const customStyle = row && row.tdStyle?.[column.field]

  const sizeStyle = `fontSize:${getFontSize.value}px;`

  if (state.isScrollbarVisible || column.fixed) {
    return `${sizeStyle};width: ${width}px;${customStyle}`
  }

  const fixedWidth =
    sumBy(
      formatColumns.value.filter((col) => col.fixed),
      'width'
    ) + (props.checkable ? getCheckableWidth.value : 0)
  const tdWidth =
    (width / (totalColumnWidth.value - fixedWidth)) *
    (state.scrollClientWidth - fixedWidth)
  return `${sizeStyle};width: ${tdWidth}px;${customStyle}`
})

const getColumnStyle = computed(() => (column: any, row?: any) => {
  const width = column.width
  const customStyle = row && row.tdStyle?.[column.field]

  const sizeStyle = `padding: ${getPadding.value}; fontSize:${getFontSize.value}px;`

  if (state.isScrollbarVisible || column.fixed) {
    return `${sizeStyle};width: ${width}px;${customStyle}`
  }

  const fixedWidth =
    sumBy(
      formatColumns.value.filter((col) => col.fixed),
      'width'
    ) + (props.checkable ? getCheckableWidth.value : 0)
  const tdWidth =
    (width / (totalColumnWidth.value - fixedWidth)) *
    (state.scrollClientWidth - fixedWidth)
  return `${sizeStyle};width: ${tdWidth}px;${customStyle}`
})

// ==================== Render Methods ====================
const showTextAndEmpty = (text: any) => {
  if (text === null || text === undefined || text === '') {
    return '-'
  } else {
    return isString(text) ? text : String(text)
  }
}

const readerHeaderTd = ({ column }: any) => {
  return h(
    'div',
    {
      class: ['lew-table-td', column.sortable ? 'lew-table-td-sortable' : ''],
      onClick: () => {
        if (column.sortable) {
          sort(column)
        }
      },
      style: `display: flex; flex-direction: column; width: ${any2px(
        column.width
      )}; justify-content: center; align-items: ${column.x || 'start'};`
    },
    [
      h(
        'span',
        {
          style: `padding: ${getPadding.value}; 
		   display: flex; align-items:center;  justify-content: ${column.x};width: ${any2px(
         column.width
       )}; height:100%; box-sizing: border-box; `
        },
        [
          h(
            'span',
            {
              class: 'lew-table-title-span'
            },
            [
              column?.title,
              column.sortable &&
                h(SortIcon, {
                  'sort-value': sortValue.value[column.field],
                  size: props.size,
                  class: 'lew-table-sorter'
                })
            ]
          )
        ]
      ),
      column?.children && column.children.length > 0
        ? h(
            'div',
            {
              class: 'lew-table-td-group',
              style: `display: flex;`
            },
            column.children.map((child: any) =>
              readerHeaderTd({ column: child })
            )
          )
        : null
    ]
  )
}

// ==================== Sort Methods ====================
const sort = (column: any) => {
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
      [column.field]: value
    }

    emit('sortChange', cloneDeep(sortValue.value))
  }
}

// ==================== Scroll & Resize Methods ====================
const updateScrollState = () => {
  const element = tableRef.value
  const { clientWidth, scrollWidth, scrollLeft } = element
  const scrollThreshold = 10

  if (scrollWidth === clientWidth) {
    state.hiddenScrollLine = 'all'
    return
  }
  if (scrollLeft < scrollThreshold) {
    state.hiddenScrollLine = 'left'
    return
  }
  if (scrollLeft + clientWidth > scrollWidth - scrollThreshold) {
    state.hiddenScrollLine = 'right'
    return
  }

  state.hiddenScrollLine = ''
}
const computeTableRowHeight = () => {
  nextTick(() => {
    ;(trRefArr.value || []).forEach(
      (element: HTMLElement | null, index: number) => {
        if (element) {
          trHeightArr.value[index] = element.getBoundingClientRect().height
        }
      }
    )
  })
}

const handleTableResize = throttle(() => {
  const table = tableRef.value

  if (!table) return
  computeTableRowHeight()

  let totalWidth = formatColumns.value.reduce(
    (sum, col) => sum + Number(col.width),
    0
  )

  if (props.checkable) {
    totalWidth += getCheckableWidth.value
  }

  if (fixedLeftRef.value) {
    state.fixedLeftWidth = fixedLeftRef.value.clientWidth || 0
  }
  if (fixedRightRef.value) {
    state.fixedRightWidth = fixedRightRef.value.clientWidth || 0
    if (table.clientHeight < table.scrollHeight) {
      state.fixedRightWidth += 6
    }
  }

  state.scrollClientWidth = table.clientWidth
  state.isScrollbarVisible = totalWidth > state.scrollClientWidth
  state.isInitialized = true
  state.isScroll = tableRef.value?.scrollWidth > tableRef.value?.clientWidth + 5
  updateScrollState()
}, 120)

const initTableObserver = () => {
  resizeObserver = new ResizeObserver(() => {
    state.isInitialized = false
    handleTableResize()
  })
  resizeObserver.observe(tableRef.value)
}

// ==================== Lifecycle Methods ====================
const init = () => {
  nextTick(() => {
    initTableObserver()
    updateScrollState()
    handleTableResize()
    if (props.checkable) {
      updateSelectedKeys(selectedKeys.value)
    }
  })
}

onMounted(() => {
  init()
})

onActivated(() => {
  init()
  if (props.checkable && !props.rowKey) {
    throw new Error(
      'LewTable error: rowKey is required when checkable is enabled!'
    )
  }
  if (
    props.columns.some(
      (col: any) => !col.width && (!col.children || col.children.length === 0)
    )
  ) {
    throw new Error('LewTable error: width must be set for every column')
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

// ==================== Watchers ====================
watch(
  () => props.dataSource,
  () => {
    state.selectedRowsMap = mapValues(
      keyBy(props.dataSource, props.rowKey),
      () => false
    )
    updateAllCheckedState()
  },
  { deep: true }
)

watch(selectedKeys, (newVal: any) => {
  if (props.checkable) {
    updateSelectedKeys(newVal)
  }
})

watch(
  () => trRefArr.value,
  () => {
    computeTableRowHeight()
  },
  {
    deep: true
  }
)

watch(
  () => props.dataSource,
  () => {
    computeTableRowHeight()
  },
  {
    deep: true
  }
)

watch(
  () => props.size,
  () => {
    nextTick(() => {
      initTableObserver()
      updateScrollState()
      handleTableResize()
      if (props.checkable) {
        updateSelectedKeys(selectedKeys.value)
      }
    })
  }
)

const renderCustomCell = ({
  row,
  column,
  index
}: {
  row: any
  column: any
  index: number
}) => {
  try {
    const customContent = column.customRender({
      row,
      column,
      index,
      text: row[column.field]
    })
    // 如果返回的是VNode或者组件，直接返回
    if (isVueComponent(customContent)) {
      return customContent
    }
    // 如果返回的是普通值，包装成文本节点
    return h('span', {}, String(customContent))
  } catch (e) {
    console.error('Error in customRender:', e)
    return h('span', {}, showTextAndEmpty(row[column.field]))
  }
}
</script>

<template>
  <div class="lew-table-wrapper">
    <i
      :style="{ left: any2px(state.fixedLeftWidth) }"
      :class="{
        'lew-hide-line-left':
          !state.isScrollbarVisible ||
          !state.isInitialized ||
          ['all', 'left'].includes(state.hiddenScrollLine)
      }"
      class="lew-table-scroll-line-left"
    />
    <i
      :style="{ right: any2px(state.fixedRightWidth) }"
      :class="{
        'lew-hide-line-right':
          !state.isScrollbarVisible ||
          !state.isInitialized ||
          ['all', 'right'].includes(state.hiddenScrollLine)
      }"
      class="lew-table-scroll-line-right"
    />
    <div class="lew-table-header">
      <slot name="table-header"></slot>
    </div>
    <div
      ref="tableRef"
      class="lew-table lew-scrollbar"
      :class="{
        'lew-table-bordered': bordered,
        'lew-table-scroll': state.isScroll
      }"
      :style="`max-height: ${any2px(maxHeight)}`"
      @scroll="updateScrollState"
      @mouseleave="state.hoverRowIndex = -1"
    >
      <div
        class="lew-table-head"
        :class="{ 'lew-table-head-bordered': columnLevel > 1 }"
        :style="{
          width: totalColumnWidth + 'px',
          height: getHeadHeight * columnLevel + columnLevel * 1 + 'px'
        }"
        @mouseenter="state.hoverRowIndex = -1"
      >
        <div
          v-if="getFixedHeaderColumns('left').length > 0 || checkable"
          ref="fixedLeftRef"
          class="lew-table-fixed-left"
        >
          <div class="lew-table-tr">
            <lew-flex
              v-if="checkable"
              class="lew-table-td"
              :style="{ width: getCheckableWidth + 'px', padding: getPadding }"
              x="center"
            >
              <lew-checkbox
                v-if="multiple"
                :size="size"
                v-model="state.isAllChecked"
                :disabled="dataSource.length === 0"
                :certain="hasPartialSelection && !state.isAllChecked"
                @change="setAllRowsChecked($event)"
              />
              <Icon v-else type="square-mouse-pointer" />
            </lew-flex>
            <readerHeaderTd
              :column="column"
              v-for="(column, index) in getFixedHeaderColumns('left')"
              :key="`columns${index}`"
              :x="(column.x as FlexXAlignment) || 'start'"
              :y="column.y as FlexYAlignment"
              :style="getHeaderColumnStyle(column)"
              gap="5"
            />
          </div>
        </div>
        <div class="lew-table-main">
          <div class="lew-table-tr">
            <readerHeaderTd
              v-for="(column, index) in nonFixedHeaderColumns"
              :column="column"
              :key="`columns${index}`"
              :x="(column.x as FlexXAlignment) || 'start'"
              :y="column.y as FlexYAlignment"
              :style="getHeaderColumnStyle(column)"
              gap="5"
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
              v-for="(column, index) in getFixedHeaderColumns('right')"
              :column="column"
              :key="`columns${index}`"
              class="lew-table-td"
              :class="{ 'lew-table-td-sortable': column.sortable }"
              :x="(column.x as FlexXAlignment) || 'start'"
              :y="column.y as FlexYAlignment"
              :style="getHeaderColumnStyle(column)"
              gap="5"
            />
          </div>
        </div>
      </div>
      <div class="lew-table-empty" v-if="dataSource.length === 0">
        <slot v-if="$slots.empty" name="empty"></slot>
        <lew-flex
          v-else
          x="center"
          y="center"
          :style="{ padding: getEmptyPadding + 'px' }"
        >
          <lew-empty v-bind="getEmptyProps" />
        </lew-flex>
      </div>
      <div
        v-if="dataSource.length > 0"
        class="lew-table-body"
        :style="`width: ${totalColumnWidth}px`"
      >
        <div
          v-if="getFixedColumns('left').length > 0 || checkable"
          class="lew-table-fixed-left"
        >
          <div
            v-for="(row, i) in dataSource"
            :key="`data${i}`"
            class="lew-table-tr"
            :class="{
              'lew-table-tr-hover': state.hoverRowIndex === i,
              'lew-table-tr-selected': state.selectedRowsMap[row[rowKey]]
            }"
            :style="{
              height: trHeightArr[i] + 'px'
            }"
            @click="toggleRowSelection(row)"
            @mouseenter="state.hoverRowIndex = i"
          >
            <lew-flex
              v-if="checkable"
              :style="{ width: getCheckableWidth + 'px' }"
              x="center"
              class="lew-table-checkbox-wrapper"
            >
              <lew-checkbox
                :size="size"
                class="lew-table-checkbox"
                :checked="state.selectedRowsMap[row[rowKey]]"
              />
            </lew-flex>
            <lew-flex
              v-for="(column, j) in getFixedColumns('left')"
              :key="`col${j}`"
              class="lew-table-td"
              :x="(column.x as FlexXAlignment) || 'start'"
              :y="column.y as FlexYAlignment"
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
                <lew-flex
                  v-if="column.type === 'text-trim'"
                  :x="column.x"
                  style="width: 100%"
                >
                  <lew-text-trim :text="showTextAndEmpty(row[column.field])" />
                </lew-flex>
                <template v-else-if="column.customRender">
                  <component
                    :is="renderCustomCell({ row, column, index: i })"
                  />
                </template>
                <template v-else>
                  {{ showTextAndEmpty(row[column.field]) }}
                </template>
              </template>
            </lew-flex>
          </div>
        </div>
        <div class="lew-table-main">
          <div
            v-for="(row, i) in dataSource"
            :key="`data${i}`"
            class="lew-table-tr"
            :ref="(e: any) => (trRefArr[i] = e)"
            :class="{
              'lew-table-tr-hover': state.hoverRowIndex === i,
              'lew-table-tr-selected': state.selectedRowsMap[row[rowKey]]
            }"
            @click="toggleRowSelection(row)"
            @mouseenter="state.hoverRowIndex = i"
          >
            <lew-flex
              v-for="(column, j) in nonFixedColumns"
              :key="`col${j}`"
              class="lew-table-td"
              :x="(column.x as FlexXAlignment) || 'start'"
              :y="column.y as FlexYAlignment"
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
                <lew-flex
                  v-if="column.type === 'text-trim'"
                  :x="column.x"
                  style="width: 100%"
                >
                  <lew-text-trim :text="showTextAndEmpty(row[column.field])" />
                </lew-flex>
                <template v-else-if="column.customRender">
                  <component
                    :is="renderCustomCell({ row, column, index: i })"
                  />
                </template>
                <template v-else>
                  {{ showTextAndEmpty(row[column.field]) }}
                </template>
              </template>
            </lew-flex>
          </div>
        </div>
        <div
          v-if="getFixedColumns('right').length > 0"
          class="lew-table-fixed-right"
        >
          <div
            v-for="(row, i) in dataSource"
            :key="`data${i}`"
            class="lew-table-tr"
            :style="{
              height: trHeightArr[i] + 'px'
            }"
            :class="{
              'lew-table-tr-hover': state.hoverRowIndex === i,
              'lew-table-tr-selected': state.selectedRowsMap[row[rowKey]]
            }"
            @mouseenter="state.hoverRowIndex = i"
          >
            <lew-flex
              v-for="(column, j) in getFixedColumns('right')"
              :key="`col${j}`"
              class="lew-table-td"
              :x="(column.x as FlexXAlignment) || 'start'"
              :y="column.y as FlexYAlignment"
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
                <lew-flex
                  v-if="column.type === 'text-trim'"
                  :x="column.x"
                  style="width: 100%"
                >
                  <lew-text-trim :text="showTextAndEmpty(row[column.field])" />
                </lew-flex>
                <template v-else-if="column.customRender">
                  <component
                    :is="renderCustomCell({ row, column, index: i })"
                  />
                </template>
                <template v-else>
                  {{ showTextAndEmpty(row[column.field]) }}
                </template>
              </template>
            </lew-flex>
          </div>
        </div>
      </div>
    </div>
    <div class="lew-table-footer">
      <slot name="table-footer"></slot>
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
    flex-grow: 1;
    transition: background 0.25s;
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
    border-bottom: 1px var(--lew-form-border-color) solid;
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

      .lew-table-td {
        color: var(--lew-text-color-1);
        white-space: nowrap;
        transition: background 0.1s;
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
          transform: translate(30px, -50%);
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

  .lew-table-checkbox-wrapper::after {
    position: absolute;
    z-index: 1;
    content: '';
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
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
</style>
