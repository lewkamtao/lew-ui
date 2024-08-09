<script setup lang="ts">
import { any2px } from 'lew-ui/utils'
import { collapseProps } from './props'
const modelValue = defineModel()
provide('expandKeys', modelValue)
defineProps(collapseProps)
</script>
<template>
  <div :style="{ width: any2px(width), gap: any2px(gap) }" class="lew-collapse">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.lew-collapse {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}
</style>
