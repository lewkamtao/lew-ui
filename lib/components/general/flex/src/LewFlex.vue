<script setup lang="ts">
import type { LewXAlignment, LewYAlignment } from 'lew-ui/types'
import type { CSSProperties } from 'vue'
import { any2px } from 'lew-ui/utils'
import { computed } from 'vue'
import { flexProps } from './props'

const props = defineProps(flexProps)

const emit = defineEmits<{
  resize: [size: { width: number, height: number }]
  click: [event: MouseEvent]
}>()

const alignmentMap: Record<LewXAlignment | LewYAlignment, string> = {
  start: 'flex-start',
  left: 'flex-start',
  end: 'flex-end',
  right: 'flex-end',
  center: 'center',
  top: 'flex-start',
  bottom: 'flex-end',
}

function getJustifyContent(): string {
  if (props.mode) {
    return `space-${props.mode}`
  }
  const mainAxis = props.direction === 'x' ? props.x : props.y
  return alignmentMap[mainAxis] || 'center'
}

function getAlignItems(): string {
  const crossAxis = props.direction === 'x' ? props.y : props.x
  return alignmentMap[crossAxis] || 'center'
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}

// Computed

const styleObject = computed(
  (): CSSProperties => {
    const gap = any2px(props.gap)
    const width = props.width ? any2px(props.width) : undefined

    return {
      display: 'flex',
      flexDirection: props.direction === 'x' ? 'row' : 'column',
      flexWrap: props.wrap ? 'wrap' : 'nowrap',
      justifyContent: getJustifyContent(),
      alignItems: getAlignItems(),
      gap: `${gap}`,
      width,
      boxSizing: 'border-box',
    }
  },
)
</script>

<template>
  <div class="lew-flex" :style="styleObject" @click="handleClick">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.lew-flex {
  width: 100%;
  box-sizing: border-box;
}
</style>
