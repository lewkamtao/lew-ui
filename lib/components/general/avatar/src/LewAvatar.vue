<script setup lang="ts">
// 1. 第三方库导入
import { useImage } from '@vueuse/core'

// 2. 组件导入
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'

// 3. 工具函数导入
import { any2px } from 'lew-ui/utils'

// 4. 组件配置导入
import { avatarProps } from './props'

// Props
const props = defineProps(avatarProps)

// Composables
const imageOptions = ref({
  src: props.src,
})

watch(
  () => props.src,
  (newVal: string) => {
    imageOptions.value.src = newVal
  },
  { immediate: true },
)

const { isLoading, error } = useImage(imageOptions)

// 常量
const BORDER_RADIUS_MAP: Record<string, string> = {
  circle: '50%',
  sharp: '0',
  square: 'var(--lew-border-radius-small)',
}

// 计算属性
const avatarStyle = computed(() => ({
  width: any2px(props.size),
  height: any2px(props.size),
}))

const avatarBoxStyle = computed(() => ({
  borderRadius: BORDER_RADIUS_MAP[props.shape],
}))

const imageStyle = computed(() => ({
  objectFit: props.objectFit,
  objectPosition: props.objectPosition,
}))

const textStyle = computed(() => {
  const size
    = typeof props.size === 'number' ? props.size : Number.parseInt(props.size)
  return {
    fontSize: `${size * 0.45}px`,
    lineHeight: `${size - 2}px`,
    textAlign: 'center' as const,
    color: 'var(--lew-color-text-2)',
    userSelect: 'none' as const,
  }
})

const altText = computed(() => {
  if (!props.alt)
    return ''
  const result = props.alt
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
  return result.length > 2 ? result.charAt(0) : result
})

const statusDotClass = computed(() => {
  if (!props.status)
    return ''
  return `lew-avatar-status-dot lew-avatar-status-dot--${props.shape}-${props.statusPlacement} lew-avatar-status-dot--${props.status}`
})

const statusDotStyle = computed(() => {
  if (!props.status)
    return {}

  const sizeValue
    = typeof props.size === 'number' ? props.size : Number.parseFloat(props.size)
  const dotSize = sizeValue * 0.2

  return {
    width: any2px(dotSize),
    height: any2px(dotSize),
  }
})

const iconSize = computed(() => {
  const { size } = props
  return typeof size === 'number' ? size * 0.5 : Number.parseInt(size) * 0.5
})

const showSkeleton = computed(() => isLoading.value || props.loading)
const showImage = computed(
  () => props.src && !error.value && !showSkeleton.value,
)
const showAltText = computed(
  () => !props.src && props.alt && !showSkeleton.value,
)
const showIcon = computed(
  () => !props.src && !props.alt && !showSkeleton.value,
)
const showFallback = computed(() => error.value && !showSkeleton.value)
</script>

<template>
  <div class="lew-avatar" :style="avatarStyle">
    <div class="lew-avatar-box" :style="avatarBoxStyle">
      <div v-if="showSkeleton" class="skeletons" />
      <img
        v-else-if="showImage"
        :alt="props.alt"
        :src="props.src"
        loading="lazy"
        :style="imageStyle"
      >
      <div
        v-else-if="showAltText || (showFallback && props.alt)"
        class="lew-avatar-text"
        :style="textStyle"
      >
        {{ altText }}
      </div>
      <CommonIcon
        v-else-if="showIcon || showFallback"
        class="lew-avatar-user-icon"
        :size="iconSize"
        type="user"
      />
    </div>
    <i v-if="props.status" :class="statusDotClass" :style="statusDotStyle" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  position: relative;
  display: inline-block;
  flex-shrink: 0;

  .lew-avatar-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: var(--lew-bgcolor-2);
    border: var(--lew-pop-border);
    border-radius: var(--lew-border-radius-small);
  }

  .lew-avatar-text {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
    opacity: 0;
    animation: fade-in 0.2s ease forwards;
  }

  img {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
    opacity: 0;
    animation: fade-in 0.2s ease forwards;
  }

  .lew-avatar-user-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    animation: fade-in 0.2s ease forwards;
    transform: translate(-50%, -50%);
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  // Status dot (使用 class 而非 computed style，性能更好)
  .lew-avatar-status-dot {
    position: absolute;
    border-radius: 50%;
    z-index: 19;
    border: var(--lew-form-border-width) var(--lew-color-white) solid;
    content: '';
  }

  // Status colors (静态配置，使用 CSS class)
  .lew-avatar-status-dot--online {
    background-color: var(--lew-color-success);
  }

  .lew-avatar-status-dot--busy {
    background-color: var(--lew-color-error);
  }

  .lew-avatar-status-dot--offline {
    background-color: var(--lew-color-normal-dark);
  }

  .lew-avatar-status-dot--processing {
    background-color: var(--lew-color-info);
  }

  .lew-avatar-status-dot--away {
    background-color: var(--lew-color-warning);
  }

  // Circle shape positioning
  .lew-avatar-status-dot--circle-top-left {
    top: -0.05rem;
    left: -0.05rem;
  }

  .lew-avatar-status-dot--circle-top-right {
    top: -0.05rem;
    right: -0.05rem;
  }

  .lew-avatar-status-dot--circle-bottom-left {
    bottom: -0.05rem;
    left: -0.05rem;
  }

  .lew-avatar-status-dot--circle-bottom-right {
    bottom: -0.05rem;
    right: -0.05rem;
  }

  // Square shape positioning
  .lew-avatar-status-dot--square-top-left {
    top: -0.25rem;
    left: -0.25rem;
  }

  .lew-avatar-status-dot--square-top-right {
    top: -0.25rem;
    right: -0.25rem;
  }

  .lew-avatar-status-dot--square-bottom-left {
    bottom: -0.25rem;
    left: -0.25rem;
  }

  .lew-avatar-status-dot--square-bottom-right {
    bottom: -0.25rem;
    right: -0.25rem;
  }
}
</style>
