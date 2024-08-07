<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { any2px } from 'lew-ui/utils'
import { imageProps } from './props'

const props = defineProps(imageProps)
const { isLoading, error } = useImage({ src: props.src })

const imageStyleObject = computed(() => {
  const { width, height } = props
  return {
    width: any2px(width),
    height: any2px(height)
  }
})

const getIconSize = computed(() => {
  const { width, height } = props
  return Math.min(Number(width), Number(height)) * 0.45 + 'px'
})
</script>

<template>
  <lew-flex gap="0" class="lew-image-wrapper" :style="imageStyleObject">
    <div class="skeletons" v-if="isLoading || loading"></div>
    <template v-else-if="error">
      <slot v-if="$slots.error" name="error" />
      <lew-icon stroke-width="1" class="lew-image-icon" v-else type="image" :size="getIconSize" />
    </template>
    <img
      v-else
      :src
      class="lew-image"
      :lazy="lazy"
      :style="{
        'object-fit': objectFit,
        'object-position': objectPosition
      }"
    />
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-image-wrapper {
  background-color: var(--lew-bgcolor-2);
  .lew-image-icon {
    opacity: 0.4;
  }
  .lew-image {
    width: 100%;
    height: 100%;
    animation: img-enter 0.25s ease;
    animation-fill-mode: forwards;
    opacity: 0;
  }
  @keyframes img-enter {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
