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
  small: 12,
  medium: 14,
  large: 16,
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
  <div class="lew-close-button" :class="closeButtonClass" @click.stop="handleClick">
    <CommonIcon
      v-if="loading"
      :size="iconSize"
      type="loading"
      class="lew-close-button-icon-loading"
    />
    <CommonIcon v-else :size="iconSize" type="close" class="lew-close-button-icon" />
  </div>
</template>

<style lang="scss" scoped>
.lew-close-button {
  // CSS 变量定义
  --lew-close-button-bg: transparent;
  --lew-close-button-bg-hover: var(--lew-bgcolor-2);
  --lew-close-button-bg-active: var(--lew-bgcolor-4);
  --lew-close-button-color: var(--lew-text-color-3);
  --lew-close-button-color-hover: var(--lew-text-color-1);
  --lew-close-button-color-active: var(--lew-text-color-0);
  --lew-close-button-opacity: var(--lew-form-icon-opacity);
  --lew-close-button-opacity-hover: var(--lew-form-icon-opacity-hover);
  --lew-close-button-opacity-active: var(--lew-form-icon-opacity-active);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  transition: all var(--lew-form-transition-ease);
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
    transition: all var(--lew-form-transition-ease);
  }

  .lew-close-button-icon-loading {
    animation: spin 1s linear infinite;
  }

  &:hover {
    background-color: var(--lew-close-button-bg-hover);
    color: var(--lew-close-button-color-hover);
    opacity: var(--lew-close-button-opacity-hover);
  }

  &:active {
    background-color: var(--lew-close-button-bg-active);
    color: var(--lew-close-button-color-active);
    opacity: var(--lew-close-button-opacity-active);
    transform: scale(0.9);
  }
}

.lew-close-button-round {
  border-radius: 50%;
}

// 尺寸
.lew-close-button-size-small {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  padding: 3px;
}

.lew-close-button-size-medium {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  padding: 4px;
}

.lew-close-button-size-large {
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  padding: 5px;
}

// 颜色变体
.lew-close-button-color-gray {
  --lew-close-button-bg-hover: var(--lew-bgcolor-2);
  --lew-close-button-bg-active: var(--lew-bgcolor-4);
  --lew-close-button-color: var(--lew-text-color-3);
  --lew-close-button-color-hover: var(--lew-text-color-1);
  --lew-close-button-color-active: var(--lew-text-color-0);
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
