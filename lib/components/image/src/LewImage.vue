<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { any2px } from 'lew-ui/utils'
import { imageProps } from './props'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const props = defineProps(imageProps)
const { isLoading, error } = useImage({ src: props.src || '' })

const imageStyleObject = computed(() => {
  const { width, height } = props
  return {
    width: any2px(width),
    height: any2px(height)
  }
})

onMounted(() => {
  Fancybox.bind('[data-fancybox]', { Hash: false })
})
</script>
<template>
  <lew-flex gap="0" class="lew-image-wrapper" :style="imageStyleObject">
    <div class="skeletons" v-if="isLoading || loading"></div>
    <template v-else-if="error">
      <slot v-if="$slots.error" name="error" />
      <img
        v-else
        class="lew-image-fail-icon"
        src="./image_fail_icon.svg"
        alt="图片加载失败"
      />
    </template>
    <template v-else>
      <div v-if="!previewKey" class="lew-image-box">
        <img
          class="lew-image"
          :src
          :lazy="lazy"
          :style="{
            'object-fit': objectFit,
            'object-position': objectPosition
          }"
          :alt
        />
      </div>
      <a v-else :href="src" :data-fancybox="previewKey" class="lew-image-box">
        <img
          class="lew-image"
          :src
          :lazy="lazy"
          :style="{
            'object-fit': objectFit,
            'object-position': objectPosition
          }"
          :alt
        />
      </a>
    </template>
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-image-wrapper {
  background-color: var(--lew-bgcolor-2);
  .lew-image-fail-icon {
    width: 50%;
    height: auto;
  }
  .lew-image-icon {
    opacity: 0.4;
  }
  .lew-image-box {
    width: 100%;
    height: 100%;
    .lew-image {
      width: 100%;
      height: 100%;
      animation: img-enter 0.25s ease;
      animation-fill-mode: forwards;
      opacity: 0;
    }
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
