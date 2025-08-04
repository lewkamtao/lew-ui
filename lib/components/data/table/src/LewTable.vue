<script lang="ts" setup>
import type { LewXAlignment, LewYAlignment } from "lew-ui/types";
import { useResizeObserver } from "@vueuse/core";
import { LewCheckbox, LewEmpty, LewFlex, LewTextTrim } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import RenderComponent from "lew-ui/render/components/RenderComponent.vue";
import { any2px, getUniqueId } from "lew-ui/utils";
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
} from "lodash-es";
import { tableProps } from "./props";
import SortIcon from "./SortIcon.vue";

const props = defineProps(tableProps);
const emit = defineEmits(["sortChange", "selectChange", "dragSort"]);
const selectedKeys = defineModel("selectedKeys");
const sortValue: any = defineModel("sortValue", { default: {} });
const tableRef = ref();
const fixedLeftRef = ref();
const fixedRightRef = ref();
const trRefMap = ref<Record<string, HTMLElement | null>>({});
const tableWrapperRef = ref();

let tooltipAnimationFrame: number | null = null;

const state = reactive({
  isInitialized: false,
  columns: [],
  hoverRowIndex: -1,
  isAllChecked: false,
  isScrollbarVisible: false,
  isScroll: false,
  scrollClientWidth: 0,
  hiddenScrollLine: "all",
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
  dragRowId: "",
  targetRowId: "",
  tooltipComponent: null as any,
});

const getCheckableWidth = computed(() => {
  const sizeMap = {
    small: 50,
    medium: 60,
    large: 70,
  };
  return sizeMap[props.size];
});

const getDragColumnWidth = computed(() => {
  const sizeMap = {
    small: 40,
    medium: 45,
    large: 50,
  };
  return sizeMap[props.size];
});

const getHeadHeight = computed(() => {
  const sizeMap = {
    small: 34,
    medium: 38,
    large: 44,
  };
  return sizeMap[props.size];
});

const getFontSize = computed(() => {
  const sizeMap = {
    small: 13,
    medium: 14,
    large: 16,
  };
  return sizeMap[props.size];
});

const getIconSize = computed(() => {
  const sizeMap = {
    small: 15,
    medium: 16,
    large: 17,
  };
  return sizeMap[props.size];
});

const getPadding = computed(() => {
  const paddingMap = {
    small: "8px",
    medium: "10px",
    large: "12px",
  };
  return paddingMap[props.size];
});

const getEmptyPadding = computed(() => {
  const paddingMap = {
    small: 20,
    medium: 30,
    large: 40,
  };
  return paddingMap[props.size];
});

const getEmptyProps: any = computed(() => {
  const widthMap = {
    small: 150,
    medium: 200,
    large: 250,
  };
  const fontSizeMap = {
    small: 13,
    medium: 14,
    large: 16,
  };
  return {
    width: widthMap[props.size],
    fontSize: fontSizeMap[props.size],
  };
});

// 缓存列宽计算
const columnWidthCache = new Map();

function calculateColumnWidth(column: any): number {
  const cacheKey = JSON.stringify(column);
  if (columnWidthCache.has(cacheKey)) {
    return columnWidthCache.get(cacheKey);
  }

  let width;
  if (column.children && column.children.length > 0) {
    width = column.children.reduce((sum: number, child: any) => {
      return sum + (calculateColumnWidth(child) || 100);
    }, 0);
  } else {
    width = column.width || 100;
  }

  columnWidthCache.set(cacheKey, width);
  return width;
}

function processColumnsWidth(columns: any[]) {
  return columns.map((col) => {
    const cloneCol = { ...col };
    cloneCol.width = calculateColumnWidth(cloneCol);
    return cloneCol;
  });
}

// 缓存列处理结果
const processedColumns = computed(() => {
  return processColumnsWidth(props.columns);
});

// 缓存叶子节点列
const leafColumns = computed(() => {
  return getLeafColumns(processedColumns.value);
});

