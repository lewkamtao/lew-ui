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
const alignmentMap = {
  start: 'flex-start',
  left: 'flex-start',
  end: 'flex-end',
  right: 'flex-end',
  center: 'center',
  top: 'flex-start',
  bottom: 'flex-end'
}

function getJustifyContent() {
  if (props.mode) return `space-${props.mode}`
  const mainAxis = props.direction === 'x' ? props.x : props.y
  return alignmentMap[mainAxis] || 'center'
}

function getAlignItems() {
  const crossAxis = props.direction === 'x' ? props.y : props.x
  return alignmentMap[crossAxis] || 'center'
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
