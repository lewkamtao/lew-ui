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
import type { FlexAlignment, TextTrimAlignment } from 'lew-ui'
import SortIcon from './SortIcon.vue'

const props = defineProps(tableProps)
const selectedKeys = defineModel('selectedKeys')
const sortValue: any = defineModel('sortValue', { default: {} })
const emit = defineEmits(['sortChange', 'selectChange'])
const tableRef = ref()
const fixedLeftRef = ref()
const fixedRightRef = ref()
const trRefArr = ref<any>([])
const trHeightArr = ref<any>([])

let resizeObserver: any

const state = reactive({
  isInitialized: false,
  columns: [],
  hoverRowIndex: -1,
  isAllChecked: false,
  isScrollbarVisible: false,
  scrollClientWidth: 0,
  hiddenScrollLine: 'all',
  fixedLeftWidth: 0,
  fixedRightWidth: 0,
  selectedRowsMap: {} as any
})

const totalColumnWidth = computed(() => {
  let width = sumBy(props.columns, 'width')
  if (props.checkable) width += getCheckableWidth.value
  return width
})

const nonFixedColumns = computed(() => {
  return props.columns.filter((col) => !col.fixed)
})

const getFixedColumns = computed(() => (direction: string) => {
  return props.columns.filter((col) => col.fixed === direction)
})

const hasPartialSelection = computed(() => {
  const selectedRowsMap = state.selectedRowsMap
  return props.dataSource.some((row: any) => selectedRowsMap[row[props.rowKey]])
})

const getColumnStyle = computed(() => (column: any, row?: any) => {
  const width = column.width
  const customStyle = row && row.tdStyle?.[column.field]

  const sizeStyle = `padding:${getPadding.value};fontSize:${getFontSize.value}px;`

  if (state.isScrollbarVisible || column.fixed) {
    return `${sizeStyle};width: ${width}px;${customStyle}`
  }

  const fixedWidth =
    sumBy(
      props.columns.filter((col) => col.fixed),
      'width'
    ) + (props.checkable ? getCheckableWidth.value : 0)
  const tdWidth =
    (width / (totalColumnWidth.value - fixedWidth)) *
    (state.scrollClientWidth - fixedWidth)
  return `${sizeStyle};width: ${tdWidth}px;${customStyle}`
})

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

const initTableObserver = () => {
  resizeObserver = new ResizeObserver(() => {
    state.isInitialized = false
    handleTableResize()
  })
  resizeObserver.observe(tableRef.value)
}

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

