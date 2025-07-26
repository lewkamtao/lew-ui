<script setup lang="ts">
import { LewTextTrim } from 'lew-ui'
import { formatComponent } from 'lew-ui/utils'

defineProps({
  renderFn: {
    type: Object,
    required: true,
  },
  type: {
    type: String as PropType<'text-trim'>,
    default: '',
  },
  componentProps: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
})
</script>

<template>
  <LewTextTrim v-if="type === 'text-trim' && typeof renderFn === 'string'" v-bind="componentProps" :text="renderFn" />
  <component :is="formatComponent(renderFn)" v-else />
</template>
