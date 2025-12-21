<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { any2px } from 'lew-ui/utils'
import { titleEmits } from './emits'
import { titleProps } from './props'

const props = defineProps(titleProps)
const emit = defineEmits(titleEmits)

// 计算类名（静态配置用 class）
const titleClass = computed(() => {
  const classes = ['lew-title']

  // Color 渐变模式（静态配置在 CSS 中，动态 background-image 在 style 中）
  if (props.color) {
    classes.push(`lew-title--color-${props.color}`)
  }

  return classes.join(' ')
})

// 只计算动态样式（fontSize, fontWeight, 以及 color 时的 background-image）
const titleStyle = computed(
  (): CSSProperties => {
    const { bold, color, size } = props
    const fontSize = any2px(size)

    const style: CSSProperties = {
      fontWeight: bold,
      fontSize,
    }

    // Color 渐变背景（动态生成）
    if (color) {
      style.backgroundImage = `linear-gradient(-252deg, var(--lew-color-${color}-dark), var(--lew-color-${color}))`
    }

    return style
  },
)

// Methods
function handleClick(event: MouseEvent): void {
  emit('click', event)
}
</script>

<template>
  <div :class="titleClass" :style="titleStyle" @click="handleClick">
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

  // Color 渐变模式（静态配置，使用 SCSS 循环生成所有颜色）
  $colors: (
    'primary',
    'success',
    'error',
    'warning',
    'info',
    'normal',
    'danger',
    'blue',
    'gray',
    'red',
    'green',
    'yellow',
    'indigo',
    'purple',
    'pink',
    'orange',
    'cyan',
    'teal',
    'mint',
    'brown',
    'black'
  );

  @each $color in $colors {
    &--color-#{$color} {
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;
      color: transparent;
      // background-image 在 titleStyle 中动态设置
    }
  }
}
</style>