const handleTableResize = throttle(() => {
  const table = tableRef.value

  if (!table) return

  nextTick(() => {
    trRefArr.value.forEach((element: HTMLElement | null, index: number) => {
      if (element) {
        trHeightArr.value[index] = element.getBoundingClientRect().height
      }
    })
  })

  let totalWidth = props.columns.reduce(
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

  updateScrollState()
}, 250)

const setAllRowsChecked = (checked: boolean) => {
  state.selectedRowsMap = mapValues(
    keyBy(props.dataSource, props.rowKey),
    () => checked
  )
  if (props.multiple) {
    selectedKeys.value = checked ? keys(state.selectedRowsMap) : []
  }
}

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

const renderCell = ({
  column,
  row,
  index
}: {
  column: any
  row: any
  index: number
}) => {
  if (column.customRender) {
    return column.customRender({ row, column, index, text: row[column.field] })
  }
  return column.type === 'text-trim'
    ? h(LewTextTrim, {
        x: column.x as TextTrimAlignment,
        style: 'width: 100%',
        text: row[column.field]
      })
    : showTextAndEmpty(row[column.field])
}

const showTextAndEmpty = (text: any) => {
  if (text === null || text === undefined || text === '') {
    return '--'
  } else {
    return isString(text) ? text : JSON.stringify(text)
  }
}

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
  updateScrollState()
  handleTableResize()
  if (props.checkable && !props.rowKey) {
    throw new Error(
      'LewTable error: rowKey is required when checkable is enabled!'
    )
  }

  if (props.columns.some((col: any) => !col.width)) {
    throw new Error('LewTable error: width must be set for every column')
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<template>
  <div class="lew-table-wrapper">
    <i
      :style="{ left: any2px(state.fixedLeftWidth) }"
      :class="{
        'hide-line-left':
          !state.isScrollbarVisible ||
          !state.isInitialized ||
          ['all', 'left'].includes(state.hiddenScrollLine)
      }"
      class="lew-table-scroll-line-left"
    />
    <i
      :style="{ right: any2px(state.fixedRightWidth) }"
      :class="{
        'hide-line-right':
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
      :style="`max-height: ${any2px(maxHeight)}`"
      @scroll="updateScrollState"
      @mouseleave="state.hoverRowIndex = -1"
    >
      <div
        class="lew-table-head"
        :style="{
          width: totalColumnWidth + 'px',
          height: getHeadHeight + 'px'
        }"
        @mouseenter="state.hoverRowIndex = -1"
      >
        <div
          v-if="getFixedColumns('left').length > 0 || checkable"
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
              <template v-else>单选</template>
            </lew-flex>
            <lew-flex
              v-for="(column, index) in getFixedColumns('left')"
              :key="`columns${index}`"
              class="lew-table-td"
              :class="{ 'lew-table-td-sortable': column.sortable }"
              :x="(column.x as FlexAlignment) || 'start'"
              :y="column.y as FlexAlignment"
              :style="getColumnStyle(column)"
              gap="5"
              @click="sort(column)"
            >
              <span class="title-span">
                {{ column.title }}
                <sort-icon
                  v-if="column.sortable"
                  :sort-value="sortValue[column.field]"
                  :size="size"
                  class="lew-table-sorter"
                />
              </span>
            </lew-flex>
          </div>
        </div>
        <div class="lew-table-main">
          <div class="lew-table-tr">
            <lew-flex
              v-for="(column, index) in nonFixedColumns"
              :key="`columns${index}`"
              class="lew-table-td"
              :class="{ 'lew-table-td-sortable': column.sortable }"
              :x="(column.x as FlexAlignment) || 'start'"
              :y="column.y as FlexAlignment"
              :style="getColumnStyle(column)"
              gap="5"
              @click="sort(column)"
            >
              <span class="title-span">
                {{ column.title }}
                <sort-icon
                  v-if="column.sortable"
                  :sort-value="sortValue[column.field]"
                  :size="size"
                  class="lew-table-sorter"
                />
              </span>
            </lew-flex>
          </div>
        </div>
        <div
          v-if="getFixedColumns('right').length > 0"
          ref="fixedRightRef"
          class="lew-table-fixed-right"
        >
          <div class="lew-table-tr">
            <lew-flex
              v-for="(column, index) in getFixedColumns('right')"
              :key="`columns${index}`"
              class="lew-table-td"
              :class="{ 'lew-table-td-sortable': column.sortable }"
              :x="(column.x as FlexAlignment) || 'start'"
              :y="column.y as FlexAlignment"
              :style="getColumnStyle(column)"
              gap="5"
              @click="sort(column)"
            >
              <span class="title-span">
                {{ column.title }}
                <sort-icon
                  v-if="column.sortable"
                  :sort-value="sortValue[column.field]"
                  :size="size"
                  class="lew-table-sorter"
                />
              </span>
            </lew-flex>
          </div>
        </div>
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
              :x="(column.x as FlexAlignment) || 'start'"
              :y="column.y as FlexAlignment"
              :style="getColumnStyle(column, row)"
            >
              <slot
                v-if="$slots[column.field]"
                :name="column.field"
                :row="row"
                :column="column"
                :index="i"
              ></slot>
              <template v-else>
                <renderCell :column="column" :row="row" :index="i" />
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
              :x="(column.x as FlexAlignment) || 'start'"
              :y="column.y as FlexAlignment"
              :style="getColumnStyle(column, row)"
            >
              <slot
                v-if="$slots[column.field]"
                :name="column.field"
                :row="row"
                :column="column"
                :index="i"
              ></slot>
              <template v-else>
                <renderCell :column="column" :row="row" :index="i" />
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
              :x="(column.x as FlexAlignment) || 'start'"
              :y="column.y as FlexAlignment"
              :style="getColumnStyle(column, row)"
            >
              <slot
                v-if="$slots[column.field]"
                :name="column.field"
                :row="row"
                :column="column"
                :index="i"
              ></slot>
              <template v-else>
                <renderCell :column="column" :row="row" :index="i" />
              </template>
            </lew-flex>
          </div>
        </div>
      </div>
    </div>
    <div class="lew-table-footer">
      <slot name="table-footer"></slot>
    </div>
    <template v-if="dataSource.length === 0">
      <slot v-if="$slots.empty" name="empty"></slot>
      <lew-flex v-else :style="{ padding: getEmptyPadding + 'px' }">
        <lew-empty v-bind="getEmptyProps" />
      </lew-flex>
    </template>
  </div>
</template>

<style lang="scss">
.lew-table-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-bottom: 0px solid transparent;
  box-sizing: border-box;
  background-color: var(--lew-bgcolor-0);
  .lew-table-header,
  .lew-table-footer {
    position: relative;
    z-index: 999;
  }
  .lew-table-scroll-line-left {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    z-index: 90;
    width: 8px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.075),
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0)
    );
    transition: opacity 0.25s;
  }

  .lew-table-scroll-line-right {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    z-index: 90;
    width: 8px;
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.075),
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0)
    );
    transition: opacity 0.25s;
  }
  .hide-line-left,
  .hide-line-right {
    opacity: 0;
  }
}

.lew-table {
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  background-color: var(--lew-bgcolor-0);

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
    z-index: 10;
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
    background-color: var(--lew-bgcolor-0);
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
    z-index: 12;
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
      .title-span {
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
        background: var(--lew-bgcolor-2);
      }
      .lew-table-td-sortable:active {
        background: var(--lew-bgcolor-3);
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
    background-color: var(--lew-bgcolor-1);
    .lew-table-checkbox {
      .icon-checkbox-box {
        border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
      }
    }
  }
  .lew-table-tr-selected {
    background-color: var(--lew-table-tr-selected);
  }
}
</style>
