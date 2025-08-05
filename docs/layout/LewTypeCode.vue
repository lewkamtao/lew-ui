<script setup lang="ts">
defineProps({
  code: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="popover-body">
    <div class="pre-box">
      <highlightjs autodetect :code="code" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popover-body {
  box-sizing: border-box;
  max-width: 500px;
  border-radius: var(--lew-border-radius-small);
  overflow: hidden;

  :deep(.pre-box) {
    .hljs {
      outline: none !important;
      border: none !important;
    }
  }
}
</style>
