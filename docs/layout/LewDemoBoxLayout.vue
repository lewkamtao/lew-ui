<script setup lang="ts">
import { useDemoLoaded } from "docs/composables/useDemoLoaded";
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
    default: 20,
  },
});

const emit = defineEmits<{
  allLoaded: [];
}>();

const { setLoaded } = useDemoLoaded();

// 是否全部加载完成
const isAllLoaded = ref(false);

// 同步到全局状态
watch(isAllLoaded, (val) => setLoaded(val), { immediate: true });

// 暴露给父组件
defineExpose({
  isAllLoaded,
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
  isAllLoaded.value = false;

  // 立即加载第一个
  if (totalDemos > 0) {
    loadedIndices.value.add(0);
    currentIndex = 1;
  }

  // 如果只有一个或没有 demo，直接标记完成
  if (totalDemos <= 1) {
    isAllLoaded.value = true;
    emit("allLoaded");
    return;
  }

  // 延迟加载后续 demo
  function loadNext() {
    if (currentIndex >= totalDemos) {
      loadTimer = null;
      isAllLoaded.value = true;
      emit("allLoaded");
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
    if (loadTimer) {
      clearTimeout(loadTimer);
      loadTimer = null;
    }
    loadedIndices.value = new Set();
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
  const columnWidth = `calc((100% - ${any2px(gap)} * ${
    columns - 1
  }) / ${columns})`;
  return {
    width: any2px(width),
    gap: any2px(gap),
    "--column-width": columnWidth,
  };
});

const getLayoutClassNames = computed(() => {
  return object2class("lew-demo-box-layout", {});
});

// 将demoGroup按列数分组，只包含已加载的 demo
const groupedData = computed(() => {
  const { demoGroup } = props;
  const columns = dynamicColumns.value;
  const result = [];

  for (let i = 0; i < columns; i++) {
    const columnData = {
      demos: [] as { component: any; index: number }[],
    };

    for (let j = i; j < demoGroup.length; j += columns) {
      // 只添加已加载的 demo
      if (loadedIndices.value.has(j)) {
        columnData.demos.push({
          component: demoGroup[j],
          index: j,
        });
      }
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
      ? docsLocale.t(
          `components.${props.componentName}.demo${index + 1}.description`
        )
      : "",
    code: props.codeGroup[index] || "",
    demoIndex: index,
    componentName: props.componentName,
  };
}
</script>

<template>
  <div
    class="lew-demo-box-layout"
    :style="getLayoutStyle"
    :class="getLayoutClassNames"
  >
    <div
      v-for="(column, columnIndex) in groupedData"
      :key="columnIndex"
      class="demo-column"
    >
      <TransitionGroup name="demo-fade" appear>
        <LewDemoBox
          v-for="item in column.demos"
          :key="item.index"
          :title="getDemoItemConfig(item.index).title"
          :description="getDemoItemConfig(item.index).description"
          :code="getDemoItemConfig(item.index).code"
          :demo-index="getDemoItemConfig(item.index).demoIndex"
          :component-name="getDemoItemConfig(item.index).componentName"
        >
          <component :is="item.component" />
        </LewDemoBox>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Demo 过渡动画
.demo-fade-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.demo-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

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
}
</style>
