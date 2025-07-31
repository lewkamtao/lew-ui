<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { any2px } from 'lew-ui/utils'
import { titleProps, type TitleProps } from './props'

// Types
interface TitleEmits {
  click: [event: MouseEvent]
}

// Props & Emits
const props = defineProps(titleProps)
const emit = defineEmits<TitleEmits>()

// Computed
const titleStyle = computed((): CSSProperties | string => {
  const { bold, color, size } = props
  const fontSize = any2px(size)
  
  if (color) {
    // Use string style for gradient background
    return `font-weight: ${bold}; font-size: ${fontSize}; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; color: transparent; background-image: linear-gradient(-252deg, var(--lew-color-${color}-dark), var(--lew-color-${color}));`
  }
  
  return {
    fontWeight: bold,
    fontSize,
  }
})

// Methods
function handleClick(event: MouseEvent): void {
  emit('click', event)
}
</script>

<template>
  <div class="lew-title" :style="titleStyle" @click="handleClick">
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else />
  </div>
</template>

<style lang="scss" scoped>
.lew-title {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--lew-text-color-0);
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
