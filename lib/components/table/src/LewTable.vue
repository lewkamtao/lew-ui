<script lang="ts" setup>
import { tableProps } from "./props";
import { any2px } from "lew-ui/utils";
import { LewFlex, LewCheckbox, LewTextTrim, LewEmpty } from "lew-ui";
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
  cloneDeep,
} from "lodash-es";
import type { FlexXAlignment, FlexYAlignment } from "lew-ui";
import SortIcon from "./SortIcon.vue";
import { h } from "vue";
import { isVueComponent, getUniqueId } from "lew-ui/utils";
import Icon from "lew-ui/utils/Icon.vue";

// ==================== Props & Emits ====================
const props = defineProps(tableProps);
const selectedKeys = defineModel("selectedKeys");
const sortValue: any = defineModel("sortValue", { default: {} });
const emit = defineEmits(["sortChange", "selectChange", "sortOrderChange"]);

// ==================== Refs ====================
const tableRef = ref();
const fixedLeftRef = ref();
const fixedRightRef = ref();
const trRefMap = ref<Record<string, HTMLElement | null>>({});
let resizeObserver: any;
// 新增动画帧引用
let tooltipAnimationFrame: number | null = null;

// ==================== State ====================
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
  // 拖拽排序相关
  dragIndex: -1,
  targetIndex: -1,
  isDragging: false,
  showTooltip: false,
  tooltipStyle: ``,
  // 克隆的数据源
  dataSource: [] as any[],
  // 表格容器的位置信息，使用Map存储
  trPositionsMap: {} as Record<string, any>,
  trHeightMap: {} as Record<string, number | undefined>,
  isAboveTarget: false,
  initialDragY: 0 as number,
  lastMouseY: 0 as number,
  // 拖拽的行ID
  dragRowId: "",
  targetRowId: "",
  tooltipComponent: null as any,
});

// ==================== Size Related Computed ====================
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
    medium: 42,
    large: 50,
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

