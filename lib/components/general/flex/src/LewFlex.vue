<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { any2px } from 'lew-ui/utils'
import { flexProps } from './props'

const props = defineProps(flexProps)

// 计算类名（静态配置用 class）
const flexClass = computed(() => {
  const classes = ['lew-flex']

  // Direction
  classes.push(`lew-flex--${props.direction || 'x'}`)

  // Wrap
  if (props.wrap) {
    classes.push('lew-flex--wrap')
  }

  // Mode (justify-content)
  if (props.mode) {
    classes.push(`lew-flex--${props.mode}`)
  }
  else {
    // 根据 direction 和 x/y 设置 justify-content 和 align-items
    const mainAxis = props.direction === 'x' ? props.x : props.y
    const crossAxis = props.direction === 'x' ? props.y : props.x

    // Justify-content (main axis)
    if (mainAxis) {
      classes.push(`lew-flex--justify-${mainAxis}`)
    }

    // Align-items (cross axis)
    if (crossAxis) {
      classes.push(`lew-flex--align-${crossAxis}`)
    }
  }

  return classes.join(' ')
})

// 只计算动态样式（gap 和 width）
const flexStyle = computed(
  (): CSSProperties => {
    const style: CSSProperties = {}

    const gap = any2px(props.gap)
    if (gap) {
      style.gap = gap
    }

    const width = props.width ? any2px(props.width) : undefined
    if (width) {
      style.width = width
    }

    return style
  },
)
</script>

<template>
  <div :class="flexClass" :style="flexStyle">
    <pre v-show="false">{{ flexStyle }}</pre>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.lew-flex {
  display: flex;
  box-sizing: border-box;
  width: 100%;

  // Direction 配置（静态）
  &--x {
    flex-direction: row;
  }

  &--y {
    flex-direction: column;
  }

  // Wrap 配置（静态）
  &--wrap {
    flex-wrap: wrap;
  }

  // Mode 配置（justify-content，静态）
  &--around {
    justify-content: space-around;
  }

  &--between {
    justify-content: space-between;
  }

  // Justify-content 配置（main axis，静态）
  &--justify-start,
  &--justify-left {
    justify-content: flex-start;
  }

  &--justify-end,
  &--justify-right {
    justify-content: flex-end;
  }

  &--justify-center {
    justify-content: center;
  }

  // Align-items 配置（cross axis，静态）
  &--align-start,
  &--align-top {
    align-items: flex-start;
  }

  &--align-end,
  &--align-bottom {
    align-items: flex-end;
  }

  &--align-center {
    align-items: center;
  }
}
</style>
