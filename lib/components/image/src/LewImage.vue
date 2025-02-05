<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { any2px } from 'lew-ui/utils'
import { LewFlex, LewTooltip } from 'lew-ui'
import { imageProps } from './props'
import {locale } from 'lew-ui'
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const props = defineProps(imageProps)

const imageStyleObject = computed(() => {
  const { width, height } = props
  return {
    width: any2px(width),
    height: any2px(height)
  }
})

let _loading = ref()
let _error = ref()

const init = () => {
  const { isLoading, error } = useImage({
    src: props.src as string
  })
  _loading = isLoading
  _error = error
}

init()

watch(
  () => props.src,
  () => {
    const { isLoading, error } = useImage({
      src: props.src as string
    })
    _loading = isLoading
    _error = error
  }
)
</script>
<template>
  <lew-flex gap="0" x="center" y="center" class="lew-image-wrapper" :style="imageStyleObject">
    <div class="skeletons" v-if="_loading || loading || !src"></div>
    <template v-else-if="_error">
      <slot v-if="$slots.error" name="error" />
      <img
        v-else
        v-tooltip="{
          content:locale.t('image.fail'),
          trigger: 'mouseenter'
        }"
        class="lew-image-fail-icon"
        src="./image_fail_icon.svg"
        :alt="locale.t('image.fail')"
      />
    </template>
    <template v-else>
      <div class="lew-image-box">
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
