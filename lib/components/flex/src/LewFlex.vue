<script setup lang="ts">
import { flexProps } from './props'
import { any2px } from 'lew-ui/utils'
import { CSSProperties } from 'vue'

const props = defineProps(flexProps)

const styleObject = computed((): CSSProperties => {
  const gap = any2px(props.gap)
  const width = any2px(props.width)
  return {
    display: 'flex',
    flexDirection: props.direction === 'x' ? 'row' : 'column',
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
    justifyContent: getJustifyContent(),
    alignItems: getAlignItems(),
    gap: `${gap}`,
    width,
    boxSizing: 'border-box'
  }
})

function getJustifyContent() {
  if (props.mode === 'between') return 'space-between'
  if (props.mode === 'around') return 'space-around'
  if (props.direction === 'x') {
    return props.x === 'start' ? 'flex-start' : props.x === 'end' ? 'flex-end' : 'center'
  }
  return props.y === 'start' ? 'flex-start' : props.y === 'end' ? 'flex-end' : 'center'
}

function getAlignItems() {
  if (props.direction === 'x') {
    return props.y === 'start' ? 'flex-start' : props.y === 'end' ? 'flex-end' : 'center'
  }
  return props.x === 'start' ? 'flex-start' : props.x === 'end' ? 'flex-end' : 'center'
}
</script>

<template>
  <div class="lew-flex" :style="styleObject">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.lew-flex {
  width: 100%;
}
</style>
