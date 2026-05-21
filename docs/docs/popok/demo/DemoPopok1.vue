<script setup lang="ts">
function onCancel() {
  LewMessage.info('Cancelled')
}
function onOk() {
  LewMessage.success('Confirmed')
}
</script>

<template>
  <lew-popok
    width="400px"
    title="Delete Project"
    content="This action cannot be undone. Are you sure you want to delete this project?"
    placement="bottom-start"
    :footer-buttons="[
      { props: { type: 'text', color: 'gray', size: 'small', text: 'Cancel', request: onCancel } },
      { props: { type: 'fill', color: 'red', size: 'small', text: 'Delete' } },
    ]"
    @ok="onOk"
  >
    <lew-button text="Delete Project" type="ghost" color="red" />
  </lew-popok>
</template>
