<script setup lang="ts">
// 1. 组件导入
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'

// 2. 工具函数导入
import { object2class } from 'lew-ui/utils'

// 3. 组件配置导入
import { buttonEmits } from './emits'
import { buttonProps } from './props'

// Props & Emits
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

// Composables
const slots = useSlots()

// 响应式状态
const _loading = ref(false)
const showLoading = ref(false)
let loadingTimer: ReturnType<typeof setTimeout> | null = null

// 计算属性
const buttonClass = computed(() => {
  const { size, type, color, singleIcon, round, dashed } = props
  const loading = _loading.value || props.loading
  return object2class('lew-button', {
    size,
    type,
    loading,
    singleIcon,
    color,
    round,
    dashed,
  })
})

const iconSize = computed(() => {
  const sizeMap: Record<string, number> = {
    mini: 12,
    small: 14,
    medium: 16,
    large: 18,
  }
  return sizeMap[props.size] || 16
})

const isLoading = computed(() => _loading.value || props.loading)
const hasContent = computed(() => !!slots.default || !!props.text)

// 显示 loading 的状态：外部 props.loading 立即显示，内部 loading 需要延迟
const shouldShowLoading = computed(() => {
  // 如果外部通过 props 控制 loading，立即显示
  if (props.loading) {
    return true
  }
  // 内部 loading 需要延迟显示
  return showLoading.value
})

// 清理定时器
function clearLoadingTimer() {
  if (loadingTimer) {
    clearTimeout(loadingTimer)
    loadingTimer = null
  }
}

// 方法
async function handleClick(e: MouseEvent) {
  if (props.disabled || isLoading.value) {
    return
  }

  emit('click', e)

  if (typeof props.request === 'function') {
    // 清理之前的定时器
    clearLoadingTimer()

    // 重置状态
    _loading.value = true
    showLoading.value = false

    // 设置 80ms 延迟显示 loading
    loadingTimer = setTimeout(() => {
      if (_loading.value) {
        showLoading.value = true
      }
      loadingTimer = null
    }, 80)

    try {
      await props.request()
    }
    finally {
      // 如果定时器还在，说明异步操作在 80ms 内完成，清除定时器
      clearLoadingTimer()
      _loading.value = false
      showLoading.value = false
    }
  }
}

// 组件卸载时清理定时器
onUnmounted(() => {
  clearLoadingTimer()
})
</script>

<template>
  <button
    class="lew-button"
    :class="buttonClass"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <Transition name="lew-button-loading">
      <div v-if="shouldShowLoading && !disabled" class="lew-button-loading-icon">
        <CommonIcon :size="iconSize" loading type="loader" />
      </div>
    </Transition>
    <div v-if="hasContent" class="lew-button-content">
      <span class="lew-button-text">
        <slot>{{ text }}</slot>
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.lew-button {
  // CSS 变量定义
  --lew-button-bg: transparent;
  --lew-button-color: var(--lew-color-primary);
  --lew-button-border: none;
  --lew-button-hover-bg: var(--lew-color-primary-light);
  --lew-button-active-bg: var(--lew-color-primary-light-active);

  // 定位
  position: relative;

  // 盒模型
  display: inline-flex;
  width: auto;
  box-sizing: border-box;
  overflow: hidden;

  // 排版
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;
  white-space: nowrap;

  // 视觉
  background: var(--lew-button-bg);
  color: var(--lew-button-color);
  border: var(--lew-button-border);
  border-radius: var(--lew-border-radius-small);
  box-shadow: var(--lew-form-box-shadow);
  outline: none;

  // 其他
  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--lew-form-transition-ease),
    color var(--lew-form-transition-ease),
    padding var(--lew-form-transition-ease),
    width 0.25s ease,
    min-width 0.25s ease;

  &:hover {
    background: var(--lew-button-hover-bg);
    color: var(--lew-button-hover-color, var(--lew-button-color));
  }

  &:active {
    background: var(--lew-button-active-bg);
    color: var(--lew-button-active-color, var(--lew-button-color));
  }

  &[disabled] {
    pointer-events: none;
    opacity: var(--lew-disabled-opacity);
  }

  &.lew-button-round {
    border-radius: 20px;
  }

  &.lew-button-dashed {
    border-style: dashed;
  }
}

