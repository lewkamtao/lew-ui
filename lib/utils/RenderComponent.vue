<script setup lang="ts">
import { formatComponent } from 'lew-ui/utils'
import { isVNode } from 'vue'

defineProps({
  renderFn: {
    type: [Object, Function],
    required: true,
  },
  onClick: {
    type: Function,
  },
})
</script>

<template>
  <component
    :is="formatComponent(renderFn)"
    v-if="isVNode(renderFn)"
    @click="onClick?.()"
  />
</template>