// 缓存非固定列
const nonFixedColumns = computed(() => {
  return leafColumns.value.filter((col) => !col.fixed);
});

// 缓存固定列
const fixedColumns = computed(() => ({
  left: leafColumns.value.filter((col) => col.fixed === "left"),
  right: leafColumns.value.filter((col) => col.fixed === "right"),
}));

// 缓存表头列
const headerColumns = computed(() => ({
  left: processedColumns.value.filter((col) => col.fixed === "left"),
  right: processedColumns.value.filter((col) => col.fixed === "right"),
  nonFixed: processedColumns.value.filter((col) => !col.fixed),
}));

// 缓存总列宽
const totalColumnWidth = computed(() => {
  let width = sumBy(processedColumns.value, "width");
  if (props.checkable) width += getCheckableWidth.value;
  if (props.sortable) width += getDragColumnWidth.value;
  return width;
});

// 缓存固定列宽度
const fixedWidths = computed(() => {
  const leftWidth = sumBy(fixedColumns.value.left, "width");
  const rightWidth = sumBy(fixedColumns.value.right, "width");
  return {
    left: leftWidth + (props.checkable ? getCheckableWidth.value : 0),
    right: rightWidth,
  };
});

// 优化列样式计算
const getColumnStyle = computed(() => {
  const sizeStyle = `padding: ${getPadding.value}; fontSize:${getFontSize.value}px;`;

  return (column: any, row?: any) => {
    const width = column.width;
    const customStyle = row && row.tdStyle?.[column.field];

    if (state.isScrollbarVisible || column.fixed) {
      return `${sizeStyle};width: ${width}px;${customStyle}`;
    }

    const tdWidth =
      (width /
        (totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right)) *
      (state.scrollClientWidth - fixedWidths.value.left - fixedWidths.value.right);
    return `${sizeStyle};width: ${tdWidth}px;${customStyle}`;
  };
});

// 优化表头列样式计算
const getHeaderColumnStyle = computed(() => {
  const sizeStyle = `fontSize:${getFontSize.value}px;`;

  return (column: any, row?: any) => {
    const width = column.width;
    const customStyle = row && row.tdStyle?.[column.field];

    if (state.isScrollbarVisible || column.fixed) {
      return `${sizeStyle};width: ${width}px;${customStyle}`;
    }

    const tdWidth =
      (width /
        (totalColumnWidth.value - fixedWidths.value.left - fixedWidths.value.right)) *
      (state.scrollClientWidth - fixedWidths.value.left - fixedWidths.value.right);
    return `${sizeStyle};width: ${tdWidth}px;${customStyle}`;
  };
});

function getLeafColumns(columns: any[]) {
  const result: any[] = [];
  const traverse = (cols: any[]) => {
    cols.forEach((col) => {
      if (col.children && col.children.length > 0) {
        traverse(col.children);
      } else {
        result.push(col);
      }
    });
  };
  traverse(columns);
  return result;
}

const hasPartialSelection = computed(() => {
  const selectedRowsMap = state.selectedRowsMap;
  return state.dataSource.some((row: any) => selectedRowsMap[row[props.rowKey]]);
});

function updateAllCheckedState() {
  const checkedKeys = keys(pickBy(state.selectedRowsMap, Boolean));
  const allDataKeys = state.dataSource.map((row: any) => String(row[props.rowKey]));
  const uncheckedKeys = difference(allDataKeys, checkedKeys);
  state.isAllChecked =
    isEmpty(uncheckedKeys) && props.multiple && props.checkable && checkedKeys.length > 0;
}

function setAllRowsChecked(checked: boolean) {
  state.selectedRowsMap = mapValues(keyBy(state.dataSource, props.rowKey), () => checked);
  if (props.multiple) {
    selectedKeys.value = checked ? keys(state.selectedRowsMap) : [];
  }
}

