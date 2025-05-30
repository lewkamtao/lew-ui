<script lang="ts" setup>
import { getUniqueId } from 'lew-ui/utils'
let notificationMap: Record<string, any> = reactive({})
const open = () => {
  let id = getUniqueId()
  notificationMap[id] = LewNotification.info({
    title: `Notification ${id}`,
    width: 400,
    content:
      'A new system update is ready to install. Please update within 1 minute.',
    delay: 0
  })
}
const close = (id: string) => {
  notificationMap[id].close()
  delete notificationMap[id]
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button text="Open" type="light" color="blue" @click="open" />
    <lew-flex>
      <lew-button
        v-for="(item, index) in Object.keys(notificationMap)"
        :key="index"
        :text="`Close ${item}`"
        type="light"
        color="orange"
        @click="close(item)"
      />
    </lew-flex>
  </lew-flex>
</template>
