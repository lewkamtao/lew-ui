<script setup lang="ts">
import { inputNumberProps } from './props'
import { any2px } from 'lew-ui/utils'

const props = defineProps(inputNumberProps)

const classObject = computed(() => {
  return {
    [`lew-flex-${props.direction}`]: props.direction,
    'lew-flex-wrap': props.wrap,
    [`lew-flex-x-${props.x}`]: props.x,
    [`lew-flex-y-${props.y}`]: props.y,
    [`lew-flex-mode-${props.mode}`]: props.mode
  }
})

const styleObject = computed(() => {
  const gap = any2px(props.gap)
  const width = any2px(props.width)
  return {
    gap: `${gap}`,
    width: `${width}`
  }
})
</script>

<template>
  <div class="lew-flex" :class="classObject" :style="styleObject">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.lew-flex {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
}
.lew-flex-wrap {
  flex-wrap: wrap;
}
.lew-flex-x {
  flex-direction: row;
}
.lew-flex-y {
  flex-direction: column;
}
.lew-flex-x.lew-flex-x-start {
  justify-content: flex-start;
}
.lew-flex-x.lew-flex-x-center {
  justify-content: center;
}
.lew-flex-x.lew-flex-x-end {
  justify-content: flex-end;
}

.lew-flex-x.lew-flex-y-start {
  align-items: flex-start;
}
.lew-flex-x.lew-flex-y-center {
  align-items: center;
}
.lew-flex-x.lew-flex-y-end {
  align-items: flex-end;
}

.lew-flex-y.lew-flex-x-start {
  align-items: flex-start;
}
.lew-flex-y.lew-flex-x-center {
  align-items: center;
}
.lew-flex-y.lew-flex-x-end {
  align-items: flex-end;
}

.lew-flex-y.lew-flex-y-start {
  justify-content: flex-start;
}
.lew-flex-y.lew-flex-y-center {
  justify-content: center;
}
.lew-flex-y.lew-flex-y-end {
  justify-content: flex-end;
}

.lew-flex-x.lew-flex-mode-between {
  justify-content: space-between;
}
.lew-flex-x.lew-flex-mode-around {
  justify-content: space-around;
}
.lew-flex-y.lew-flex-mode-between {
  justify-content: space-between;
}
.lew-flex-y.lew-flex-mode-around {
  justify-content: space-around;
}
</style>
