<script lang="ts" setup>
import { getUniqueId } from 'lew-ui/utils'

import NotificationItem from './NotificationItem.vue'

let timer: NodeJS.Timeout | null = null

interface NotificationItemType {
  id: string
  type: string
  title: string
  content: string
  duration: number
  showProgress: boolean
  width: number | string
}

const notifications = ref<NotificationItemType[]>([])
const width = ref(0)

function updateWidth() {
  width.value = notifications.value.reduce(
    (max, item: NotificationItemType) => {
      return Math.max(max, Number(item.width))
    },
    0,
  )
}

function add(
  type: string,
  title: string,
  content: string,
  duration: number,
  showProgress: boolean,
  width: number | string,
) {
  const id = getUniqueId()
  document
    .getElementById('lew-notification')
    ?.classList
    .remove('notification-hidden')
  notifications.value.unshift({
    id,
    type,
    title,
    content,
    duration,
    showProgress,
    width,
  })

  if (duration > 0) {
    setTimeout(() => {
      handleClose(id)
    }, duration)
  }
  if (timer) {
    clearTimeout(timer)
  }
  updateWidth()
  return id
}

function handleClose(id: string) {
  const index = notifications.value.findIndex(item => item.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
  if (timer) {
    clearTimeout(timer)
  }
  if (notifications.value.length === 0) {
    timer = setTimeout(() => {
      updateWidth()
      document
        .getElementById('lew-notification')
        ?.classList
        .add('notification-hidden')
    }, 350)
  }
  else {
    updateWidth()
  }
}

defineExpose({
  add,
  handleClose,
})
</script>

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
#lew-notification {
  position: fixed;
  gap: 12px;
  right: 0px;
  top: 0px;
  z-index: 99999;
  overflow-y: auto;
  overflow-x: hidden;
  width: auto;
  max-height: 100vh;
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
.notification-hidden {
  display: none;
}
</style>
