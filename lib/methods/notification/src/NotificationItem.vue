<script lang="ts" setup>
import CloseIcon from 'lew-ui/_components/CloseIcon.vue'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px } from 'lew-ui/utils'

import { notificationEmits } from './emits'

defineProps<{
  type: string
  title: string
  content: string
  duration: number
  showProgress: boolean
  width: number | string
}>()

const emit = defineEmits(notificationEmits)

function handleClose(): void {
  emit('close')
}
</script>

<template>
  <div
    class="lew-notification"
    :class="[`lew-notification-${type}`]"
    :style="{ width: any2px(width) }"
  >
    <div class="lew-notification-box">
      <div class="lew-notification-icon">
        <CommonIcon :type="type" :size="18" />
      </div>
      <div class="lew-notification-body">
        <div v-if="title" class="lew-notification-title">
          {{ title }}
        </div>
        <div v-if="content" class="lew-notification-content">
          {{ content }}
        </div>
      </div>
      <CloseIcon
        size="medium"
        class="lew-notification-close-icon"
        @click="handleClose"
      />
    </div>
    <div
      v-if="showProgress && duration > 0"
      class="lew-notification-progress"
      :style="{ '--progress-duration': `${duration}ms` }"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-notification {
  position: relative;
  width: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border: var(--lew-pop-border);
  white-space: nowrap;
  box-shadow: var(--lew-pop-shadow);
  font-size: 14px;
  border-radius: var(--lew-border-radius-medium);
  overflow: hidden;
  background-color: var(--lew-pop-bgcolor);
  text-align: left;
  will-change: transform, opacity;

  .lew-notification-box {
    display: flex;
    width: 100%;
    padding: 15px 36px 15px 20px;
    box-sizing: border-box;

    .lew-notification-icon {
      flex-shrink: 0;
      margin-right: 10px;
    }

    .lew-notification-body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .lew-notification-title {
        font-size: 14px;
        font-weight: bold;
        color: var(--lew-text-color-0);
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      .lew-notification-content {
        width: 100%;
        font-size: 14px;
        color: var(--lew-text-color-2);
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }

    .lew-notification-close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 9;

      // 覆盖 CloseIcon 的背景色，确保暗色模式下有足够对比度
      --lew-close-icon-bg-hover: rgba(128, 128, 128, 0.15);
      --lew-close-icon-bg-active: rgba(128, 128, 128, 0.25);
    }
  }

  .lew-notification-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--lew-color-primary-dark);
    transform-origin: left;
    animation: lew-notification-progress linear forwards;
    animation-duration: var(--progress-duration, 3000ms);
  }
}

@keyframes lew-notification-progress {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
}

// 类型颜色
.lew-notification-normal .lew-notification-icon {
  color: var(--lew-color-normal);
}

.lew-notification-error .lew-notification-icon {
  color: var(--lew-color-error);
}

.lew-notification-success .lew-notification-icon {
  color: var(--lew-color-success);
}

.lew-notification-info .lew-notification-icon {
  color: var(--lew-color-info);
}

.lew-notification-warning .lew-notification-icon {
  color: var(--lew-color-warning);
}
</style>
