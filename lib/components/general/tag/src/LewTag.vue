<script lang="ts" setup>
import type { LewSize } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import { getColorType } from "lew-ui/utils";
import { isFunction } from "lodash-es";
import { tagEmits } from "./emits";
import { tagProps } from "./props";

const props = defineProps(tagProps);
const emit = defineEmits(tagEmits);
const isClosing = ref(false);

// 关闭图标尺寸配置（仅用于图标大小，其他尺寸配置已移至 CSS class）
const CLOSE_ICON_SIZE: Record<LewSize, number> = {
  small: 12,
  medium: 14,
  large: 16,
} as const;

// 计算标签类名（所有配置都用 class，包括 type 和 color）
const tagClass = computed(() => {
  const resolvedColor = getColorType(props.color) || "primary";
  return [
    "lew-tag",
    `lew-tag--${props.size || "medium"}`,
    `lew-tag--${props.type || "light"}`,
    `lew-tag--${resolvedColor}`,
    props.round && "lew-tag--round",
    props.oversize && "lew-tag--oversize",
    props.disabled && "lew-tag--disabled",
  ]
    .filter(Boolean)
    .join(" ");
});

// 关闭图标尺寸（基于 size prop）
const closeIconSize = computed(() => {
  return CLOSE_ICON_SIZE[props.size] || CLOSE_ICON_SIZE.medium;
});

// 修改 handleClose 逻辑：只有 Promise 返回 true 才关闭，否则不处理
async function handleClose(): Promise<void> {
  if (props.disabled || isClosing.value) return;

  if (props.close) {
    isClosing.value = true;
    let result = false;
    try {
      result = await props.close();
    } catch {
      // 忽略异常，不关闭
      isClosing.value = false;
      return;
    }
    if (result === true) {
      emit("close");
    }
    isClosing.value = false;
  } else {
    emit("close");
  }
}
</script>

<template>
  <div :class="tagClass">
    <div v-if="$slots.left" class="lew-tag-left">
      <slot name="left" />
    </div>

    <div class="lew-tag-value">
      <slot v-if="!text" />
      <template v-else>
        {{ text }}
      </template>
    </div>

    <div v-if="$slots.right" class="lew-tag-right">
      <slot name="right" />
    </div>

    <div
      v-if="closeable || isFunction(close)"
      class="lew-tag-close"
      @click.stop="handleClose"
    >
      <CommonIcon
        v-if="isClosing"
        :size="closeIconSize"
        type="loading"
        class="lew-tag-loading"
      />
      <CommonIcon v-else :size="closeIconSize" type="close" />
    </div>
  </div>
</template>

<style lang="scss">
.lew-tag {
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  transition: all var(--lew-form-transition-ease);

  // Size 配置（静态）
  &--small {
    min-height: 20px;
    min-width: 20px;
    line-height: 16px;
    font-size: 13px;
    border-radius: 5px;
    padding: 0px 4px;
    gap: 2px;

    &.lew-tag--oversize {
      padding: 4px 10px;
    }
  }

  &--medium {
    min-height: 24px;
    min-width: 24px;
    line-height: 18px;
    font-size: 14px;
    border-radius: 6px;
    padding: 0px 6px;
    gap: 3px;

    &.lew-tag--oversize {
      padding: 5px 12px;
    }
  }

  &--large {
    min-height: 28px;
    min-width: 28px;
    line-height: 20px;
    font-size: 15px;
    border-radius: 7px;
    padding: 0px 8px;
    gap: 4px;

    &.lew-tag--oversize {
      padding: 6px 14px;
    }
  }

  // Round 配置（静态）
  &--round {
    border-radius: 20px !important;
  }

  // Disabled 配置（静态）
  &--disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  // Type 配置（fill/light/ghost）
  &--ghost {
    background-color: transparent;
    box-shadow: none;
  }

  // Color 配置（与 type 组合使用，使用 SCSS 循环生成所有颜色）
  $colors: (
    primary,
    success,
    error,
    warning,
    info,
    normal,
    danger,
    blue,
    gray,
    red,
    green,
    yellow,
    indigo,
    purple,
    pink,
    orange,
    cyan,
    teal,
    mint,
    brown,
    black
  );

  @each $color in $colors {
    &--#{$color} {
      &.lew-tag--fill {
        background-color: var(--lew-color-#{$color});
        color: var(--lew-color-white);
      }

      &.lew-tag--light {
        background-color: var(--lew-color-#{$color}-light);
        color: var(--lew-color-#{$color}-dark);
      }

      &.lew-tag--ghost {
        border: var(--lew-form-border-width)
          solid
          var(--lew-color-#{$color}-dark);
        color: var(--lew-color-#{$color}-dark);
      }
    }
  }

  .lew-tag-value {
    box-sizing: border-box;
    font-weight: normal;
    white-space: nowrap;
  }

  .lew-tag-close {
    display: inline-flex;
    padding: 2px;
    border-radius: var(--lew-border-radius-small);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--lew-form-transition-ease);

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.3);
    }

    .lew-tag-loading {
      animation: spin 1s linear infinite;
    }
  }

  .lew-tag-left,
  .lew-tag-right {
    display: inline-flex;
    box-sizing: border-box;
    align-items: center;
  }

  &.lew-tag-bold {
    font-weight: bold;

    .lew-tag-value {
      font-weight: bold;
    }
  }
}

.lew-dark {
  .lew-tag-close {
    &:hover {
      background-color: rgba(0, 0, 0, 0.45);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}

.lew-tag-to {
  cursor: pointer;
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
