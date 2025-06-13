<script setup lang="ts">
const options = ref([
  {
    label: 'Edit',
    onClick: () => {
      LewMessage.info('Edit')
    }
  },
  {
    label: 'Delete',
    onClick: () => {
      LewMessage.info('Delete')
    }
  },
  {
    label: 'Copy',
    onClick: () => {
      LewMessage.info('Copy')
    }
  },
  {
    label: 'Download',
    onClick: () => {
      LewMessage.info('Download')
    }
  }
])
</script>
<template>
  <lew-action-box :options="options" />
</template>
