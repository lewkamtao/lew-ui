<script setup lang="ts">
import LewCodeHighlighter from './LewCodeHighlighter.vue'

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
      <LewCodeHighlighter :code="code" lang="typescript" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popover-body {
  box-sizing: border-box;
  max-width: 500px;
  border-radius: var(--lew-border-radius-small);
  overflow: hidden;
}
</style>
