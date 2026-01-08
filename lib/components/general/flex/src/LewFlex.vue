<script setup lang="ts">
// 1. 类型导入
import type { CSSProperties } from 'vue'

// 2. 工具函数导入
import { any2px } from 'lew-ui/utils'

// 3. 组件配置导入
import { flexProps } from './props'

// Props
const props = defineProps(flexProps)

// 计算属性
const flexClass = computed(() => {
  const classes = ['lew-flex']

  classes.push(`lew-flex--${props.direction || 'x'}`)

  if (props.wrap) {
    classes.push('lew-flex--wrap')
  }

  if (props.mode) {
    classes.push(`lew-flex--${props.mode}`)
  }
  else {
    const mainAxis = props.direction === 'x' ? props.x : props.y
    const crossAxis = props.direction === 'x' ? props.y : props.x

    if (mainAxis) {
      classes.push(`lew-flex--justify-${mainAxis}`)
    }

    if (crossAxis) {
      classes.push(`lew-flex--align-${crossAxis}`)
    }
  }

  return classes.join(' ')
})

const flexStyle = computed((): CSSProperties => {
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
})
</script>

<template>
  <div :class="flexClass" :style="flexStyle">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.lew-flex {
  display: flex;
  box-sizing: border-box;
  width: 100%;

  &--x {
    flex-direction: row;
  }

  &--y {
    flex-direction: column;
  }

  &--wrap {
    flex-wrap: wrap;
  }

  &--around {
    justify-content: space-around;
  }

  &--between {
    justify-content: space-between;
  }

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
