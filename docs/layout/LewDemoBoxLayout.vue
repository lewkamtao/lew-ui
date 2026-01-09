<script setup lang="ts">
import docsLocale from "docs/locals";
import { any2px, object2class } from "lew-ui/utils";
import { throttle } from "lodash-es";
import LewDemoBox from "./LewDemoBox.vue";

const props = defineProps({
  demoGroup: {
    type: Array as PropType<any[]>,
    required: true,
  },
  codeGroup: {
    type: Array as PropType<string[]>,
    required: true,
  },
  columns: {
    type: Number,
    default: 1,
  },
  gap: {
    type: String,
    default: "30px",
  },
  width: {
    type: String,
    default: "100%",
  },
  componentName: {
    type: String,
    default: "",
  },
  // 每个 demo 加载的延迟间隔（毫秒）
  loadDelay: {
    type: Number,
    default: 50,
  },
});

// 响应式窗口宽度
const windowWidth = ref(window.innerWidth);

// 已加载的 demo 索引集合
const loadedIndices = ref<Set<number>>(new Set());

// 加载定时器
let loadTimer: ReturnType<typeof setTimeout> | null = null;

// 按顺序延迟加载 demo
function startSequentialLoading() {
  const totalDemos = props.demoGroup.length;
  let currentIndex = 0;

  // 立即加载第一个
  if (totalDemos > 0) {
    loadedIndices.value.add(0);
    currentIndex = 1;
  }

  // 延迟加载后续 demo
  function loadNext() {
    if (currentIndex >= totalDemos) {
      loadTimer = null;
      return;
    }

    loadedIndices.value = new Set([...loadedIndices.value, currentIndex]);
    currentIndex++;

    loadTimer = setTimeout(loadNext, props.loadDelay);
  }

  if (currentIndex < totalDemos) {
    loadTimer = setTimeout(loadNext, props.loadDelay);
  }
}

// 检查某个 demo 是否已加载
const isDemoLoaded = computed(() => (index: number) => {
  return loadedIndices.value.has(index);
});

// 监听窗口大小变化
onMounted(() => {
  const handleResize = throttle(() => {
    windowWidth.value = window.innerWidth;
  }, 200);

  window.addEventListener("resize", handleResize);

  // 开始顺序加载
  startSequentialLoading();

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    // 清理定时器
    if (loadTimer) {
      clearTimeout(loadTimer);
      loadTimer = null;
    }
  });
});

// 监听 demoGroup 变化，重新开始加载
watch(
  () => props.demoGroup,
  () => {
    // 清理之前的定时器
    if (loadTimer) {
      clearTimeout(loadTimer);
      loadTimer = null;
    }
    // 重置加载状态
    loadedIndices.value = new Set();
    // 重新开始加载
    startSequentialLoading();
  }
);

// 根据窗口宽度动态计算列数
const dynamicColumns = computed(() => {
  return windowWidth.value < 1600 ? 1 : props.columns;
});

// 计算属性
const getLayoutStyle = computed(() => {
  const { width, gap } = props;
  const columns = dynamicColumns.value;
  const columnWidth = `calc((100% - ${any2px(gap)} * ${columns - 1}) / ${columns})`;
  return {
    width: any2px(width),
    gap: any2px(gap),
    "--column-width": columnWidth,
  };
});

const getLayoutClassNames = computed(() => {
  return object2class("lew-demo-box-layout", {});
});

// 将demoGroup和codeGroup按列数分组
const groupedData = computed(() => {
  const { demoGroup, codeGroup } = props;
  const columns = dynamicColumns.value;
  const result = [];

  for (let i = 0; i < columns; i++) {
    const columnData = {
      demos: [] as any[],
      codes: [] as string[],
      indices: [] as number[],
    };

    for (let j = i; j < demoGroup.length; j += columns) {
      columnData.demos.push(demoGroup[j]);
      columnData.codes.push(codeGroup[j] || "");
      columnData.indices.push(j);
    }

    result.push(columnData);
  }

  return result;
});

// 获取demo项配置
function getDemoItemConfig(index: number) {
  return {
    title: props.componentName
      ? docsLocale.t(`components.${props.componentName}.demo${index + 1}.title`)
      : "",
    description: props.componentName
      ? docsLocale.t(`components.${props.componentName}.demo${index + 1}.description`)
      : "",
    code: props.codeGroup[index] || "",
    demoIndex: index,
    componentName: props.componentName,
  };
}
</script>

<template>
  <div class="lew-demo-box-layout" :style="getLayoutStyle" :class="getLayoutClassNames">
    <div
      v-for="(column, columnIndex) in groupedData"
      :key="columnIndex"
      class="demo-column"
    >
      <template
        v-for="(item, itemIndex) in column.demos"
        :key="column.indices[itemIndex]"
      >
        <!-- 已加载的 demo -->
        <LewDemoBox
          v-if="isDemoLoaded(column.indices[itemIndex])"
          :title="getDemoItemConfig(column.indices[itemIndex]).title"
          :description="getDemoItemConfig(column.indices[itemIndex]).description"
          :code="getDemoItemConfig(column.indices[itemIndex]).code"
          :demo-index="getDemoItemConfig(column.indices[itemIndex]).demoIndex"
          :component-name="getDemoItemConfig(column.indices[itemIndex]).componentName"
        >
          <component :is="item" />
        </LewDemoBox>
        <!-- 加载占位符 -->
        <div v-else class="demo-skeleton">
          <div class="skeleton-title" />
          <div class="skeleton-content">
            <div class="skeleton-line" />
            <div class="skeleton-line short" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-demo-box-layout {
  display: flex;
  width: 100%;

  .demo-column {
    width: var(--column-width);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    min-width: 0;

    &:not(:last-child) {
      margin-right: v-bind(gap);
    }

    :deep(.demo-box) {
      width: 100%;
      min-width: 0;
    }
  }

  // 骨架屏样式
  .demo-skeleton {
    margin: 20px 0;
    padding: 20px;
    background-color: var(--lew-bgcolor-0);
    border-radius: var(--lew-border-radius-small);
    box-shadow: var(--lew-box-shadow);
    animation: skeleton-pulse 1.5s ease-in-out infinite;

    .skeleton-title {
      width: 120px;
      height: 20px;
      background: var(--lew-bgcolor-4);
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .skeleton-content {
      padding: 20px;
      background: var(--lew-bgcolor-1);
      border-radius: var(--lew-border-radius-small);

      .skeleton-line {
        height: 14px;
        background: var(--lew-bgcolor-4);
        border-radius: 4px;
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 0;
        }

        &.short {
          width: 60%;
        }
      }
    }
  }

  @keyframes skeleton-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
}
</style>
