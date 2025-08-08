<script setup lang="ts">
import type { LewCollapseModelValue } from 'lew-ui/types'
import { any2px } from 'lew-ui/utils'
import { computed, provide, watch } from 'vue'
import { collapseProps } from './props'

const props = defineProps(collapseProps)

const emit = defineEmits<{
  change: [value: LewCollapseModelValue]
}>()

const modelValue = defineModel<LewCollapseModelValue>()

// Provide/Inject
provide('expandKeys', modelValue)

// Computed
const collapseStyle = computed(() => ({
  width: any2px(props.width),
}))

// Watch for changes and emit
watch(
  modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      emit('change', newValue)
    }
  },
  { deep: true },
)
</script>

<template>
  <div :style="collapseStyle" class="lew-collapse">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.lew-collapse {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}
</style>
