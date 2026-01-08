<script setup lang="ts">
// 1. 类型导入
import type { CSSProperties } from 'vue'

// 2. 工具函数导入
import { getColorType } from 'lew-ui/utils'

// 3. 组件配置导入
import { markProps } from './props'

// Props
const props = defineProps(markProps)

// 计算属性
const markClass = computed(() => {
  const classes = ['lew-mark']
  if (props.round) {
    classes.push('lew-mark--round')
  }
  if (props.cursor === 'pointer') {
    classes.push('lew-mark--pointer')
  }
  return classes.join(' ')
})

const markStyle = computed((): CSSProperties => {
  const { color, bold } = props
  const resolvedColor = getColorType(color) || 'blue'

  return {
    '--mark-color': `var(--lew-color-${resolvedColor}-dark)`,
    '--mark-bg-color': `var(--lew-color-${resolvedColor}-light)`,
    'fontWeight': bold || 400,
    'cursor': props.cursor || 'default',
  }
})
</script>

<template>
  <span :class="markClass" :style="markStyle">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.lew-mark {
  display: inline;
  border-radius: var(--lew-border-radius-mini);
  padding: 2px 6px;
  margin: 0px 3px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  color: var(--mark-color, var(--lew-color-blue-dark));
  background-color: var(--mark-bg-color, var(--lew-color-blue-light));

  &--round {
    border-radius: 20px;
  }

  &--pointer {
    cursor: pointer;
  }
}
</style>