function toggleRowSelection(row: any) {
  if (!props.checkable) return;
  const rowKey = row[props.rowKey];
  const isChecked = state.selectedRowsMap[rowKey];

  if (props.multiple) {
    state.selectedRowsMap[rowKey] = !isChecked;
    selectedKeys.value = keys(pickBy(state.selectedRowsMap, Boolean));
  } else {
    state.selectedRowsMap = { [rowKey]: !isChecked };
    selectedKeys.value = isChecked ? undefined : rowKey;
  }
  emit("selectChange", cloneDeep(selectedKeys.value));
  updateAllCheckedState();
}

function updateSelectedKeys(keys: any) {
  if (props.multiple) {
    state.selectedRowsMap = mapValues(keyBy(state.dataSource, props.rowKey), () => false);
    keys.forEach((key: string) => {
      state.selectedRowsMap[key] = true;
    });
  } else {
    state.selectedRowsMap = { [keys]: true };
  }
}

function showTextAndEmpty(text: any) {
  if (text === null || text === undefined || text === "") {
    return "-";
  } else {
    return isString(text) ? text : String(text);
  }
}
function readerHeaderTd({ column }: any) {
  const tdClass = ["lew-table-td"];
  if (column.sortable) {
    tdClass.push("lew-table-td-sortable");
  }

  const xMap: Record<string, string> = {
    start: "start",
    left: "start",
    center: "center",
    right: "end",
    end: "end",
  };

  const tdStyle = {
    display: "flex",
    flexDirection: "column",
    width: any2px(column.width),
    justifyContent: "center",
    alignItems: xMap[column.x] || "start",
  };

  const titleSpanStyle = {
    padding: getPadding.value,
    display: "flex",
    alignItems: "center",
    justifyContent: xMap[column.x],
    width: any2px(column.width),
    height: "100%",
    boxSizing: "border-box",
  };

  const tdGroupStyle = {
    display: "flex",
  };

  return h(
    "div",
    {
      class: tdClass,
      onClick: () => {
        if (column.sortable) {
          sort(column);
        }
      },
      style: tdStyle,
    },
    {
      default: () => [
        h(
          "span",
          {
            style: titleSpanStyle,
          },
          {
            default: () => [
              h(
                "span",
                {
                  class: "lew-table-title-span",
                },
                {
                  default: () => [
                    column?.title,
                    column.sortable &&
                      h(SortIcon, {
                        "sort-value": sortValue.value[column.field],
                        size: props.size,
                        class: "lew-table-sorter",
                      }),
                  ],
                }
              ),
            ],
          }
        ),
        column?.children && column.children.length > 0
          ? h(
              "div",
              {
                class: "lew-table-td-group",
                style: tdGroupStyle,
              },
              {
                default: () =>
                  column.children.map((child: any) => readerHeaderTd({ column: child })),
              }
            )
          : null,
      ],
    }
  );
}

// ==================== Sort Methods ====================
function sort(column: any) {
  if (column.sortable) {
    let value = sortValue.value?.[column.field];

    switch (value) {
      case "desc":
        value = "asc";
        break;
      case "asc":
        value = undefined;
        break;
      default:
        value = "desc";
        break;
    }

    sortValue.value = {
      ...(sortValue.value || {}),
      [column.field]: value,
    };

    emit("sortChange", cloneDeep(sortValue.value));
  }
}

function updateScrollState() {
  const element = tableRef.value;
  const { clientWidth, scrollWidth, scrollLeft } = element;
  const scrollThreshold = 10;

  if (scrollWidth === clientWidth) {
    state.hiddenScrollLine = "all";
    return;
  }
  if (scrollLeft < scrollThreshold) {
    state.hiddenScrollLine = "left";
    return;
  }
  if (scrollLeft + clientWidth > scrollWidth - scrollThreshold) {
    state.hiddenScrollLine = "right";
    return;
  }

  state.hiddenScrollLine = "";
}