const getPadding = computed(() => {
  const paddingMap = {
    small: "8px 10px",
    medium: "10px 14px",
    large: "12px 18px",
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

// ==================== Column Related Computed ====================
const calculateColumnWidth = (column: any): number => {
  if (column.children && column.children.length > 0) {
    const totalChildWidth = column.children.reduce(
      (sum: number, child: any) => {
        return sum + (calculateColumnWidth(child) || 100);
      },
      0
    );
    column.width = totalChildWidth;
    return totalChildWidth;
  }

  if (!column.width || column.width === 0) {
    column.width = 100;
  }

  return column.width;
};

const processColumnsWidth = (columns: any[]) => {
  return columns.map((col) => {
    const cloneCol = { ...col };
    cloneCol.width = calculateColumnWidth(cloneCol);
    return cloneCol;
  });
};

const formatColumns = computed(() => {
  return processColumnsWidth(props.columns);
});

const totalColumnWidth = computed(() => {
  let width = sumBy(formatColumns.value, "width");
  if (props.checkable) width += getCheckableWidth.value;
  if (props.sortable) width += getDragColumnWidth.value;
  return width;
});

const nonFixedHeaderColumns = computed(() => {
  return formatColumns.value.filter((col) => !col.fixed);
});

const getFixedHeaderColumns = computed(() => (direction: string) => {
  return formatColumns.value.filter((col) => col.fixed === direction);
});

const getLeafColumns = (columns: any[]) => {
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
};

const nonFixedColumns = computed(() => {
  return getLeafColumns(formatColumns.value).filter((col) => !col.fixed);
});

const getFixedColumns = computed(() => (direction: string) => {
  return getLeafColumns(formatColumns.value).filter(
    (col) => col.fixed === direction
  );
});

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

// ==================== Selection Related Computed & Methods ====================
const hasPartialSelection = computed(() => {
  const selectedRowsMap = state.selectedRowsMap;
  return state.dataSource.some(
    (row: any) => selectedRowsMap[row[props.rowKey]]
  );
});

const updateAllCheckedState = () => {
  const checkedKeys = keys(pickBy(state.selectedRowsMap, Boolean));
  const allDataKeys = state.dataSource.map((row: any) =>
    String(row[props.rowKey])
  );
  const uncheckedKeys = difference(allDataKeys, checkedKeys);
  state.isAllChecked =
    isEmpty(uncheckedKeys) &&
    props.multiple &&
    props.checkable &&
    checkedKeys.length > 0;
};

const setAllRowsChecked = (checked: boolean) => {
  state.selectedRowsMap = mapValues(
    keyBy(state.dataSource, props.rowKey),
    () => checked
  );
  if (props.multiple) {
    selectedKeys.value = checked ? keys(state.selectedRowsMap) : [];
  }
};

const toggleRowSelection = (row: any) => {
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
};

const updateSelectedKeys = (keys: any) => {
  if (props.multiple) {
    state.selectedRowsMap = mapValues(
      keyBy(state.dataSource, props.rowKey),
      () => false
    );
    keys.forEach((key: string) => {
      state.selectedRowsMap[key] = true;
    });
  } else {
    state.selectedRowsMap = { [keys]: true };
  }
};

// ==================== Style Related Computed ====================
const getHeaderColumnStyle = computed(() => (column: any, row?: any) => {
  const width = column.width;
  const customStyle = row && row.tdStyle?.[column.field];

  const sizeStyle = `fontSize:${getFontSize.value}px;`;

  if (state.isScrollbarVisible || column.fixed) {
    return `${sizeStyle};width: ${width}px;${customStyle}`;
  }

  const fixedWidth =
    sumBy(
      formatColumns.value.filter((col) => col.fixed),
      "width"
    ) + (props.checkable ? getCheckableWidth.value : 0);
  const tdWidth =
    (width / (totalColumnWidth.value - fixedWidth)) *
    (state.scrollClientWidth - fixedWidth);
  return `${sizeStyle};width: ${tdWidth}px;${customStyle}`;
});

const getColumnStyle = computed(() => (column: any, row?: any) => {
  const width = column.width;
  const customStyle = row && row.tdStyle?.[column.field];

  const sizeStyle = `padding: ${getPadding.value}; fontSize:${getFontSize.value}px;`;

  if (state.isScrollbarVisible || column.fixed) {
    return `${sizeStyle};width: ${width}px;${customStyle}`;
  }

  const fixedWidth =
    sumBy(
      formatColumns.value.filter((col) => col.fixed),
      "width"
    ) + (props.checkable ? getCheckableWidth.value : 0);
  const tdWidth =
    (width / (totalColumnWidth.value - fixedWidth)) *
    (state.scrollClientWidth - fixedWidth);
  return `${sizeStyle};width: ${tdWidth}px;${customStyle}`;
});

// ==================== Render Methods ====================
const showTextAndEmpty = (text: any) => {
  if (text === null || text === undefined || text === "") {
    return "-";
  } else {
    return isString(text) ? text : String(text);
  }
};

const readerHeaderTd = ({ column }: any) => {
  return h(
    "div",
    {
      class: ["lew-table-td", column.sortable ? "lew-table-td-sortable" : ""],
      onClick: () => {
        if (column.sortable) {
          sort(column);
        }
      },
      style: `display: flex; flex-direction: column; width: ${any2px(
        column.width
      )}; justify-content: center; align-items: ${column.x || "start"};`,
    },
    [
      h(
        "span",
        {
          style: `padding: ${getPadding.value}; 
		   display: flex; align-items:center;  justify-content: ${
         column.x
       };width: ${any2px(column.width)}; height:100%; box-sizing: border-box; `,
        },
        [
          h(
            "span",
            {
              class: "lew-table-title-span",
            },
            [
              column?.title,
              column.sortable &&
                h(SortIcon, {
                  "sort-value": sortValue.value[column.field],
                  size: props.size,
                  class: "lew-table-sorter",
                }),
            ]
          ),
        ]
      ),
      column?.children && column.children.length > 0
        ? h(
            "div",
            {
              class: "lew-table-td-group",
              style: `display: flex;`,
            },
            column.children.map((child: any) =>
              readerHeaderTd({ column: child })
            )
          )
        : null,
    ]
  );
};

// ==================== Sort Methods ====================
const sort = (column: any) => {
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
};

// ==================== Scroll & Resize Methods ====================
const updateScrollState = () => {
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
};

const computeTableRowHeight = () => {
  nextTick(() => {
    // 使用Object.entries遍历trRefMap
    Object.entries(trRefMap.value).forEach(([rowId, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();

        // 使用行的唯一ID作为键存储高度信息
        state.trHeightMap[rowId] = rect.height;

        // 使用行的唯一ID作为键存储位置信息
        state.trPositionsMap[rowId] = {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          middle: rect.top + rect.height / 2,
        };
      }
    });
  });
};

const handleTableResize = throttle(() => {
  const table = tableRef.value;

  if (!table) return;
  computeTableRowHeight();

  let totalWidth = formatColumns.value.reduce(
    (sum, col) => sum + Number(col.width),
    0
  );

  if (props.checkable) {
    totalWidth += getCheckableWidth.value;
  }

  if (fixedLeftRef.value) {
    state.fixedLeftWidth = fixedLeftRef.value.clientWidth || 0;
  }
  if (fixedRightRef.value) {
    state.fixedRightWidth = fixedRightRef.value.clientWidth || 0;
    if (table.clientHeight < table.scrollHeight) {
      state.fixedRightWidth += 6;
    }
  }

  state.scrollClientWidth = table.clientWidth;
  state.isScrollbarVisible = totalWidth > state.scrollClientWidth;
  state.isInitialized = true;
  state.isScroll =
    tableRef.value?.scrollWidth > tableRef.value?.clientWidth + 5;
  updateScrollState();
}, 120);

const initTableObserver = () => {
  resizeObserver = new ResizeObserver(() => {
    state.isInitialized = false;
    handleTableResize();
  });
  resizeObserver.observe(tableRef.value);
};

// ==================== Lifecycle Methods ====================
const init = () => {
  nextTick(() => {
    initTableObserver();
    updateScrollState();
    handleTableResize();
    if (props.checkable) {
      updateSelectedKeys(selectedKeys.value);
    }
    // 初始化克隆的数据源，并添加唯一ID
    initDragState();
    state.dataSource = addUniqueIdToDataSource(cloneDeep(props.dataSource));
    // 确保计算行高和位置
    computeTableRowHeight();
  });
};

onMounted(() => {
  init();
});

onActivated(() => {
  init();
  if (props.checkable && !props.rowKey) {
    throw new Error(
      "LewTable error: rowKey is required when checkable is enabled!"
    );
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
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  // 清理任何挂起的动画帧
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame);
    tooltipAnimationFrame = null;
  }
});

// ==================== Watchers ====================
watch(
  () => props.dataSource,
  (newVal) => {
    // 当props.dataSource变化时，更新克隆的数据源，并添加唯一ID
    state.dataSource = addUniqueIdToDataSource(cloneDeep(newVal));
    state.selectedRowsMap = mapValues(keyBy(newVal, props.rowKey), () => false);
    updateAllCheckedState();
    initDragState();
    state.trPositionsMap = {};
    state.trHeightMap = {};
    trRefMap.value = {};
    computeTableRowHeight();
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
    computeTableRowHeight(); // 使用防抖版本
  },
  {
    deep: true,
  }
);

watch(
  () => props.size,
  () => {
    nextTick(() => {
      initTableObserver();
      updateScrollState();
      handleTableResize();
      if (props.checkable) {
        updateSelectedKeys(selectedKeys.value);
      }
    });
  }
);

const renderCustomCell = ({
  row,
  column,
  index,
}: {
  row: any;
  column: any;
  index: number;
}) => {
  try {
    const customContent = column.customRender({
      row,
      column,
      index,
      text: row[column.field],
    });
    // 如果返回的是VNode或者组件，直接返回
    if (isVueComponent(customContent)) {
      return customContent;
    }
    // 如果返回的是普通值，包装成文本节点
    return h("span", {}, String(customContent));
  } catch (e) {
    console.error("Error in customRender:", e);
    return h("span", {}, showTextAndEmpty(row[column.field]));
  }
};

// ==================== Drag & Sort Methods ====================
const initDragState = () => {
  // 清空拖拽相关状态
  state.dragIndex = -1;
  state.targetIndex = -1;
  state.dragRowId = "";
  state.targetRowId = "";
  state.initialDragY = 0;
  state.lastMouseY = 0;
  state.showTooltip = false;
  state.isDragging = false;
};

const dragStart = (event: DragEvent, row: any, index: number) => {
  if (!props.sortable) return;
  initDragState();
  computeTableRowHeight();
  // 设置新的拖拽状态
  state.dragIndex = index;
  state.dragRowId = row._lew_table_tr_id;
  state.isDragging = true;
  // 设置鼠标样式
  document.body.style.cursor = "grabbing";

  // 设置初始拖拽位置，用于计算是否达到了足够的移动距离
  state.initialDragY = event.clientY;
  state.lastMouseY = event.clientY;

  // 设置拖拽时的半透明效果
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";

    // 创建一个画布作为拖拽图像
    const canvas = document.createElement("canvas");
    event.dataTransfer.setDragImage(canvas, 0, 0);
  }

  // 禁止用户选择表格文本
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";

  // 显示悬浮提示
  state.showTooltip = true;
  state.tooltipStyle = `transform: translate(calc(${event.clientX}px - 2px), calc(${event.clientY}px - 2px))`;
  state.tooltipComponent = props.sortTooltipCustomRender
    ? props.sortTooltipCustomRender(row)
    : h("div", {}, `Row ${row[props.rowKey]}`);
  // 使用RAFThrottledTooltipUpdate替代直接监听mousemove
  document.addEventListener("mousemove", throttledTooltipUpdate);
  document.addEventListener("mouseup", dragEnd);
};

// 使用requestAnimationFrame优化tooltip更新
const updateTooltipPosition = (event: MouseEvent) => {
  // 取消之前的动画帧请求
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame);
  }

  // 请求新的动画帧来更新tooltip位置
  tooltipAnimationFrame = requestAnimationFrame(() => {
    state.tooltipStyle = `transform: translate(calc(${event.clientX}px - 2px), calc(${event.clientY}px - 2px))`;
    updateDragTarget(event.clientY);
  });
};

