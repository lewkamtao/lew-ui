<script setup lang="ts">
// 1. 第三方库导入
import { useImage } from "@vueuse/core";

// 2. 组件导入
import { LewFlex, LewTooltip, locale } from "lew-ui";

// 3. 工具函数导入
import { any2px } from "lew-ui/utils";

// 4. 组件配置导入
import { imageProps } from "./props";

// Props
const props = defineProps(imageProps);

// Composables
const app = getCurrentInstance()?.appContext.app;
if (app && !app.directive("tooltip")) {
  app.use(LewTooltip);
}

const imageOptions = ref({ src: props.src });

watch(
  () => props.src,
  (newVal: string) => {
    imageOptions.value.src = newVal;
  }
);

const { isLoading, error } = useImage(imageOptions);

// 计算属性
const imageStyle = computed(() => {
  const { width, height } = props;
  return {
    width: any2px(width),
    height: any2px(height),
  };
});

const imageInnerStyle = computed(() => ({
  objectFit: props.objectFit,
  objectPosition: props.objectPosition,
}));

const showSkeleton = computed(
  () => isLoading.value || props.loading || !props.src
);
const showError = computed(() => error.value && !showSkeleton.value);
const showImage = computed(
  () => !error.value && !showSkeleton.value && props.src
);
</script>

<template>
  <LewFlex
    gap="0"
    x="center"
    y="center"
    class="lew-image-wrapper"
    :style="imageStyle"
  >
    <div v-if="showSkeleton" class="skeletons" />
    <template v-else-if="showError">
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
      />
    </template>
    <div v-else-if="showImage" class="lew-image-box">
      <img
        class="lew-image"
        :src="props.src"
        :loading="props.lazy ? 'lazy' : undefined"
        :style="imageInnerStyle"
        :alt="props.alt"
      />
    </div>
  </LewFlex>
</template>

<style lang="scss" scoped>
.lew-image-wrapper {
  background-color: var(--lew-bgcolor-2);

  .lew-image-fail-icon {
    width: 50%;
    height: auto;
    opacity: 0.7;
  }

  .lew-image-box {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .lew-image {
      width: 100%;
      height: 100%;
      opacity: 0;
      animation: fade-in 0.3s ease forwards;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
