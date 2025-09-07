<script setup lang="ts">
import { LewTextTrim } from 'lew-ui'
import { formatComponent } from 'lew-ui/utils/render'

defineProps({
  renderFn: {
    type: null,
    required: true,
  },
  type: {
    type: String,
    default: '',
  },
  componentProps: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <LewTextTrim
    v-if="type === 'text-trim' && typeof renderFn === 'string'"
    v-bind="componentProps"
    :text="renderFn"
  />
  <component :is="formatComponent(renderFn)" v-else />
</template>