// 使用lodash的throttle函数进一步限制更新频率
const throttledTooltipUpdate = throttle(updateTooltipPosition, 16); // 约60fps

const dragEnd = () => {
  // 计算拖拽距离，如果小于阈值，则不执行排序
  const dragDistance = Math.abs(state.initialDragY - state.lastMouseY);
  const minDragDistance = 10; // 最小拖拽距离阈值，单位像素
  // 设置鼠标样式
  document.body.style.cursor = "default";
  if (
    state.dragRowId &&
    state.targetRowId &&
    state.dragRowId !== state.targetRowId &&
    dragDistance >= minDragDistance // 确保拖拽距离超过阈值
  ) {
    // 根据ID获取当前索引
    const dragIndex = state.dataSource.findIndex(
      (row) => row._lew_table_tr_id === state.dragRowId
    );
    const targetIndex = state.dataSource.findIndex(
      (row) => row._lew_table_tr_id === state.targetRowId
    );
    if (dragIndex !== -1 && targetIndex !== -1 && dragIndex !== targetIndex) {
      // 还需确认目标位置与拖拽位置不是相邻的
      const targetPosition = state.isAboveTarget
        ? targetIndex
        : targetIndex + 1;

      // 计算实际的目标索引位置（考虑拖拽行的影响）
      let actualTargetPosition = targetPosition;
      if (dragIndex < targetPosition) {
        actualTargetPosition--; // 如果拖拽行在目标位置之前，需要调整
      }

      // 确保拖拽行的最终位置与原始位置不同
      if (actualTargetPosition !== dragIndex) {
        // 重新排序数据
        const newDataSource = [...state.dataSource];
        const [movedItem] = newDataSource.splice(dragIndex, 1);
        newDataSource.splice(actualTargetPosition, 0, movedItem);

        // 更新克隆的数据源
        state.dataSource = newDataSource;
        // 发送排序变更事件
        emit("sortOrderChange", newDataSource);
      }
    }
  }

  // 取消任何挂起的动画帧
  if (tooltipAnimationFrame) {
    cancelAnimationFrame(tooltipAnimationFrame);
    tooltipAnimationFrame = null;
  }

  // 恢复文本选择
  document.body.style.userSelect = "";
  document.body.style.webkitUserSelect = "";

  // 重置状态
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

  // 拖拽结束后更新行高和位置
  setTimeout(() => {
    computeTableRowHeight();
  }, 250);
};

