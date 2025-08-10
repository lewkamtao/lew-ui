<script setup lang="ts">
import { Trash } from "lucide-vue-next";
import { h } from "vue";

function ok() {
  LewMessage.success("Confirmed");
}
function cancel() {
  LewMessage.info("Cancelled");
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
    ok-text="Delete"
    cancel-text="Cancel"
    :ok="ok"
    :cancel="cancel"
    trigger="hover"
  >
    <lew-button text="Hover to trigger" type="text" color="red" />
  </lew-popok>
</template>
