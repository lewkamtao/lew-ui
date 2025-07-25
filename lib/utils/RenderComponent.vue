<script setup lang="ts">
import { LewTextTrim } from 'lew-ui'
import { formatComponent } from 'lew-ui/utils'

defineProps({
  renderFn: {
    type: [String, Number, Boolean, Object, Array, Function, Symbol, undefined] as PropType<any>,
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
  <LewTextTrim
    v-if="type === 'text-trim' && typeof renderFn === 'string'"
    v-bind="componentProps"
    :text="renderFn"
  />
  <component
    :is="formatComponent(renderFn)"
    v-else
  />
</template>
