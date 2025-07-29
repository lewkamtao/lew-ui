<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { LewFlex, LewTooltip, locale } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
import { imageProps } from './props'

const props = defineProps(imageProps)
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const imageStyleObject = computed(() => {
  const { width, height } = props
  return {
    width: any2px(width),
    height: any2px(height),
  }
})

const { isLoading, error } = useImage({
  src: props.src as string,
})
</script>

<template>
  <LewFlex
    gap="0"
    x="center"
    y="center"
    class="lew-image-wrapper"
    :style="imageStyleObject"
  >
    <div v-if="isLoading || loading || !src" class="skeletons" />
    <template v-else-if="error">
      <slot v-if="$slots.error" name="error" />
      <img
        v-else
        v-tooltip="{
          content: locale.t('image.fail'),
          trigger: 'mouseenter',
        }"
        class="lew-image-fail-icon"
        src="./image_fail_icon.svg"
        :alt="locale.t('image.fail')"
      >
    </template>
    <template v-else>
      <div class="lew-image-box">
        <img
          class="lew-image"
          :src
          :lazy="lazy"
          :style="{
            'object-fit': objectFit,
            'object-position': objectPosition,
          }"
          :alt
        >
      </div>
    </template>
  </LewFlex>
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
    overflow: hidden;
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