// 优化行高计算
function computeTableRowHeight() {
  nextTick(() => {
    const newTrHeightMap: Record<string, number | undefined> = {};
    const newTrPositionsMap: Record<string, any> = {};

    Object.entries(trRefMap.value).forEach(([rowId, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        newTrHeightMap[rowId] = rect.height;
        newTrPositionsMap[rowId] = {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          middle: rect.top + rect.height / 2,
        };
      }
    });

    // 批量更新状态
    state.trHeightMap = newTrHeightMap;
    state.trPositionsMap = newTrPositionsMap;
  });
}

// 优化表格大小变化处理
const handleTableResize = throttle(() => {
  const table = tableRef.value;
  if (!table) return;

  const newScrollClientWidth = table.clientWidth;
  const newIsScroll = table.scrollWidth > table.clientWidth + 5;

  // 只在必要时更新状态
  if (state.scrollClientWidth !== newScrollClientWidth) {
    state.scrollClientWidth = newScrollClientWidth;
  }
  if (state.isScroll !== newIsScroll) {
    state.isScroll = newIsScroll;
  }

  // 更新固定列宽度
  if (fixedLeftRef.value) {
    const newLeftWidth = fixedLeftRef.value.clientWidth || 0;
    if (state.fixedLeftWidth !== newLeftWidth) {
      state.fixedLeftWidth = newLeftWidth;
    }
  }
  if (fixedRightRef.value) {
    const newRightWidth = fixedRightRef.value.clientWidth || 0;
    if (state.fixedRightWidth !== newRightWidth) {
      state.fixedRightWidth = newRightWidth;
    }
  }

  // 计算是否显示滚动条
  const totalWidth = totalColumnWidth.value;
  const newIsScrollbarVisible = totalWidth > state.scrollClientWidth;
  if (state.isScrollbarVisible !== newIsScrollbarVisible) {
    state.isScrollbarVisible = newIsScrollbarVisible;
  }

  state.isInitialized = true;
  updateScrollState();
}, 120);

function init() {
  nextTick(() => {
    updateScrollState();
    handleTableResize();
    if (props.checkable) {
      updateSelectedKeys(selectedKeys.value);
    }
    initDragState();
    state.dataSource = addUniqueIdToDataSource(cloneDeep(props.dataSource));
    computeTableRowHeight();
  });
}

onMounted(() => {
  init();

  // 只在客户端环境下使用 ResizeObserver
  useResizeObserver(tableRef, () => {
    state.isInitialized = false;
    handleTableResize();
  });

  if (props.checkable && !props.rowKey) {
    throw new Error("LewTable error: rowKey is required when checkable is enabled!");
  }
  if (
    props.columns.some(
      (col: any) => !col.width && (!col.children || col.children.length === 0)
    )
  ) {
    throw new Error("LewTable error: width must be set for every column");
  }
});

onUnmounted(() => {
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame);
    tooltipAnimationFrame = null;
  }
});

watch(
  () => props.dataSource,
  (newVal) => {
    // 先计算新数据的高度
    const newDataSource = addUniqueIdToDataSource(cloneDeep(newVal));
    nextTick(() => {
      state.dataSource = newDataSource;
      // 延迟执行其他操作，让过渡动画更平滑
      updateScrollState();
      handleTableResize();
      state.selectedRowsMap = mapValues(keyBy(newVal, props.rowKey), () => false);
      updateAllCheckedState();
      initDragState();
      computeTableRowHeight();
    });
  },
  { deep: true }
);

watch(selectedKeys, (newVal: any) => {
  if (props.checkable) {
    updateSelectedKeys(newVal);
  }
});

watch(
  () => trRefMap.value,
  () => {
    computeTableRowHeight();
  },
  {
    deep: true,
  }
);

watch(
  () => props.size,
  () => {
    nextTick(() => {
      updateScrollState();
      handleTableResize();
      computeTableRowHeight();
      if (props.checkable) {
        updateSelectedKeys(selectedKeys.value);
      }
    });
  }
);

