<script setup lang="ts">
import { Trash } from 'lucide-vue-next'
import { h } from 'vue'

function onCancel() {
  LewMessage.info('Cancelled')
}
function onOk() {
  LewMessage.success('Confirmed')
}
</script>

<template>
  <lew-popok
    :icon="h(Trash, { size: 24, color: 'red' })"
    width="400px"
    title="Delete Confirmation"
    type="error"
    content="This action cannot be undone. Please confirm!"
    placement="bottom-start"
    :footer-buttons="[
      { props: { type: 'text', color: 'gray', size: 'small', text: 'Cancel', request: onCancel } },
      { props: { type: 'fill', color: 'red', size: 'small', text: 'Delete' } },
    ]"
    trigger="hover"
    @ok="onOk"
  >
    <lew-button text="Hover to trigger" type="text" color="red" />
  </lew-popok>
</template>
