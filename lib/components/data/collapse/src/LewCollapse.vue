<script setup lang="ts">
// 1. 类型导入
import type { LewCollapseModelValue } from "lew-ui/types";

// 2. 工具函数导入
import { any2px } from "lew-ui/utils";

// 3. 组件配置导入
import { collapseEmits } from "./emits";
import { collapseProps } from "./props";

// Props & Emits
const props = defineProps(collapseProps);
const emit = defineEmits(collapseEmits);

// v-model
const modelValue = defineModel<LewCollapseModelValue>();

// Provide/Inject
provide("expandKeys", modelValue);

// 计算属性
const collapseStyle = computed(() => ({
  width: any2px(props.width),
}));

// 监听器
watch(
  modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      emit("change", toRaw(newValue));
    }
  },
  { deep: true }
);
</script>

<template>
  <div :style="collapseStyle" class="lew-collapse">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.lew-collapse {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}
</style>