function initDragState() {
  state.dragIndex = -1;
  state.targetIndex = -1;
  state.dragRowId = "";
  state.targetRowId = "";
  state.initialDragY = 0;
  state.lastMouseY = 0;
  state.showTooltip = false;
  state.isDragging = false;
}

const throttledTooltipUpdate = throttle(updateTooltipPosition, 16);

function dragStart(event: DragEvent, row: any, index: number) {
  if (!props.sortable) return;
  initDragState();
  computeTableRowHeight();
  state.dragIndex = index;
  state.dragRowId = row._lew_table_tr_id;
  state.isDragging = true;
  document.body.style.cursor = "grabbing";

  state.initialDragY = event.clientY;
  state.lastMouseY = event.clientY;

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";

    const canvas = document.createElement("canvas");
    event.dataTransfer.setDragImage(canvas, 0, 0);
  }

  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";

  state.showTooltip = true;
  state.tooltipStyle = `transform: translate(calc(${event.clientX}px - 2px), calc(${event.clientY}px - 2px))`;
  state.tooltipComponent = props.sortTooltipCustomRender
    ? props.sortTooltipCustomRender(row)
    : h("div", {}, `Row ${row[props.rowKey]}`);
  document.addEventListener("mousemove", throttledTooltipUpdate);
  document.addEventListener("mouseup", dragEnd);
}

function updateTooltipPosition(event: MouseEvent) {
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame);
  }

  tooltipAnimationFrame = requestAnimationFrame(() => {
    state.tooltipStyle = `transform: translate(calc(${event.clientX}px - 2px), calc(${event.clientY}px - 2px))`;
    updateDragTarget(event.clientY);
  });
}

function dragEnd() {
  const dragDistance = Math.abs(state.initialDragY - state.lastMouseY);
  const minDragDistance = 10;
  document.body.style.cursor = "default";
  if (
    state.dragRowId &&
    state.targetRowId &&
    state.dragRowId !== state.targetRowId &&
    dragDistance >= minDragDistance
  ) {
    const dragIndex = state.dataSource.findIndex(
      (row) => row._lew_table_tr_id === state.dragRowId
    );
    const targetIndex = state.dataSource.findIndex(
      (row) => row._lew_table_tr_id === state.targetRowId
    );
    if (dragIndex !== -1 && targetIndex !== -1 && dragIndex !== targetIndex) {
      const targetPosition = state.isAboveTarget ? targetIndex : targetIndex + 1;

      let actualTargetPosition = targetPosition;
      if (dragIndex < targetPosition) {
        actualTargetPosition--;
      }

      if (actualTargetPosition !== dragIndex) {
        const newDataSource = [...state.dataSource];
        const [movedItem] = newDataSource.splice(dragIndex, 1);
        newDataSource.splice(actualTargetPosition, 0, movedItem);
        state.dataSource = newDataSource;
        emit("dragSort", newDataSource);
      }
    }
  }

  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame);
    tooltipAnimationFrame = null;
  }

  document.body.style.userSelect = "";
  document.body.style.webkitUserSelect = "";

  state.dragIndex = -1;
  state.targetIndex = -1;
  state.dragRowId = "";
  state.targetRowId = "";
  state.initialDragY = 0;
  state.lastMouseY = 0;
  state.showTooltip = false;
  setTimeout(() => {
    state.isDragging = false;
  }, 250);

  document.removeEventListener("mousemove", throttledTooltipUpdate);
  document.removeEventListener("mouseup", dragEnd);

  setTimeout(() => {
    computeTableRowHeight();
  }, 250);
}

