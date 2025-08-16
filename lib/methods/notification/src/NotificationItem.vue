<script lang="ts" setup>
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px } from 'lew-ui/utils'

defineProps<{
  type: string
  title: string
  content: string
  duration: number
  showProgress: boolean
  width: number | string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onClose() {
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
      <div class="lew-notification-close-icon" @click="onClose">
        <CommonIcon type="close" :size="16" />
      </div>
    </div>
    <div
      v-if="showProgress"
      class="lew-notification-progress"
      :style="{ animationDuration: `${duration}ms` }"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-notification {
  position: relative;
  right: 0;
  width: auto;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  border: var(--lew-pop-border);
  margin-bottom: 12px;
  white-space: nowrap;
  box-shadow: var(--lew-pop-shadow);
  font-size: 14px;
  border-radius: var(--lew-border-radius-medium);
  overflow: hidden;
  background-color: var(--lew-pop-bgcolor) !important;
  border: var(--lew-pop-border);
  text-align: left;

  .lew-notification-box {
    display: flex;
    width: 100%;
    padding: 15px 36px 15px 20px;
    box-sizing: border-box;

    .lew-notification-icon {
      margin-right: 10px;
    }

    .lew-notification-body {
      width: calc(100% - 40px);
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
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      top: 10px;
      right: 10px;
      padding: 2px;
      border-radius: 50%;
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;
      color: var(--lew-text-color-5);

      &:hover {
        color: var(--lew-text-color-2);
        background: var(--lew-bgcolor-3);
      }

      &:active {
        color: var(--lew-text-color-0);
        background: var(--lew-bgcolor-5);
      }
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
    animation: progress linear forwards;
  }
}

@keyframes progress {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
}

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
