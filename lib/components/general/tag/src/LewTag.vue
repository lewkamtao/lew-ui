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

// v-model 支持
const modelValue = defineModel<string>();

// 编辑状态（是否正在聚焦编辑）
const isFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const tagRef = ref<HTMLElement | null>(null);
const inputWidth = ref("20px");

// 判断是否使用了 v-model（输入模式）
const hasModelValue = computed(() => {
  return modelValue.value !== undefined;
});

// 是否可编辑
const isEditable = computed(() => {
  return props.editable && !props.disabled;
});

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
    isFocused.value && "lew-tag--editing",
    hasModelValue.value && "lew-tag--has-input",
    isEditable.value && "lew-tag--editable",
  ]
    .filter(Boolean)
    .join(" ");
});

// 计算输入框宽度
function updateInputWidth() {
  const text = modelValue.value || props.placeholder || "";
  if (!tagRef.value) return;

  // 创建临时元素测量文本宽度
  const span = document.createElement("span");
  span.className = "lew-tag-text";
  span.style.cssText = `
    position: absolute;
    visibility: hidden;
    white-space: pre;
    pointer-events: none;
  `;
  span.textContent = text || "W";
  tagRef.value.appendChild(span);
  const width = span.getBoundingClientRect().width;
  tagRef.value.removeChild(span);
  inputWidth.value = `${Math.max(Math.ceil(width), 8)}px`;
}

// 点击标签聚焦输入框
function handleTagClick(e: MouseEvent) {
  if (!isEditable.value || !hasModelValue.value) return;
  e.stopPropagation();

  nextTick(() => {
    inputRef.value?.focus();
    inputRef.value?.select();
  });
}

// 输入时更新宽度和值
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  modelValue.value = target.value;
  updateInputWidth();
}

// 输入框聚焦
function handleInputFocus() {
  if (!isEditable.value) return;
  isFocused.value = true;
  emit("focus");
}

// 输入框失焦
function handleInputBlur() {
  isFocused.value = false;
  // trim 值
  if (modelValue.value !== undefined) {
    const trimmed = modelValue.value.trim();
    if (trimmed !== modelValue.value) {
      modelValue.value = trimmed;
      updateInputWidth();
    }
    emit("change", trimmed);
  }
  emit("blur");
}

// 键盘事件处理
function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Enter") {
    e.preventDefault();
    inputRef.value?.blur();
  } else if (e.key === "Escape") {
    e.preventDefault();
    inputRef.value?.blur();
  }
}

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

// 监听 modelValue、text、placeholder 变化，更新输入框宽度
watch(
  [() => modelValue.value, () => props.text, () => props.placeholder],
  () => {
    if (hasModelValue.value) {
      nextTick(updateInputWidth);
    }
  },
  { immediate: true }
);

// 组件挂载后初始化宽度
onMounted(() => {
  if (hasModelValue.value) {
    updateInputWidth();
  }
});
</script>

<template>
  <div ref="tagRef" :class="tagClass" @click="handleTagClick">
    <div v-if="slots.left" class="lew-tag-left">
      <slot name="left" />
    </div>

    <div class="lew-tag-value">
      <!-- 使用 v-model 时：始终用 input 渲染 -->
      <input
        v-if="hasModelValue"
        ref="inputRef"
        :value="modelValue"
        class="lew-tag-input"
        :style="{ width: inputWidth }"
        :placeholder="props.placeholder"
        :disabled="!isEditable"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        @keydown="handleKeydown"
        @input="handleInput"
      />
      <!-- 普通模式：使用 slot 或 text -->
      <template v-else>
        <slot v-if="!props.text" />
        <template v-else>
          {{ props.text }}
        </template>
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
  --lew-tag-theme-color: var(--lew-color-primary); // 用于编辑模式边框

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

  &--editable {
    cursor: text;
    // 默认透明边框，防止 hover/editing 时宽度抖动
    border: var(--lew-form-border-width) solid transparent !important;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;

    &:hover:not(.lew-tag--editing) {
      border-color: color-mix(
        in srgb,
        var(--lew-tag-theme-color) 40%,
        transparent
      ) !important;
      box-shadow: 0 0 0 1.5px
        color-mix(in srgb, var(--lew-tag-theme-color) 30%, transparent);
    }
  }

  &--editing {
    border-color: var(--lew-tag-theme-color) !important;
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--lew-tag-theme-color) 40%, transparent);
  }

  &--ghost {
    --lew-tag-bg: transparent;
    box-shadow: none;
  }

  .lew-tag-value {
    box-sizing: border-box;
    font-weight: normal;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }

  .lew-tag-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lew-tag-input {
    border: none;
    outline: none;
    background: transparent;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
    min-width: 8px;
    max-width: 200px;
    line-height: inherit;
    cursor: inherit;

    &:disabled {
      cursor: default;
      opacity: 1;
      -webkit-text-fill-color: currentColor;
    }

    &::placeholder {
      color: var(--lew-text-color-5);
      opacity: 0.6;
    }
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
  .lew-tag--#{$name} {
    --lew-tag-theme-color: var(--lew-color-#{$name});
  }

  .lew-tag--#{$name}.lew-tag--fill {
    --lew-tag-bg: var(--lew-color-tag-#{$name}-fill);
    --lew-tag-color: var(--lew-color-tag-#{$name}-fill-text);
    --lew-tag-border: none;
  }

  .lew-tag--#{$name}.lew-tag--light {
    --lew-tag-bg: color-mix(
      in srgb,
      var(--lew-color-tag-#{$name}-light) 35%,
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