function updateDragTarget(mouseY: number) {
  state.lastMouseY = mouseY;

  if (!state.dragRowId || Object.keys(state.trPositionsMap).length === 0) return;

  const dragDistance = Math.abs(state.initialDragY - mouseY);
  const minDragDistance = 5;

  if (dragDistance < minDragDistance) {
    return;
  }

  let targetRowId = "";
  let isAbove = false;
  const positionEntries = Object.entries(state.trPositionsMap).map(([id, pos]) => ({
    id,
    ...pos,
  }));

  positionEntries.sort((a, b) => a.top - b.top);

  for (const entry of positionEntries) {
    if (entry.id === state.dragRowId) continue;

    const position = entry;

    if (mouseY >= position.top && mouseY <= position.bottom) {
      targetRowId = position.id;

      isAbove = mouseY < position.top + position.height / 2;
      break;
    }
  }

  if (!targetRowId) {
    for (let i = 0; i < positionEntries.length - 1; i++) {
      if (positionEntries[i].id === state.dragRowId) continue;
      if (positionEntries[i + 1].id === state.dragRowId) continue;

      if (mouseY > positionEntries[i].bottom && mouseY < positionEntries[i + 1].top) {
        if (mouseY - positionEntries[i].bottom < positionEntries[i + 1].top - mouseY) {
          targetRowId = positionEntries[i].id;
          isAbove = false;
        } else {
          targetRowId = positionEntries[i + 1].id;
          isAbove = true;
        }
        break;
      }
    }
  }

  if (!targetRowId && positionEntries.length > 0) {
    if (mouseY < positionEntries[0].top) {
      targetRowId = positionEntries[0].id;
      isAbove = true;
    } else if (mouseY > positionEntries[positionEntries.length - 1].bottom) {
      targetRowId = positionEntries[positionEntries.length - 1].id;
      isAbove = false;
    }
  }

  if (targetRowId) {
    state.targetRowId = targetRowId;
    state.targetIndex = state.dataSource.findIndex(
      (row) => row._lew_table_tr_id === targetRowId
    );
    state.isAboveTarget = isAbove;
  }
}

function getIndicatorStyle() {
  if (!state.isDragging || !state.targetRowId || state.dragRowId === state.targetRowId) {
    return `
      display: none;
      transform: translateY(0);
    `;
  }
  const targetPosition = state.trPositionsMap[state.targetRowId];
  if (!targetPosition) return "display: none;";
  const top = state.isAboveTarget ? targetPosition.top : targetPosition.bottom;
  const tableRect = tableRef.value?.getBoundingClientRect();
  const offsetTop = tableRect ? top - tableRect.top : 0;
  return `
    display: block;
    transform: translateY(${offsetTop}px);
    opacity: 1;
  `;
}
function addUniqueIdToDataSource(dataSource: any[]) {
  return dataSource.map((row) => {
    if (!row._lew_table_tr_id) {
      row._lew_table_tr_id = getUniqueId();
    }
    return row;
  });
}
function getRowHeight(row: any) {
  if (!row || !row._lew_table_tr_id) return "auto";
  return `${state.trHeightMap[row._lew_table_tr_id] || 0}px`;
}
function setTrRef(el: HTMLElement | null, row: any) {
  if (row && row._lew_table_tr_id) {
    trRefMap.value[row._lew_table_tr_id] = el;
  }
}

