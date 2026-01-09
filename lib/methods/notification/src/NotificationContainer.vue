<script lang="ts" setup>
import { getUniqueId, parseDimension } from "lew-ui/utils";

import NotificationItem from "./NotificationItem.vue";

// 通知项类型定义
interface NotificationItemType {
  id: string;
  type: string;
  title: string;
  content: string;
  duration: number;
  showProgress: boolean;
  width: number | string;
}

// 响应式状态
const notifications = ref<NotificationItemType[]>([]);
const containerWidth = ref(0);
const isVisible = ref(false);

// 定时器管理 - 使用 Map 存储每个通知的定时器
const timers = new Map<string, ReturnType<typeof setTimeout>>();
let hideTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * 更新容器宽度
 */
function updateContainerWidth(): void {
  containerWidth.value = notifications.value.reduce(
    (max, item) => Math.max(max, parseDimension(item.width)),
    0
  );
}

/**
 * 清除隐藏定时器
 */
function clearHideTimer(): void {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

/**
 * 添加新通知
 */
function add(
  type: string,
  title: string,
  content: string,
  duration: number,
  showProgress: boolean,
  width: number | string
): string {
  const id = getUniqueId();

  // 显示容器
  clearHideTimer();
  isVisible.value = true;

  // 添加通知到列表顶部
  notifications.value.unshift({
    id,
    type,
    title,
    content,
    duration,
    showProgress,
    width,
  });

  // 设置自动关闭定时器
  if (duration > 0) {
    const timer = setTimeout(() => {
      handleClose(id);
    }, duration);
    timers.set(id, timer);
  }

  // 更新容器宽度
  updateContainerWidth();

  return id;
}

/**
 * 关闭指定通知
 */
function handleClose(id: string): void {
  // 清除该通知的定时器
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }

  // 从列表中移除
  const index = notifications.value.findIndex((item) => item.id === id);
  if (index === -1) return;

  notifications.value.splice(index, 1);

  // 更新容器宽度
  updateContainerWidth();

  // 如果没有通知了，延迟隐藏容器
  if (notifications.value.length === 0) {
    hideTimer = setTimeout(() => {
      isVisible.value = false;
    }, 300); // 等待离开动画完成
  }
}

// 组件卸载时清理所有定时器
onUnmounted(() => {
  timers.forEach((timer) => clearTimeout(timer));
  timers.clear();
  clearHideTimer();
});

defineExpose({
  add,
  handleClose,
});
</script>

<template>
  <div
    v-show="isVisible || notifications.length > 0"
    id="lew-notification"
    class="lew-notification-container lew-scrollbar"
    :style="{ minWidth: `${containerWidth}px` }"
  >
    <TransitionGroup name="lew-notification">
      <div v-for="item in notifications" :key="item.id" class="lew-notification-wrapper">
        <NotificationItem
          :type="item.type"
          :title="item.title"
          :content="item.content"
          :duration="item.duration"
          :show-progress="item.showProgress"
          :width="item.width"
          @close="() => handleClose(item.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
.lew-notification-container {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
  overflow-y: auto;
  overflow-x: hidden;
  width: auto;
  max-height: 100vh;
  padding: 20px 15px;
  box-sizing: border-box;
  pointer-events: none;

  .lew-notification-wrapper {
    pointer-events: auto;
  }
}

.lew-notification-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

// ========== 进入动画 (轻微Q弹) ==========
.lew-notification-enter-active {
  transition: opacity 0.25s cubic-bezier(0.22, 1.15, 0.36, 1),
    transform 0.25s cubic-bezier(0.22, 1.15, 0.36, 1);
}

.lew-notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

// ========== 离开动画 ==========
.lew-notification-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 1, 1),
    transform 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.lew-notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

// ========== 移动动画 (轻微Q弹) ==========
.lew-notification-move {
  transition: transform 0.25s cubic-bezier(0.22, 1.15, 0.36, 1);
}
</style>
