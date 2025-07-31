<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { getColorType } from 'lew-ui/utils'
import { computed } from 'vue'
import { markProps } from './props'

// Types
interface MarkEmits {
  click: [event: MouseEvent]
}

// Props & Emits
const props = defineProps(markProps)
const emit = defineEmits<MarkEmits>()

// Computed
const markStyle = computed((): CSSProperties => {
  const { color, round, bold, cursor } = props
  const resolvedColor = getColorType(color) || 'blue'

  return {
    borderRadius: round ? '20px' : 'var(--lew-border-radius-mini)',
    fontWeight: bold || 400,
    color: `var(--lew-color-${resolvedColor}-dark)`,
    backgroundColor: `var(--lew-color-${resolvedColor}-light)`,
    cursor: cursor || 'default',
  }
})

// Methods
function handleClick(event: MouseEvent): void {
  emit('click', event)
}
</script>

<template>
  <span class="lew-mark" :style="markStyle" @click="handleClick">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.lew-mark {
  display: inline;
  border-radius: var(--lew-border-radius-small);
  padding: 2px 6px;
  margin: 0px 3px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.lew-mark-to {
  cursor: pointer;
}

.lew-mark-round {
  border-radius: 20px;
}
</style>