// 缓存列层级
const columnLevel = computed(() => {
  const findMaxDepth = (columns: any[], currentDepth = 1): number => {
    if (!columns || columns.length === 0) return currentDepth;

    let maxDepth = currentDepth;
    for (const col of columns) {
      if (col.children && col.children.length > 0) {
        const childDepth = findMaxDepth(col.children, currentDepth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    }
    return maxDepth;
  };
  return findMaxDepth(props.columns);
});

// 获取固定表头列
const getFixedHeaderColumns = computed(() => (direction: string) => {
  return headerColumns.value[direction as keyof typeof headerColumns.value] || [];
});

// 获取固定列
const getFixedColumns = computed(() => (direction: string) => {
  return fixedColumns.value[direction as keyof typeof fixedColumns.value] || [];
});

// 获取非固定表头列
const nonFixedHeaderColumns = computed(() => headerColumns.value.nonFixed);
</script>

<template>
  <div ref="tableWrapperRef" class="lew-table-wrapper">
    <i
      :style="{ left: any2px(state.fixedLeftWidth) }"
      :class="{
        'lew-hide-line-left':
          !state.isScrollbarVisible ||
          !state.isInitialized ||
          ['all', 'left'].includes(state.hiddenScrollLine),
      }"
      class="lew-table-scroll-line-left"
    />
    <i
      :style="{ right: any2px(state.fixedRightWidth) }"
      :class="{
        'lew-hide-line-right':
          !state.isScrollbarVisible ||
          !state.isInitialized ||
          ['all', 'right'].includes(state.hiddenScrollLine),
      }"
      class="lew-table-scroll-line-right"
    />
    <div class="lew-table-header">
      <slot name="table-header" />
    </div>
    <div class="lew-table-drag-indicator" :style="getIndicatorStyle()" />
    <div
      ref="tableRef"
      class="lew-table lew-scrollbar"
      :class="{
        'lew-table-bordered': bordered,
        'lew-table-scroll': state.isScroll,
        'lew-table-dragging': state.isDragging,
        'lew-table-has-fixed-left':
          getFixedColumns('left').length > 0 || checkable || sortable,
        'lew-table-has-fixed-right': getFixedColumns('right').length > 0,
      }"
      :style="`max-height: ${any2px(maxHeight)}`"
      @scroll="updateScrollState"
      @mouseleave="state.hoverRowIndex = -1"
    >
      <div
        class="lew-table-head"
        :class="{ 'lew-table-head-bordered': columnLevel > 1 }"
        :style="{
          width: `${totalColumnWidth}px`,
          height: `${getHeadHeight * columnLevel + columnLevel * 1}px`,
        }"
        @mouseenter="state.hoverRowIndex = -1"
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
            class="lew-table-tr"
            :class="{
              'lew-table-tr-hover': state.hoverRowIndex === i && !state.isDragging,
              'lew-table-tr-dragging': state.dragIndex === i,
              'lew-table-tr-selected': state.selectedRowsMap[row[rowKey]],
            }"
            :style="{
              height: getRowHeight(row),
            }"
            @click="toggleRowSelection(row)"
            @mouseenter="state.hoverRowIndex = i"
          >
            <!-- 拖拽把手 -->
            <LewFlex
              v-if="sortable"
              :style="{ width: `${getDragColumnWidth}px` }"
              x="center"
              class="lew-table-drag-handle"
              @mousedown="dragStart($event, row, i)"
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
                :checked="state.selectedRowsMap[row[rowKey]]"
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
                  <RenderComponent
                    :render-fn="
                      column.customRender({
                        row,
                        column,
                        index: i,
                        text: row[column.field],
                      })
                    "
                  />
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
            :class="{
              'lew-table-tr-hover': state.hoverRowIndex === i && !state.isDragging,
              'lew-table-tr-dragging': state.dragIndex === i,
              'lew-table-tr-selected': state.selectedRowsMap[row[rowKey]],
            }"
            @click="toggleRowSelection(row)"
            @mouseenter="state.hoverRowIndex = i"
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
                  <RenderComponent
                    :render-fn="
                      column.customRender({
                        row,
                        column,
                        index: i,
                        text: row[column.field],
                      })
                    "
                  />
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
            class="lew-table-tr"
            :style="{
              height: getRowHeight(row),
            }"
            :class="{
              'lew-table-tr-hover': state.hoverRowIndex === i && !state.isDragging,
              'lew-table-tr-dragging': state.dragIndex === i,
              'lew-table-tr-selected': state.selectedRowsMap[row[rowKey]],
            }"
            @mouseenter="state.hoverRowIndex = i"
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
                  <RenderComponent
                    :render-fn="
                      column.customRender({
                        row,
                        column,
                        index: i,
                        text: row[column.field],
                      })
                    "
                  />
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
      <RenderComponent :render-fn="state.tooltipComponent" />
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
    flex-grow: 1;
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
  content: "";
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
  content: "";
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
