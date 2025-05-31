<template>
  <div id="lew-notification" class="lew-scrollbar">
    <TransitionGroup name="notification">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="notification-wrapper"
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

  return id;
};

const handleClose = (id: string) => {
  const index = notifications.value.findIndex((item) => item.id === id);
  if (index > -1) {
    notifications.value.splice(index, 1);
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
  height: 100vh;
  padding: 20px 15px;
  box-sizing: border-box;
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
}
</style>
