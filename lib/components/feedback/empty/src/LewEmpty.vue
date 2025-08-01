<script lang="ts" setup>
import { any2px } from 'lew-ui/utils'
import { computed } from 'vue'
import { emptyProps } from './props'

// Types
interface EmptyEmits {
  click: [event: MouseEvent]
}

// Props & Emits
const props = defineProps(emptyProps)
const emit = defineEmits<EmptyEmits>()

// Computed
const iconSrc = computed(() => {
  return new URL(`../icon/icon_${props.type}.svg`, import.meta.url).href
})

const emptyStyleObject = computed(() => {
  const { width, height, padding } = props
  return {
    width: any2px(width),
    height: any2px(height),
    padding: any2px(padding),
  }
})

const titleStyle = computed(() => ({
  fontSize: any2px(props.fontSize),
}))

// Methods
function handleClick(event: MouseEvent): void {
  emit('click', event)
}
</script>

<template>
  <div class="lew-empty-container" :style="emptyStyleObject" @click="handleClick">
    <img :src="iconSrc" :alt="props.title" class="lew-empty-icon">
    <div v-if="props.title" :style="titleStyle" class="lew-empty-title">
      {{ props.title }}
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.lew-empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  .lew-empty-icon {
    width: 100%;
    height: auto;
    max-width: 200px;
    transition: transform 0.2s ease;
  }

  .lew-empty-title {
    margin-top: 16px;
    color: var(--lew-text-color-5);
    text-align: center;
    line-height: 1.5;
  }
}

:global(.lew-dark) .lew-empty-container .lew-empty-icon {
  opacity: 0.6;
}
</style>