const updateDragTarget = (mouseY: number) => {
  // 记录最后的鼠标Y位置
  state.lastMouseY = mouseY;

  // 如果没有拖拽或者没有行位置信息，则不执行
  if (!state.dragRowId || Object.keys(state.trPositionsMap).length === 0)
    return;

  // 计算拖拽距离
  const dragDistance = Math.abs(state.initialDragY - mouseY);
  const minDragDistance = 5; // 指示器显示的最小拖拽距离阈值

  // 如果拖拽距离过小，不更新目标行
  if (dragDistance < minDragDistance) {
    return;
  }

  // 查找鼠标位置所在的行
  let targetRowId = "";
  let isAbove = false;

  // 将位置信息转换为数组以便排序
  const positionEntries = Object.entries(state.trPositionsMap).map(
    ([id, pos]) => ({
      id,
      ...pos,
    })
  );

  // 按照top值排序
  positionEntries.sort((a, b) => a.top - b.top);

  // 遍历所有行位置信息
  for (const entry of positionEntries) {
    // 跳过正在拖拽的行
    if (entry.id === state.dragRowId) continue;

    const position = entry;

    // 检查鼠标是否在当前行的范围内
    if (mouseY >= position.top && mouseY <= position.bottom) {
      targetRowId = position.id;

      // 计算鼠标是否在行的上半部分
      isAbove = mouseY < position.top + position.height / 2;
      break;
    }
  }

  // 处理鼠标在行之间的情况
  if (!targetRowId) {
    // 查找相邻的两行
    for (let i = 0; i < positionEntries.length - 1; i++) {
      if (positionEntries[i].id === state.dragRowId) continue;
      if (positionEntries[i + 1].id === state.dragRowId) continue;

      if (
        mouseY > positionEntries[i].bottom &&
        mouseY < positionEntries[i + 1].top
      ) {
        // 选择更接近的行
        if (
          mouseY - positionEntries[i].bottom <
          positionEntries[i + 1].top - mouseY
        ) {
          targetRowId = positionEntries[i].id;
          isAbove = false; // 在上一行的下方
        } else {
          targetRowId = positionEntries[i + 1].id;
          isAbove = true; // 在当前行的上方
        }
        break;
      }
    }
  }

  // 如果还没找到目标行，检查是否在第一行上方或最后一行下方
  if (!targetRowId && positionEntries.length > 0) {
    if (mouseY < positionEntries[0].top) {
      targetRowId = positionEntries[0].id;
      isAbove = true;
    } else if (mouseY > positionEntries[positionEntries.length - 1].bottom) {
      targetRowId = positionEntries[positionEntries.length - 1].id;
      isAbove = false;
    }
  }

  // 更新目标行ID和位置标记
  if (targetRowId) {
    state.targetRowId = targetRowId;
    state.targetIndex = state.dataSource.findIndex(
      (row) => row._lew_table_tr_id === targetRowId
    );
    state.isAboveTarget = isAbove;
  }
};

