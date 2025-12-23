<script setup lang="ts">
// 1. 组件导入
import { locale } from "lew-ui";

// 2. 工具函数导入
import { any2px } from "lew-ui/utils";

// 3. 组件配置导入
import { emptyProps } from "./props";

// Props
const props = defineProps(emptyProps);

// 计算属性
const iconSrc = computed(() => {
  return new URL(`../icon/icon_${props.type}.svg`, import.meta.url).href;
});

const emptyStyle = computed(() => {
  const { width, height, padding, fontSize } = props;
  return {
    width: any2px(width),
    height: any2px(height),
    padding: any2px(padding),
    "--empty-font-size": any2px(fontSize),
  };
});

const displayTitle = computed(() => {
  return props.title || locale.t("empty.title");
});
</script>

<template>
  <div class="lew-empty-container" :style="emptyStyle">
    <img :src="iconSrc" :alt="displayTitle" class="lew-empty-icon" />
    <div v-if="displayTitle" class="lew-empty-title">
      {{ displayTitle }}
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.lew-empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  .lew-empty-icon {
    width: 100%;
    height: auto;
    max-width: 200px;
    transition: transform 0.2s ease;
  }

  .lew-empty-title {
    margin-top: 16px;
    font-size: var(--empty-font-size, 14px);
    color: var(--lew-text-color-5);
    text-align: center;
    line-height: 1.5;
  }
}

.lew-dark {
  .lew-empty-container .lew-empty-icon {
    opacity: 0.6;
  }
}
</style>
