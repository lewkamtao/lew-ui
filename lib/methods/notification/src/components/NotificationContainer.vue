<template>
  <div id="lew-notification">
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
import { ref } from 'vue'
import NotificationItem from './NotificationItem.vue'
import { getUniqueId } from 'lew-ui/utils'

interface NotificationItem {
  id: string
  type: string
  title: string
  content: string
  delay: number
  showProgress: boolean
  width: number | string
}

const notifications = ref<NotificationItem[]>([])

const add = (
  type: string,
  title: string,
  content: string,
  delay: number,
  showProgress: boolean,
  width: number | string
) => {
  const id = getUniqueId()
  notifications.value.unshift({
    id,
    type,
    title,
    content,
    delay,
    showProgress,
    width
  })

  if (delay > 0) {
    setTimeout(() => {
      handleClose(id)
    }, delay)
  }
  
  return id
}

const handleClose = (id: string) => {
  const index = notifications.value.findIndex((item) => item.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

defineExpose({
  add,
  handleClose
})
</script>

<style lang="scss">
#lew-notification {
  position: fixed;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  right: 30px;
  top: 20px;
  z-index: 99999;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
