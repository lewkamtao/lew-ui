<script setup lang="ts">
import CloseIcon from "lew-ui/_components/CloseIcon.vue";
import { getColorType } from "lew-ui/utils";
import { isFunction } from "lodash-es";
import { tagEmits } from "./emits";
import { tagProps } from "./props";

const props = defineProps(tagProps);
const emit = defineEmits(tagEmits);
const slots = useSlots();
const isClosing = ref(false);

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

async function handleClose(): Promise<void> {
  if (props.disabled || isClosing.value) return;

  if (props.close) {
    isClosing.value = true;
    let result = false;
    try {
      result = await props.close();
    } catch {
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
    <div v-if="slots.left" class="lew-tag-left">
      <slot name="left" />
    </div>

    <div class="lew-tag-value">
      <slot v-if="!props.text" />
      <template v-else>
        {{ props.text }}
      </template>
    </div>

    <div v-if="slots.right" class="lew-tag-right">
      <slot name="right" />
    </div>

    <CloseIcon
      v-if="props.closeable || isFunction(props.close)"
      :size="
        props.size === 'small'
          ? 'small'
          : props.size === 'large'
          ? 'medium'
          : 'small'
      "
      :loading="isClosing"
      :disabled="props.disabled || isClosing"
      class="lew-tag-close"
      @click.stop="handleClose"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-tag {
  // CSS 变量定义
  --lew-tag-bg: transparent;
  --lew-tag-color: var(--lew-color-primary);
  --lew-tag-border: none;

  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  padding: 0;
  align-items: center;
  justify-content: center;

  // 视觉
  background-color: var(--lew-tag-bg);
  color: var(--lew-tag-color);
  border: var(--lew-tag-border);

  &--small {
    min-height: 20px;
    min-width: 20px;
    line-height: 16px;
    font-size: 12px;
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
    font-size: 13px;
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
    font-size: 14px;
    border-radius: 7px;
    padding: 0px 8px;
    gap: 4px;

    &.lew-tag--oversize {
      padding: 6px 14px;
    }
  }

  &--round {
    border-radius: 20px !important;
  }

  &--disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  &--ghost {
    --lew-tag-bg: transparent;
    box-shadow: none;
  }

  .lew-tag-value {
    box-sizing: border-box;
    font-weight: normal;
    white-space: nowrap;
  }

  .lew-tag-close {
    // CloseButton 组件已处理样式
    flex-shrink: 0;
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

// 类型 & 颜色变体（使用 Mixin 减少重复）
@mixin tag-variant($name) {
  .lew-tag--#{$name}.lew-tag--fill {
    --lew-tag-bg: var(--lew-color-tag-#{$name}-fill);
    --lew-tag-color: var(--lew-color-tag-#{$name}-fill-text);
    --lew-tag-border: none;
  }

  .lew-tag--#{$name}.lew-tag--light {
    --lew-tag-bg: color-mix(
      in srgb,
      var(--lew-color-tag-#{$name}-light) 50%,
      var(--lew-bgcolor-0)
    );
    --lew-tag-color: var(--lew-color-tag-#{$name}-light-text);
    --lew-tag-border: none;

    // 如果浏览器不支持 color-mix，使用 fallback
    @supports not (color-mix(in srgb, red 50%, white)) {
      --lew-tag-bg: var(--lew-color-tag-#{$name}-light);
    }
  }

  .lew-tag--#{$name}.lew-tag--ghost {
    --lew-tag-bg: transparent;
    --lew-tag-border: var(--lew-form-border-width) solid
      var(--lew-color-#{$name});
    --lew-tag-color: var(--lew-color-tag-#{$name}-ghost-text);
  }
}

// 生成所有主题色变体
@include tag-variant("blue");
@include tag-variant("gray");
@include tag-variant("red");
@include tag-variant("green");
@include tag-variant("yellow");
@include tag-variant("indigo");
@include tag-variant("purple");
@include tag-variant("pink");
@include tag-variant("orange");
@include tag-variant("cyan");
@include tag-variant("teal");
@include tag-variant("mint");
@include tag-variant("brown");
@include tag-variant("black");
@include tag-variant("error");
@include tag-variant("success");
@include tag-variant("warning");
@include tag-variant("info");
@include tag-variant("normal");
@include tag-variant("primary");
@include tag-variant("danger");
</style>
