<script setup lang="ts">
// 1. 组件导入
import { LewFlex, locale } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";

// 2. 工具函数导入
import { any2px } from "lew-ui/utils";

// 3. 组件配置导入
import { expandEmits } from "./emits";
import { expandProps } from "./props";

// Props & Emits
const props = defineProps(expandProps);
const emit = defineEmits(expandEmits);

// 响应式状态
const expandRef = ref<HTMLElement>();
const collapseHeight = ref(props.collapseHeight);
const isCollapsed = ref(false);
const expandHeight = ref(0);

// 计算属性
const wrapperStyle = computed(() => {
  const result: Record<string, string> = {};

  if (isCollapsed.value) {
    result.height = any2px(collapseHeight.value);
    result.paddingBottom = "0px";
  } else {
    result.height = any2px(expandHeight.value);
    result.paddingBottom = "40px";
  }

  return result;
});

const iconClass = computed(() => ({
  "lew-expand-icon--expanded": !isCollapsed.value,
}));

const buttonText = computed(() =>
  isCollapsed.value
    ? locale.t("expand.expandMore")
    : locale.t("expand.collapse")
);

// 方法
function toggleExpand() {
  isCollapsed.value = !isCollapsed.value;
  if (isCollapsed.value) {
    emit("collapse");
  } else {
    emit("expand");
  }
}

// 生命周期
onMounted(() => {
  if (expandRef.value) {
    expandHeight.value = expandRef.value.offsetHeight - 40;
    isCollapsed.value = true;
  }
});
</script>

<template>
  <div ref="expandRef" class="lew-expand-wrapper" :style="wrapperStyle">
    <slot />
    <LewFlex
      v-if="collapseHeight"
      gap="5px"
      x="center"
      class="lew-expand-btn"
      @click="toggleExpand"
    >
      <CommonIcon
        class="lew-expand-icon"
        :class="iconClass"
        type="chevron-down"
        :size="14"
      />
      {{ buttonText }}
    </LewFlex>
  </div>
</template>

<style lang="scss" scoped>
.lew-expand-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: height var(--lew-form-transition-ease),
    padding-bottom var(--lew-form-transition-ease);

  .lew-expand-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    text-align: center;
    background-image: var(--lew-expand-control-bg-gradient);
    cursor: pointer;
    user-select: none;
  }

  .lew-expand-icon {
    transition: transform var(--lew-form-transition-ease);
  }

  .lew-expand-icon--expanded {
    transform: rotate(180deg);
  }
}
</style>
