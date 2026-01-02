<script setup lang="ts">
import type { LewSize } from "lew-ui";
import { object2class } from "../utils";
import CommonIcon from "./CommonIcon.vue";

interface Props {
  size?: LewSize;
  color?: "gray" | "primary" | "normal";
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  color: "gray",
  loading: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// 图标大小与 CommonInput 中的箭头保持一致
const iconSizeMap: Record<LewSize, number> = {
  small: 14,
  medium: 15,
  large: 16,
};

const iconSize = computed(() => iconSizeMap[props.size] || iconSizeMap.medium);

const closeIconClass = computed(() => {
  return object2class("lew-close-icon", {
    size: props.size,
    color: props.color,
    loading: props.loading,
    disabled: props.disabled,
  });
});

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    return;
  }
  emit("click", event);
}
</script>

<template>
  <div class="lew-close-icon" :class="closeIconClass" @click.stop="handleClick">
    <CommonIcon
      v-if="loading"
      :size="iconSize"
      type="loading"
      class="lew-close-icon-loading"
    />
    <CommonIcon
      v-else
      :size="iconSize"
      type="close"
      class="lew-close-icon-icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-close-icon {
  // CSS 变量定义
  --lew-close-icon-bg: transparent;
  --lew-close-icon-bg-hover: var(--lew-bgcolor-2);
  --lew-close-icon-bg-active: var(--lew-bgcolor-4);
  --lew-close-icon-opacity: var(--lew-form-icon-opacity);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  background-color: var(--lew-close-icon-bg);
  opacity: var(--lew-close-icon-opacity);

  // 保持颜色不变，只改变背景色
  transition: background-color var(--lew-form-transition-ease);
  padding: 2px;
  border-radius: 50%;

  .lew-close-icon-icon,
  .lew-close-icon-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity var(--lew-form-transition-ease);
  }

  .lew-close-icon-loading {
    animation: spin 1s linear infinite;
  }

  &:hover {
    background-color: var(--lew-close-icon-bg-hover);
  }

  &:active {
    background-color: var(--lew-close-icon-bg-active);
  }

  // 兼容原有的 lew-form-icon-close-focus 样式
  &.lew-form-icon-close-focus {
    &:hover {
      background-color: var(--lew-bgcolor-4);
    }
  }
}

// 尺寸
.lew-close-icon-size-small {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
}

.lew-close-icon-size-medium {
  width: 22px;
  height: 22px;
  min-width: 22px;
  min-height: 22px;
}

.lew-close-icon-size-large {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
}

// 颜色变体
.lew-close-icon-color-gray {
  --lew-close-icon-bg-hover: var(--lew-bgcolor-2);
  --lew-close-icon-bg-active: var(--lew-bgcolor-4);
  --lew-close-icon-color: var(--lew-text-color-3);
}

.lew-close-icon-color-primary {
  --lew-close-icon-bg-hover: var(--lew-color-primary-light);
  --lew-close-icon-bg-active: var(--lew-color-primary-light-active);
  --lew-close-icon-color: var(--lew-text-color-3);
}

.lew-close-icon-color-normal {
  --lew-close-icon-bg-hover: var(--lew-color-normal-light);
  --lew-close-icon-bg-active: var(--lew-color-normal-light-active);
  --lew-close-icon-color: var(--lew-text-color-3);
}

// 禁用状态
.lew-close-icon-disabled {
  opacity: var(--lew-disabled-opacity);
  cursor: not-allowed;
  pointer-events: none;
}

// 加载状态
.lew-close-icon-loading {
  cursor: progress;
  pointer-events: none;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
