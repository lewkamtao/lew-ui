<script setup lang="ts">
import type { LewSize } from 'lew-ui'
import { object2class } from '../utils'
import CommonIcon from './CommonIcon.vue'

interface Props {
  size?: LewSize
  color?: 'gray' | 'primary' | 'normal'
  loading?: boolean
  disabled?: boolean
  round?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: 'gray',
  loading: false,
  disabled: false,
  round: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const iconSizeMap: Record<LewSize, number> = {
  small: 14,
  medium: 16,
  large: 18,
}

const iconSize = computed(() => iconSizeMap[props.size] || iconSizeMap.medium)

const closeButtonClass = computed(() => {
  return object2class('lew-close-button', {
    size: props.size,
    color: props.color,
    loading: props.loading,
    disabled: props.disabled,
    round: props.round,
  })
})

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    return
  }
  emit('click', event)
}
</script>

<template>
  <div
    class="lew-close-button"
    :class="closeButtonClass"
    @click.stop="handleClick"
  >
    <CommonIcon
      v-if="loading"
      :size="iconSize"
      type="loading"
      class="lew-close-button-icon-loading"
    />
    <CommonIcon
      v-else
      :size="iconSize"
      type="close"
      class="lew-close-button-icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-close-button {
  // CSS 变量定义
  --lew-close-button-bg: transparent;
  --lew-close-button-bg-hover: var(--lew-close-button-bgcolor-hover);
  --lew-close-button-bg-active: var(--lew-close-button-bgcolor-active);
  --lew-close-button-color: var(--lew-text-color-3);
  --lew-close-button-color-hover: var(--lew-close-button-textcolor-hover);
  --lew-close-button-color-active: var(--lew-close-button-textcolor-active);
  --lew-close-button-opacity: var(--lew-form-icon-opacity);
  --lew-close-button-opacity-hover: var(--lew-form-icon-opacity-hover);
  --lew-close-button-opacity-active: var(--lew-form-icon-opacity-active);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--lew-form-transition-ease),
    color var(--lew-form-transition-ease);
  background-color: var(--lew-close-button-bg);
  color: var(--lew-close-button-color);
  opacity: var(--lew-close-button-opacity);
  border-radius: var(--lew-border-radius-small);
  min-width: auto;
  height: auto;

  .lew-close-button-icon,
  .lew-close-button-icon-loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lew-close-button-icon-loading {
    animation: spin 1s linear infinite;
  }

  &:hover {
    background-color: var(--lew-close-button-bg-hover);
    color: var(--lew-close-button-color-hover);
  }

  &:active {
    background-color: var(--lew-close-button-bg-active);
    color: var(--lew-close-button-color-active);
  }
}

.lew-close-button-round {
  border-radius: 50%;
}

// 尺寸
.lew-close-button-size-small {
  width: 24px;
  height: 24px;
}

.lew-close-button-size-medium {
  width: 28px;
  height: 28px;
}

.lew-close-button-size-large {
  width: 32px;
  height: 32px;
}

// 颜色变体
.lew-close-button-color-gray {
  --lew-close-button-bg-hover: var(--lew-close-button-bgcolor-hover);
  --lew-close-button-bg-active: var(--lew-close-button-bgcolor-active);
  --lew-close-button-color: var(--lew-text-color-3);
  --lew-close-button-color-hover: var(--lew-close-button-textcolor-hover);
  --lew-close-button-color-active: var(--lew-close-button-textcolor-active);
}

.lew-close-button-color-primary {
  --lew-close-button-bg-hover: var(--lew-color-primary-light);
  --lew-close-button-bg-active: var(--lew-color-primary-light-active);
  --lew-close-button-color: var(--lew-text-color-3);
  --lew-close-button-color-hover: var(--lew-color-primary);
  --lew-close-button-color-active: var(--lew-color-primary-active);
}

.lew-close-button-color-normal {
  --lew-close-button-bg-hover: var(--lew-color-normal-light);
  --lew-close-button-bg-active: var(--lew-color-normal-light-active);
  --lew-close-button-color: var(--lew-text-color-3);
  --lew-close-button-color-hover: var(--lew-color-normal);
  --lew-close-button-color-active: var(--lew-color-normal-active);
}

// 禁用状态
.lew-close-button-disabled {
  opacity: var(--lew-disabled-opacity);
  cursor: not-allowed;
  pointer-events: none;
}

// 加载状态
.lew-close-button-loading {
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
