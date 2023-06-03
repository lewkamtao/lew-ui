<script setup lang="ts">
import { any2px } from 'lew-ui/utils'
import { titleProps } from './title'

const props = defineProps(titleProps)

const titleStyle = computed(() => {
  const { bold, type } = props
  const size = any2px(props.size)
  const typeStyle = type
    ? `
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    color: transparent;background-image: linear-gradient(-252deg, var(--lew-${type}-color-start),var(--lew-${type}-color-end))`
    : ''
  return `font-weight:${bold};font-size:${size};${typeStyle}`
})
</script>

<template>
  <div class="lew-title" :style="titleStyle">
    <slot />
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
}
</style>
