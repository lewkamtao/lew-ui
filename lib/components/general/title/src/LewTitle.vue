<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { any2px } from 'lew-ui/utils'
import { titleEmits } from './emits'
import { titleProps } from './props'

const props = defineProps(titleProps)
const emit = defineEmits(titleEmits)

const titleClass = computed(() => {
  const classes = ['lew-title']

  if (props.color) {
    classes.push(`lew-title--color-${props.color}`)
  }

  return classes.join(' ')
})

const titleStyle = computed(
  (): CSSProperties => {
    const { bold, color, size } = props
    const fontSize = any2px(size)

    const style: CSSProperties = {
      fontWeight: bold,
      fontSize,
    }

    if (color) {
      style.backgroundImage = `linear-gradient(-252deg, var(--lew-color-${color}-dark), var(--lew-color-${color}))`
    }

    return style
  },
)

function handleClick(event: MouseEvent): void {
  emit('click', event)
}
</script>

<template>
  <div :class="titleClass" :style="titleStyle" @click="handleClick">
    <template v-if="props.text">
      {{ props.text }}
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
    }
  }
}
</style>