// 获取指示器样式
const getIndicatorStyle = () => {
  // 如果未拖拽或目标索引无效，则隐藏指示器
  if (
    !state.isDragging ||
    !state.targetRowId ||
    state.dragRowId === state.targetRowId
  ) {
    // 不使用opacity: 0，因为这可能导致位置不同步
    return `
      display: none;
      transform: translateY(0);
    `;
  }

  // 获取目标行的位置信息
  const targetPosition = state.trPositionsMap[state.targetRowId];
  if (!targetPosition) return "display: none;";

  // 根据鼠标在目标行的位置决定指示器放在上方还是下方
  const top = state.isAboveTarget ? targetPosition.top : targetPosition.bottom;

  // 计算tableRef的相对位置，因为指示器是相对于table-wrapper的
  const tableRect = tableRef.value?.getBoundingClientRect();
  const offsetTop = tableRect ? top - tableRect.top : 0;

  // 返回指示器样式
  return `
    display: block;
    transform: translateY(${offsetTop}px);
    opacity: 1;
  `;
};

// 添加唯一ID到数据源
const addUniqueIdToDataSource = (dataSource: any[]) => {
  return dataSource.map((row) => {
    if (!row._lew_table_tr_id) {
      row._lew_table_tr_id = getUniqueId();
    }
    return row;
  });
};

// 获取行高的方法
const getRowHeight = (row: any) => {
  if (!row || !row._lew_table_tr_id) return "auto";
  return (state.trHeightMap[row._lew_table_tr_id] || 0) + "px";
};

// 设置tr引用的方法
const setTrRef = (el: HTMLElement | null, row: any) => {
  if (row && row._lew_table_tr_id) {
    trRefMap.value[row._lew_table_tr_id] = el;
  }
};
</script>

