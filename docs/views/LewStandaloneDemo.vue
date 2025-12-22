<script setup lang="ts">
import docsLocale from "docs/locals";

const route = useRoute();

// 从路由路径中提取组件名和 demo 索引
// 例如: /Input/demo_1 -> componentName: "Input", demoIndex: 0
const componentPath = computed(() => {
  const path = route.path;
  const match = path.match(/^\/([^/]+)\/demo_(\d+)$/);
  if (match) {
    return {
      componentName: match[1], // Input
      demoIndex: Number.parseInt(match[2]) - 1, // demo_1 -> index 0
    };
  }
  return null;
});

// 获取组件名（小写，用于国际化）
const componentName = computed(() => {
  if (!componentPath.value) return "";
  // Input -> input, InputNumber -> input-number
  // 处理驼峰命名：InputNumber -> Input-Number -> input-number
  return componentPath.value.componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
});

// 获取 demo 文件名前缀（用于动态导入）
// Input -> DemoInput, InputNumber -> DemoInputNumber
const demoFilePrefix = computed(() => {
  if (!componentPath.value) return "";
  return `Demo${componentPath.value.componentName}`;
});

// 动态导入 demo 组件
const demoComponent = ref<any>(null);

onMounted(async () => {
  if (!componentPath.value) return;

  try {
    // 动态导入 demo 文件
    // 例如: /Input/demo_1 -> docs/docs/input/demo/DemoInput1.vue
    const demoNumber = componentPath.value.demoIndex + 1;
    const demoFileName = `${demoFilePrefix.value}${demoNumber}`;

    const demoModule = await import(
      `../docs/${componentName.value}/demo/${demoFileName}.vue`
    );
    demoComponent.value = demoModule.default;

    // 纯 demo 页面，不需要代码
  } catch (error) {
    console.error("Failed to load demo:", error);
    console.error(
      "Component:",
      componentName.value,
      "Demo:",
      componentPath.value?.demoIndex + 1
    );
  }
});

// 移除代码和标题相关逻辑，只保留 demo 组件加载
</script>

<template>
  <!-- 纯 demo 页面，无任何外层组件，用于性能分析 -->
  <div v-if="componentPath && demoComponent" class="standalone-demo-pure">
    <component :is="demoComponent" />
  </div>
  <div v-else-if="componentPath" class="standalone-demo-loading">
    {{ docsLocale.t("base.loading") }}
  </div>
  <div v-else class="standalone-demo-not-found">Demo Not Found</div>
</template>

<style lang="scss" scoped>
// 纯 demo 页面，最小化样式，用于性能分析
.standalone-demo-pure {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: auto;
  box-sizing: border-box;
  background-color: var(--lew-bgcolor-0);
}

.standalone-demo-loading,
.standalone-demo-not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  color: var(--lew-text-color-5);
  font-size: 14px;
}
</style>
