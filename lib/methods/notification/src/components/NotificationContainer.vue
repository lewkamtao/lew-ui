<template>
  <div
    id="lew-notification"
    class="lew-scrollbar"
    :style="{ minWidth: `${width}px` }"
  >
    <TransitionGroup name="notification">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="notification-wrapper"
        :class="{ 'notification-wrapper-blank': item.id === '__blank' }"
      >
        <NotificationItem
          :type="item.type"
          :title="item.title"
          :content="item.content"
          :delay="item.delay"
          :show-progress="item.showProgress"
          :width="item.width"
          @close="() => handleClose(item.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NotificationItem from "./NotificationItem.vue";
import { getUniqueId } from "lew-ui/utils";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  content: string;
  delay: number;
  showProgress: boolean;
  width: number | string;
}

const notifications = ref<NotificationItem[]>([]);
const width = ref(0);

const updateWidth = () => {
  width.value = notifications.value.reduce((max, item: NotificationItem) => {
    return Math.max(max, Number(item.width));
  }, 0);
};

const add = (
  type: string,
  title: string,
  content: string,
  delay: number,
  showProgress: boolean,
  width: number | string
) => {
  const id = getUniqueId();
  notifications.value.unshift({
    id,
    type,
    title,
    content,
    delay,
    showProgress,
    width,
  });

  if (delay > 0) {
    setTimeout(() => {
      handleClose(id);
    }, delay);
  }
  if (timer) {
    clearTimeout(timer);
  }
  updateWidth();
  return id;
};

let timer: NodeJS.Timeout | null = null;

const handleClose = (id: string) => {
  const index = notifications.value.findIndex((item) => item.id === id);
  if (index > -1) {
    notifications.value.splice(index, 1);
  }
  if (timer) {
    clearTimeout(timer);
  }
  if (notifications.value.length === 0) {
    timer = setTimeout(() => {
      updateWidth();
    }, 350);
  } else {
    updateWidth();
  }
};

defineExpose({
  add,
  handleClose,
});
</script>

<style lang="scss">
#lew-notification {
  position: fixed;
  gap: 12px;
  right: 0px;
  top: 0px;
  z-index: 99999;
  overflow-y: auto;
  overflow-x: hidden;
  width: auto;
  height: 100vh;
  padding: 20px 15px;
  box-sizing: border-box;
}

.notification-wrapper {
  position: relative;
  width: 100%;
}

.notification-move,
.notification-enter-active,
.notification-leave-active {
  transition: all var(--lew-form-transition-bezier);
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-active {
  position: absolute;
  width: 100%;
  right: 0;
}
</style>