<template>
  <div class="lew-table-wrapper">
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
      <slot name="table-header"></slot>
    </div>
    <div class="lew-table-drag-indicator" :style="getIndicatorStyle()"></div>
    <div
      ref="tableRef"
      class="lew-table lew-scrollbar"
      :class="{
        'lew-table-bordered': bordered,
        'lew-table-scroll': state.isScroll,
        'lew-table-dragging': state.isDragging,
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
          height: getHeadHeight * columnLevel + columnLevel * 1 + 'px',
        }"
        @mouseenter="state.hoverRowIndex = -1"
      >
        <div
          v-if="
            getFixedHeaderColumns('left').length > 0 || checkable || sortable
          "
          ref="fixedLeftRef"
          class="lew-table-fixed-left"
        >
          <div class="lew-table-tr">
            <!-- 拖拽排序列 -->
            <lew-flex
              v-if="sortable"
              class="lew-table-td"
              :style="{ width: getDragColumnWidth + 'px', padding: getPadding }"
              x="center"
            >
              <Icon :size="14" type="grip" />
            </lew-flex>
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
                :disabled="state.dataSource.length === 0"
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
      <div class="lew-table-empty" v-if="state.dataSource.length === 0">
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
        v-if="state.dataSource.length > 0"
        class="lew-table-body"
        :style="`width: ${totalColumnWidth}px`"
      >
        <div
          v-if="getFixedColumns('left').length > 0 || checkable || sortable"
          class="lew-table-fixed-left"
        >
          <transition-group name="lew-table-row">
            <div
              v-for="(row, i) in state.dataSource"
              :key="`data${row[rowKey] || i}`"
              class="lew-table-tr"
              :class="{
                'lew-table-tr-hover':
                  state.hoverRowIndex === i && !state.isDragging,
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
              <lew-flex
                v-if="sortable"
                :style="{ width: getDragColumnWidth + 'px' }"
                x="center"
                class="lew-table-drag-handle"
                @mousedown="dragStart($event, row, i)"
              >
                <Icon :size="14" type="grip" class="lew-table-drag-icon" />
              </lew-flex>
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
                    <lew-text-trim
                      :text="showTextAndEmpty(row[column.field])"
                    />
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
          </transition-group>
        </div>
        <div class="lew-table-main">
          <transition-group name="lew-table-row">
            <div
              v-for="(row, i) in state.dataSource"
              :key="`data${row[rowKey] || i}`"
              class="lew-table-tr"
              :ref="(e: any) => (setTrRef(e, row))"
              :class="{
                'lew-table-tr-hover':
                  state.hoverRowIndex === i && !state.isDragging,
                'lew-table-tr-dragging': state.dragIndex === i,
                'lew-table-tr-selected': state.selectedRowsMap[row[rowKey]],
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
                    <lew-text-trim
                      :text="showTextAndEmpty(row[column.field])"
                    />
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
          </transition-group>
        </div>
        <div
          v-if="getFixedColumns('right').length > 0"
          class="lew-table-fixed-right"
        >
          <transition-group name="lew-table-row">
            <div
              v-for="(row, i) in state.dataSource"
              :key="`data${row[rowKey] || i}`"
              class="lew-table-tr"
              :style="{
                height: getRowHeight(row),
              }"
              :class="{
                'lew-table-tr-hover':
                  state.hoverRowIndex === i && !state.isDragging,
                'lew-table-tr-dragging': state.dragIndex === i,
                'lew-table-tr-selected': state.selectedRowsMap[row[rowKey]],
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
                    <lew-text-trim
                      :text="showTextAndEmpty(row[column.field])"
                    />
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
          </transition-group>
        </div>
      </div>
    </div>
    <div class="lew-table-footer">
      <slot name="table-footer"></slot>
    </div>

    <div
      v-show="state.showTooltip"
      class="lew-table-drag-tooltip"
      :style="state.tooltipStyle"
    >
      <component
        v-if="isVueComponent(state.tooltipComponent)"
        :is="state.tooltipComponent"
      />
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
    transition: background 0.2s cubic-bezier(0.55, 0, 0.1, 1);
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

.lew-table-dragging {
  .lew-table-tr {
    transition: background 0.2s cubic-bezier(0.55, 0, 0.1, 1),
      transform 0.2s cubic-bezier(0.55, 0, 0.1, 1),
      opacity 0.2s cubic-bezier(0.55, 0, 0.1, 1);
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

.lew-table-row-enter-from,
.lew-table-row-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.lew-table-row-leave-active {
  position: absolute;
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
</style>
