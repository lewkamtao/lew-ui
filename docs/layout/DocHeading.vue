<script setup lang="ts">
import type { LewColor } from 'lew-ui'
import type { CSSProperties } from 'vue'
import { any2px } from 'lew-ui/utils'

const props = withDefaults(
  defineProps<{
    id?: string
    text?: string
    size?: string | number
    bold?: number
    color?: LewColor
  }>(),
  {
    size: '24px',
    bold: 500,
  },
)

const titleClass = computed(() => {
  const classes = ['doc-heading']
  if (props.color)
    classes.push(`doc-heading--color-${props.color}`)
  return classes.join(' ')
})

const titleStyle = computed((): CSSProperties => {
  const style: CSSProperties = {
    fontWeight: props.bold,
    fontSize: any2px(props.size),
  }
  if (props.color) {
    style.backgroundImage
      = `linear-gradient(-252deg, var(--lew-color-${props.color}-dark), var(--lew-color-${props.color}))`
  }
  return style
})
</script>

<template>
  <div :id="id" :class="titleClass" :style="titleStyle">
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else />
  </div>
</template>

<style lang="scss" scoped>
.doc-heading {
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
