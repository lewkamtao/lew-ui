<script setup lang="ts">
import { computed } from 'vue'
import { any2px } from 'lew-ui/utils'
import { collapseProps } from './props'

const props = defineProps(collapseProps)
const modelValue = defineModel()

provide('expandKeys', modelValue)

const collapseStyle = computed(() => ({
  width: any2px(props.width),
}))
</script>

<template>
  <div :style="collapseStyle" class="lew-collapse">
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