// 子元素
.lew-button-loading-icon {
  position: absolute;
  top: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
}

// Loading 过渡动画（透明过渡）
.lew-button-loading-enter-active {
  transition: opacity 0.2s ease;
}

.lew-button-loading-leave-active {
  transition: opacity 0.15s ease;
}

.lew-button-loading-enter-from {
  opacity: 0;
}

.lew-button-loading-enter-to {
  opacity: 1;
}

.lew-button-loading-leave-from {
  opacity: 1;
}

.lew-button-loading-leave-to {
  opacity: 0;
}

.lew-button-content {
  position: relative;
  font-size: 0;
}

.lew-button-text {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

// 尺寸修饰符
.lew-button-size-mini {
  min-width: 30px;
  height: calc(var(--lew-form-item-height-mini));
  padding: 0 14px;
  gap: 2px;
  line-height: calc(var(--lew-form-item-height-mini));
  font-size: var(--lew-form-font-size-mini);

  .lew-button-text {
    gap: 2px;
    font-size: var(--lew-form-font-size-mini);
  }

  .lew-button-loading-icon {
    left: 7px;
  }
}

.lew-button-size-small {
  min-width: 40px;
  height: calc(var(--lew-form-item-height-small));
  padding: 0 16px;
  gap: 3px;
  line-height: calc(var(--lew-form-item-height-small));

  .lew-button-text {
    gap: 3px;
    font-size: var(--lew-form-font-size-small);
  }

  .lew-button-loading-icon {
    left: 8px;
  }
}

.lew-button-size-medium {
  min-width: 50px;
  height: calc(var(--lew-form-item-height-medium));
  padding: 0 18px;
  gap: 4px;
  line-height: calc(var(--lew-form-item-height-medium));

  .lew-button-text {
    gap: 4px;
    font-size: var(--lew-form-font-size-medium);
  }

  .lew-button-loading-icon {
    left: 9px;
  }
}

.lew-button-size-large {
  min-width: 60px;
  height: calc(var(--lew-form-item-height-large));
  padding: 0 20px;
  gap: 5px;
  line-height: calc(var(--lew-form-item-height-large));

  .lew-button-text {
    gap: 5px;
    font-size: var(--lew-form-font-size-large);
  }

  .lew-button-loading-icon {
    left: 10px;
  }
}

// 单图标按钮
.lew-button-singleIcon {
  .lew-button-loading-icon {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.lew-button-size-mini.lew-button-singleIcon {
  min-width: auto;
  width: calc(var(--lew-form-item-height-mini));
  height: calc(var(--lew-form-item-height-mini));
  padding: 0;
}

.lew-button-size-small.lew-button-singleIcon {
  min-width: auto;
  width: calc(var(--lew-form-item-height-small));
  height: calc(var(--lew-form-item-height-small));
  padding: 0;
}

.lew-button-size-medium.lew-button-singleIcon {
  min-width: auto;
  width: calc(var(--lew-form-item-height-medium));
  height: calc(var(--lew-form-item-height-medium));
  padding: 0;
}

.lew-button-size-large.lew-button-singleIcon {
  min-width: auto;
  width: calc(var(--lew-form-item-height-large));
  height: calc(var(--lew-form-item-height-large));
  padding: 0;
}

// 加载状态
.lew-button-loading {
  cursor: progress;
  padding-left: 0;
}

.lew-button-size-mini.lew-button-loading {
  padding-left: 24px;
}

.lew-button-size-small.lew-button-loading {
  padding-left: 27px;
}

.lew-button-size-medium.lew-button-loading {
  padding-left: 31px;
}

.lew-button-size-large.lew-button-loading {
  padding-left: 34px;
}

.lew-button.lew-button-loading.lew-button-singleIcon {
  padding: 0;

  .lew-button-text {
    display: none;
  }

  .lew-button-icon {
    display: none;
  }
}

// 类型 & 颜色变体（使用 Mixin 减少重复）
@mixin button-variant($name) {
  .lew-button-type-fill.lew-button-color-#{$name} {
    --lew-button-bg: var(--lew-color-button-#{$name}-fill);
    --lew-button-color: var(--lew-color-button-#{$name}-fill-text);
    --lew-button-hover-bg: color-mix(
      in srgb,
      var(--lew-color-button-#{$name}-fill) 70%,
      var(--lew-color-button-#{$name}-fill-hover-base) 30%
    );
    --lew-button-hover-color: var(--lew-color-button-#{$name}-fill-text-hover);
    --lew-button-active-bg: color-mix(
      in srgb,
      var(--lew-color-button-#{$name}-fill) 60%,
      var(--lew-color-button-#{$name}-fill-active-base) 40%
    );
    --lew-button-active-color: var(--lew-color-button-#{$name}-fill-text-active);

    // 如果浏览器不支持 color-mix，使用 fallback
    @supports not (color-mix(in srgb, red 50%, white)) {
      --lew-button-hover-bg: var(--lew-color-button-#{$name}-fill-hover);
      --lew-button-active-bg: var(--lew-color-button-#{$name}-fill-active);
    }
  }

  .lew-button-type-light.lew-button-color-#{$name} {
    --lew-button-bg: color-mix(in srgb, var(--lew-color-button-#{$name}-light) 50%, var(--lew-bgcolor-0));
    --lew-button-color: var(--lew-color-button-#{$name}-light-text);
    --lew-button-hover-bg: color-mix(in srgb, var(--lew-color-button-#{$name}-light-hover) 50%, var(--lew-bgcolor-0));
    --lew-button-hover-color: var(--lew-color-button-#{$name}-light-text-hover);
    --lew-button-active-bg: color-mix(in srgb, var(--lew-color-button-#{$name}-light-active) 50%, var(--lew-bgcolor-0));
    --lew-button-active-color: var(--lew-color-button-#{$name}-light-text-active);

    // 如果浏览器不支持 color-mix，使用 fallback
    @supports not (color-mix(in srgb, red 50%, white)) {
      --lew-button-bg: var(--lew-color-button-#{$name}-light);
      --lew-button-hover-bg: var(--lew-color-button-#{$name}-light-hover);
      --lew-button-active-bg: var(--lew-color-button-#{$name}-light-active);
    }
  }

  .lew-button-type-ghost.lew-button-color-#{$name} {
    --lew-button-bg: transparent;
    --lew-button-border: var(--lew-form-border-width) solid var(--lew-color-#{$name});
    --lew-button-color: var(--lew-color-button-#{$name}-ghost-text);
    --lew-button-hover-bg: var(--lew-bgcolor-2);
    --lew-button-hover-color: var(--lew-color-button-#{$name}-ghost-text-hover);
    --lew-button-active-bg: var(--lew-bgcolor-4);
    --lew-button-active-color: var(--lew-color-button-#{$name}-ghost-text-active);

    box-shadow: none;
  }

  .lew-button-type-text.lew-button-color-#{$name} {
    --lew-button-bg: transparent;
    --lew-button-color: var(--lew-color-button-#{$name}-text-text);
    --lew-button-hover-bg: var(--lew-form-bgcolor-hover);
    --lew-button-hover-color: var(--lew-color-button-#{$name}-text-text-hover);
    --lew-button-active-bg: var(--lew-form-bgcolor-active);
    --lew-button-active-color: var(--lew-color-button-#{$name}-text-text-active);

    border: none;
    box-shadow: none;
  }
}

// 生成所有主题色变体
@include button-variant('blue');
@include button-variant('gray');
@include button-variant('red');
@include button-variant('green');
@include button-variant('yellow');
@include button-variant('indigo');
@include button-variant('purple');
@include button-variant('pink');
@include button-variant('orange');
@include button-variant('cyan');
@include button-variant('teal');
@include button-variant('mint');
@include button-variant('brown');
@include button-variant('black');
@include button-variant('error');
@include button-variant('success');
@include button-variant('warning');
@include button-variant('info');
@include button-variant('normal');
@include button-variant('primary');
@include button-variant('danger');
</style>
