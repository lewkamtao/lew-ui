<script lang="ts" setup>
function open() {
  LewMessage.warning({
    id: 'concert-ticket-alert',
    content:
      'Concert tickets are about to go on sale! Stay tuned to the official ticketing platform to secure your spot.',
    duration: 300000,
  })
}
function close() {
  LewMessage.close({ id: 'concert-ticket-alert' })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button round @click="open()">
      Show Ticket Alert
    </lew-button>
    <lew-button round color="warning" @click="close()">
      Dismiss Alert
    </lew-button>
  </lew-flex>
</template>
